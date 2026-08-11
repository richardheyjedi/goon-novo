const STORAGE_KEY = 'goon_marketing_attribution_v1';

// Keep this list centralized so new advertising click IDs are easy to add.
export const CLICK_ID_PARAMETERS = Object.freeze([
  'fbclid',
  'gclid',
  'gbraid',
  'wbraid',
  'ttclid',
  'msclkid',
  'li_fat_id',
  'twclid',
  'ScCid',
  'sccid',
]);

const CLICK_ID_SET = new Set(CLICK_ID_PARAMETERS);
const HTTP_PROTOCOLS = new Set(['http:', 'https:']);

export function isAttributionParameter(name) {
  return typeof name === 'string'
    && (name.toLowerCase().startsWith('utm_') || CLICK_ID_SET.has(name));
}

export function extractAttribution(search = '') {
  const captured = {};
  const params = new URLSearchParams(search);

  for (const [name, value] of params) {
    if (!isAttributionParameter(name) || Object.hasOwn(captured, name)) continue;
    captured[name] = value;
  }

  return captured;
}

function hasValues(value) {
  return value && typeof value === 'object' && Object.keys(value).length > 0;
}

function parseStoredAttribution(rawValue) {
  try {
    const parsed = JSON.parse(rawValue || '{}');
    return {
      original: hasValues(parsed.original) ? parsed.original : {},
      current: hasValues(parsed.current) ? parsed.current : {},
    };
  } catch {
    return { original: {}, current: {} };
  }
}

export function captureAttribution(search, storage) {
  const captured = extractAttribution(search);
  const stored = parseStoredAttribution(storage?.getItem(STORAGE_KEY));

  if (hasValues(captured)) {
    if (!hasValues(stored.original)) stored.original = captured;
    stored.current = captured;
    storage?.setItem(STORAGE_KEY, JSON.stringify(stored));
  }

  return stored;
}

export function getStoredAttribution(storage) {
  const stored = parseStoredAttribution(storage?.getItem(STORAGE_KEY));
  return hasValues(stored.original) ? stored.original : stored.current;
}

function isSkippedHref(href) {
  const trimmed = href.trim();
  if (!trimmed || trimmed === '#' || trimmed.startsWith('#')) return true;

  const protocol = trimmed.match(/^([a-z][a-z\d+.-]*):/i)?.[1]?.toLowerCase();
  return protocol && !HTTP_PROTOCOLS.has(`${protocol}:`);
}

export function appendAttributionToUrl(href, attribution, baseUrl) {
  if (typeof href !== 'string' || isSkippedHref(href) || !hasValues(attribution)) return href;

  try {
    const url = new URL(href, baseUrl);
    if (!HTTP_PROTOCOLS.has(url.protocol)) return href;

    for (const [name, value] of Object.entries(attribution)) {
      if (!isAttributionParameter(name)) continue;

      const existingValues = url.searchParams.getAll(name);
      if (existingValues.length) {
        // Preserve the destination's existing value while removing duplicates.
        url.searchParams.delete(name);
        url.searchParams.set(name, existingValues[0]);
      } else {
        url.searchParams.set(name, value);
      }
    }

    if (/^https?:\/\//i.test(href)) return url.href;
    if (href.startsWith('//')) return `//${url.host}${url.pathname}${url.search}${url.hash}`;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return href;
  }
}

function decorateAnchor(anchor, attribution, baseUrl) {
  const href = anchor.getAttribute('href');
  if (href === null) return;
  const decorated = appendAttributionToUrl(href, attribution, baseUrl);
  if (decorated !== href) anchor.setAttribute('href', decorated);
}

export function addAttributionToForm(form, attribution, documentRef) {
  if (!form || !hasValues(attribution)) return;

  for (const [name, value] of Object.entries(attribution)) {
    if (!isAttributionParameter(name)) continue;

    const existing = Array.from(form.elements || []).find((field) => field.name === name);
    if (existing) {
      if (existing.type === 'hidden') existing.value = value;
      continue;
    }

    const input = documentRef.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    input.dataset.attribution = 'true';
    form.appendChild(input);
  }
}

function decorateTree(root, attribution, windowRef) {
  if (!root?.querySelectorAll) return;
  if (root.matches?.('a[href]')) decorateAnchor(root, attribution, windowRef.location.href);
  if (root.matches?.('form')) addAttributionToForm(root, attribution, windowRef.document);
  root.querySelectorAll('a[href]').forEach((anchor) => decorateAnchor(anchor, attribution, windowRef.location.href));
  root.querySelectorAll('form').forEach((form) => addAttributionToForm(form, attribution, windowRef.document));
}

export function initializeAttribution(windowRef = window) {
  if (!windowRef?.document || windowRef.__goonAttributionInitialized) return () => {};
  windowRef.__goonAttributionInitialized = true;

  const refresh = () => {
    captureAttribution(windowRef.location.search, windowRef.sessionStorage);
    const attribution = getStoredAttribution(windowRef.sessionStorage);
    decorateTree(windowRef.document, attribution, windowRef);
    return attribution;
  };

  refresh();

  const onClick = (event) => {
    const anchor = event.target?.closest?.('a[href]');
    if (anchor) decorateAnchor(anchor, getStoredAttribution(windowRef.sessionStorage), windowRef.location.href);
  };

  const onSubmit = (event) => {
    if (event.target?.matches?.('form')) {
      addAttributionToForm(event.target, getStoredAttribution(windowRef.sessionStorage), windowRef.document);
    }
  };

  windowRef.document.addEventListener('click', onClick, true);
  windowRef.document.addEventListener('submit', onSubmit, true);

  const observer = new windowRef.MutationObserver((mutations) => {
    const attribution = getStoredAttribution(windowRef.sessionStorage);
    for (const mutation of mutations) {
      if (mutation.type === 'attributes') decorateAnchor(mutation.target, attribution, windowRef.location.href);
      mutation.addedNodes.forEach((node) => decorateTree(node, attribution, windowRef));
    }
  });
  observer.observe(windowRef.document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['href'],
  });

  const originalOpen = windowRef.open.bind(windowRef);
  windowRef.open = (url, ...args) => {
    const decorated = typeof url === 'string'
      ? appendAttributionToUrl(url, getStoredAttribution(windowRef.sessionStorage), windowRef.location.href)
      : url;
    return originalOpen(decorated, ...args);
  };

  const historyMethods = ['pushState', 'replaceState'];
  const originalHistoryMethods = {};
  historyMethods.forEach((method) => {
    originalHistoryMethods[method] = windowRef.history[method].bind(windowRef.history);
    windowRef.history[method] = (...args) => {
      const result = originalHistoryMethods[method](...args);
      refresh();
      return result;
    };
  });

  windowRef.addEventListener('popstate', refresh);

  return () => {
    observer.disconnect();
    windowRef.document.removeEventListener('click', onClick, true);
    windowRef.document.removeEventListener('submit', onSubmit, true);
    windowRef.removeEventListener('popstate', refresh);
    windowRef.open = originalOpen;
    historyMethods.forEach((method) => { windowRef.history[method] = originalHistoryMethods[method]; });
    delete windowRef.__goonAttributionInitialized;
  };
}

export { STORAGE_KEY };
