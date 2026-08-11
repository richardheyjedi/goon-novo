import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CLICK_ID_PARAMETERS, STORAGE_KEY, addAttributionToForm,
  appendAttributionToUrl, captureAttribution, extractAttribution, getStoredAttribution,
} from '../src/lib/attribution.js';

const BASE = 'https://meusite.com/produto';
const storage = () => { const data = new Map(); return { getItem: (key) => data.get(key) ?? null, setItem: (key, value) => data.set(key, value) }; };
const fakeForm = () => {
  const form = { elements: [], appendChild(input) { this.elements.push(input); } };
  return { form, documentRef: { createElement: () => ({ type: '', name: '', value: '', dataset: {} }) } };
};

test('1. acesso sem parâmetros', () => assert.deepEqual(extractAttribution(''), {}));
test('2. acesso apenas com utm_source', () => assert.deepEqual(extractAttribution('?utm_source=meta'), { utm_source: 'meta' }));
test('3. acesso com todos os UTMs, incluindo futuros', () => {
  const value = extractAttribution('?utm_source=meta&utm_medium=paid&utm_campaign=x&utm_content=v&utm_term=t&utm_id=1&utm_future=yes');
  assert.equal(Object.keys(value).length, 7); assert.equal(value.utm_future, 'yes');
});
test('4. acesso com fbclid', () => assert.deepEqual(extractAttribution('?fbclid=F1'), { fbclid: 'F1' }));
test('5. acesso com gclid', () => assert.deepEqual(extractAttribution('?gclid=G1'), { gclid: 'G1' }));
test('6. acesso com gbraid', () => assert.deepEqual(extractAttribution('?gbraid=G1'), { gbraid: 'G1' }));
test('7. acesso com wbraid', () => assert.deepEqual(extractAttribution('?wbraid=W1'), { wbraid: 'W1' }));
test('8. acesso com ttclid', () => assert.deepEqual(extractAttribution('?ttclid=T1'), { ttclid: 'T1' }));
test('9. UTMs + click ID; rejeita dados fora da allowlist', () => assert.deepEqual(
  extractAttribution('?utm_source=meta&fbclid=ABC&email=privado&token=segredo'),
  { utm_source: 'meta', fbclid: 'ABC' },
));
test('10. link interno', () => assert.equal(appendAttributionToUrl('/oferta', { utm_source: 'meta' }, BASE), '/oferta?utm_source=meta'));
test('11. link externo', () => assert.equal(appendAttributionToUrl('https://externo.com/pagina', { utm_source: 'meta' }, BASE), 'https://externo.com/pagina?utm_source=meta'));
test('12. checkout externo', () => assert.match(appendAttributionToUrl('https://checkout.com/produto', { gclid: 'G1' }, BASE), /checkout\.com\/produto\?gclid=G1/));
test('13. link com query existente', () => assert.equal(
  appendAttributionToUrl('https://checkout.com/p?offer=123&cupom=VAZ10', { utm_source: 'meta' }, BASE),
  'https://checkout.com/p?offer=123&cupom=VAZ10&utm_source=meta',
));
test('14. link com UTM existente preserva valor do destino', () => assert.equal(appendAttributionToUrl('/oferta?utm_source=google', { utm_source: 'meta' }, BASE), '/oferta?utm_source=google'));
test('15. link com click ID existente não duplica', () => assert.equal(appendAttributionToUrl('/oferta?fbclid=DESTINO', { fbclid: 'SESSAO' }, BASE), '/oferta?fbclid=DESTINO'));
test('16. link com anchor posiciona query antes do hash', () => assert.equal(appendAttributionToUrl('/pagina#precos', { utm_source: 'meta' }, BASE), '/pagina?utm_source=meta#precos'));
test('17. várias páginas preservam first-touch', () => {
  const session = storage(); captureAttribution('?utm_source=facebook&utm_campaign=entrada', session); captureAttribution('', session); captureAttribution('?utm_source=google', session);
  assert.deepEqual(getStoredAttribution(session), { utm_source: 'facebook', utm_campaign: 'entrada' });
  assert.deepEqual(JSON.parse(session.getItem(STORAGE_KEY)).current, { utm_source: 'google' });
});
test('18. navegação SPA captura primeira atribuição encontrada', () => {
  const session = storage(); captureAttribution('', session); captureAttribution('?utm_source=spa', session); captureAttribution('', session);
  assert.deepEqual(getStoredAttribution(session), { utm_source: 'spa' });
});
test('19. link dinâmico usa a mesma função global', () => assert.equal(appendAttributionToUrl('https://formulario.com/agendar', { ttclid: 'T1' }, BASE), 'https://formulario.com/agendar?ttclid=T1'));
test('20. formulário recebe hidden fields sem duplicar', () => {
  const { form, documentRef } = fakeForm(); addAttributionToForm(form, { utm_source: 'meta', gclid: 'G1' }, documentRef); addAttributionToForm(form, { utm_source: 'meta', gclid: 'G1' }, documentRef);
  assert.deepEqual(form.elements.map(({ type, name, value }) => ({ type, name, value })), [
    { type: 'hidden', name: 'utm_source', value: 'meta' }, { type: 'hidden', name: 'gclid', value: 'G1' },
  ]);
});
test('21. WhatsApp preserva texto', () => {
  const url = new URL(appendAttributionToUrl('https://wa.me/5511999999999?text=Ol%C3%A1%20mundo', { utm_source: 'meta' }, BASE));
  assert.equal(url.searchParams.get('text'), 'Olá mundo'); assert.equal(url.searchParams.get('utm_source'), 'meta');
});
test('22. mailto não é alterado', () => assert.equal(appendAttributionToUrl('mailto:contato@site.com', { gclid: 'G1' }, BASE), 'mailto:contato@site.com'));
test('23. tel não é alterado', () => assert.equal(appendAttributionToUrl('tel:+5511999999999', { gclid: 'G1' }, BASE), 'tel:+5511999999999'));
test('24. anchor interno não é alterado', () => assert.equal(appendAttributionToUrl('#precos', { gclid: 'G1' }, BASE), '#precos'));
test('25. parâmetros nunca ficam duplicados', () => assert.equal(appendAttributionToUrl('/oferta?utm_source=primeiro&utm_source=segundo', { utm_source: 'sessao' }, BASE), '/oferta?utm_source=primeiro'));

test('todos os click IDs adicionais são permitidos', () => {
  for (const id of CLICK_ID_PARAMETERS) assert.equal(extractAttribution(`?${id}=VALUE`)[id], 'VALUE');
});
test('javascript, vazio e hash simples não são alterados', () => {
  const attrs = { utm_source: 'meta' };
  for (const href of ['javascript:void(0)', '', '#']) assert.equal(appendAttributionToUrl(href, attrs, BASE), href);
});
