import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  pt: {
    nav: {
      home: "Home",
      problem: "Problema",
      systems: "Sistemas",
      method: "Método",
      timeline: "Processo",
      ecosystem: "Ecossistema",
      stats: "Números",
      cases: "Cases",
      offices: "Sedes",
      about: "Sobre",
      contact: "Contato"
    },
    hero: {
      sub: "Global Or Nothing",
      title: "Criamos e escalamos marcas em nível [global].",
      lead: "Construímos marcas, operações e sistemas de crescimento para empresas que não nasceram para ser médias.",
      waBtn: "Falar no WhatsApp",
      talkBtn: "Iniciar conversa",
      methodBtn: "Conheça o método"
    },
    marquee: ["Branding", "Produto", "Operação", "Growth", "TikTok Shop", "Gestão"],
    statements: {
      one: {
        text: "Crescimento não é um departamento.",
        span: "É um sistema."
      },
      two: {
        text: "Não construímos empresas para o mercado local.",
        span: "Construímos para competir com o mundo."
      }
    },
    problem: {
      title: "O problema",
      lead: "A maioria das empresas tenta crescer por partes. Marketing de um lado. Produto de outro. Operação correndo atrás. Gestão apagando incêndio.",
      label: "SINTOMA",
      tab1: "Branding",
      tab2: "Marketing",
      tab3: "Produto",
      tab4: "Gestão",
      p1: { title: "Branding sozinho não resolve.", desc: "Marca sem produto, operação e canal vira promessa sem entrega.", solution: "Na GOON, unimos posicionamento à sua cadeia de suprimentos e canais de escala." },
      p2: { title: "Marketing sozinho não escala.", desc: "Campanha gera pico. Sistema gera crescimento consistente.", solution: "Desenvolvemos canais próprios, parcerias com criadores e supply integrados." },
      p3: { title: "Produto sozinho não vende.", desc: "Produto precisa de narrativa, canal, margem, estoque e ritmo.", solution: "Estruturamos coleções inteligentes, análise de margem e precificação de produto-âncora." },
      p4: { title: "Gestão sem execução trava.", desc: "Planejamento só importa quando vira ritual, KPI e cobrança.", solution: "Implementamos rituais diários, semanais e mensais de checagem com heads dedicados." }
    },
    systems: {
      title: "We build systems.",
      lead: "A GOON conecta as partes que normalmente trabalham separadas. Marca, produto, operação, tecnologia e vendas sob uma única lógica de crescimento.",
      s1: { title: "Marca", desc: "Posicionamento, território, narrativa e desejo." },
      s2: { title: "Produto", desc: "Mix, coleção, precificação e produtos-âncora." },
      s3: { title: "Operação", desc: "Supply, fornecedores, estoque, lead time e qualidade." },
      s4: { title: "Gestão", desc: "Comitês, KPIs, papéis, rituais e plano de ação." },
      s5: { title: "Growth", desc: "Social commerce, TikTok Shop, criadores, lives e GMV." }
    },
    method: {
      title: "GOON Method",
      lead: "Uma metodologia para transformar visão em estrutura, estrutura em execução e execução em escala.",
      p1: { title: "Position", desc: "Definimos o jogo: mercado, cliente, marca, diferenciação e plano de voo." },
      p2: { title: "Build", desc: "Construímos os ativos: produto, canais, processos, narrativas e sistemas." },
      p3: { title: "Operate", desc: "Entramos na operação com rituais, heads, KPIs e cadência executiva." },
      p4: { title: "Scale", desc: "Ajustamos rota, aceleramos vendas e preparamos a empresa para crescer." }
    },
    timeline: {
      title: "Como operamos",
      lead: "Do diagnóstico à implementação. Sem teatro. Sem apresentação esquecida na gaveta.",
      step: "ETAPA",
      step1: { title: "Position", desc: "Definimos o jogo: mercado, cliente, marca, diferenciação e plano de voo." },
      step2: { title: "Builde", desc: "Construímos os ativos: produto, canais, processos, narrativas e sistemas." },
      step3: { title: "Operate", desc: "Entramos na operação com rituais, heads, KPIs e cadência executiva." },
      step4: { title: "Scale", desc: "Ajustamos rota, aceleramos vendas e preparamos a empresa para crescer." }
    },
    ecosystem: {
      title: "Ecossistema",
      lead: "Diferentes formas de acessar a mesma filosofia: construir empresas como sistemas.",
      c1: { title: "GOON Consulting", desc: "Projetos executivos para empresas que precisam reposicionar, estruturar e escalar.", action: "Apply →" },
      c2: { title: "GOON Elite", desc: "Mentoria individual para founders que querem direção estratégica e execução próxima.", action: "Apply →" },
      c3: { title: "GOON Infinity", desc: "Programa em grupo para marcas que querem método, ritmo e comunidade.", action: "Join →" },
      c4: { title: "GOON Advisor", desc: "Conselho estratégico para decisões críticas de crescimento, produto e operação.", action: "Request →" },
      c5: { title: "GOON Club", desc: "Comunidade para empresários, operadores e marcas em construção.", action: "Enter →" },
      c6: { title: "GOON Events", desc: "Imersões, encontros e experiências para acelerar visão, conexão e execução.", action: "See events →" }
    },
    stats: {
      title1: "Operadores.",
      title2: "Não espectadores.",
      lead: "Enquanto muitos ensinam, nós operamos. Enquanto muitos apresentam, nós implementamos. Enquanto muitos observam, nós construímos.",
      s1: "anos construindo marcas",
      s2: "países alcançados",
      s3: "em faturamento histórico",
      s4: "global or nothing"
    },
    cases: {
      title: "Cases",
      lead: "Conectando marca, produto, operação e growth. Conheça as estratégias que levaram startups e e-commerces à escala internacional.",
      c1: {
        name: "AURA",
        tag: "BRAND BUILD · BRANDING GLOBAL",
        title: "Repensando o posicionamento global de marca",
        desc: "Como a GOON alinhou o posicionamento de luxo digital com a cadeia de suprimentos internacional, gerando recorde de retenção de clientes.",
        m1v: "+180%",
        m1l: "Crescimento de LTV",
        m2v: "3.2x",
        m2l: "ROI em Canais Digitais",
        quote: "A GOON não entregou apenas um design bonito; eles reestruturaram nossa lógica operacional de produto e posicionamento de marca internacional."
      },
      c2: {
        name: "VELO",
        tag: "COMMERCE SCALE · SOCIAL COMMERCE",
        title: "Escalonamento em massa via TikTok Shop",
        desc: "Uma infraestrutura de social commerce integrando criadores parceiros, lives comerciais e logística de fast-fulfillment para responder a picos de demanda.",
        m1v: "$4.2M",
        m1l: "GMV em 90 dias",
        m2v: "250K+",
        m2l: "Clientes conquistados",
        quote: "O método de social commerce e a velocidade operacional da GOON nos permitiram surfar a onda do TikTok Shop sem rupturas de estoque."
      },
      c3: {
        name: "APEX",
        tag: "OPERATION SYSTEM · SUPPLY CHAIN",
        title: "Sistema operacional e cadeia de suprimentos",
        desc: "Implementação de rituais executivos, dashboards em tempo real e otimização de fornecedores globais para destravar gargalos de caixa e logística.",
        m1v: "-42%",
        m1l: "Redução de Lead Time",
        m2v: "+35%",
        m2l: "Eficiência de Estoque",
        quote: "Com a implementação dos rituais da GOON, nossa gestão de ponta a ponta passou a operar com a precisão de um relógio suíço."
      }
    },
    offices: {
      title: "Nossas Sedes",
      lead: "Presença física global estruturada para conectar sua marca e operação com os principais eixos comerciais do mundo.",
      br: "Brasil",
      py: "Paraguai",
      us: "Estados Unidos",
      eu: "Europa",
      af: "África",
      oc: "Oceania",
      ae: "Dubai"
    },
    contact: {
      title: "Vamos conversar",
      lead: "Escolha o canal. Respondemos rápido e sem enrolação — a primeira conversa já é diagnóstico.",
      waTitle: "WhatsApp",
      waDesc: "Resposta rápida, direto com o time. O caminho mais curto para começar.",
      waAction: "Chamar agora →",
      mailTitle: "E-mail",
      mailDesc: "Para propostas, parcerias e projetos executivos. contato@goon-global.com",
      mailAction: "Escrever →",
      igTitle: "Instagram",
      igDesc: "Bastidores, cases e a filosofia de operar em vez de apenas ensinar.",
      igAction: "Seguir →",
      finalTitle1: "Ready to build",
      finalTitle2: "something bigger?",
      finalDesc: "Se a sua empresa precisa de marca, produto, operação e crescimento trabalhando como um único sistema, comece por uma conversa.",
      finalWa: "Falar no WhatsApp",
      finalTalk: "Iniciar conversa",
      waMsg: "Olá! Vim pelo site da GOON e quero conversar sobre um projeto."
    },
    footer: {
      rights: "© 2026 GOON. Todos os direitos reservados.",
      credits: "Design por GOON."
    },
    leadForm: {
      title: "Iniciar Diagnóstico",
      name: "Nome Completo",
      phone: "Telefone / WhatsApp",
      revenue: "Faturamento Mensal",
      instagram: "Instagram da Empresa (@)",
      submit: "Enviar Mensagem",
      waTemplate: "Olá GOON! Quero iniciar um diagnóstico:\n- *Nome:* {name}\n- *Telefone:* {phone}\n- *Faturamento:* {revenue}\n- *Instagram:* {instagram}"
    }
  },
  en: {
    nav: {
      home: "Home",
      problem: "Problem",
      systems: "Systems",
      method: "Method",
      timeline: "Process",
      ecosystem: "Ecosystem",
      stats: "Numbers",
      cases: "Cases",
      offices: "Offices",
      about: "About",
      contact: "Contact"
    },
    hero: {
      sub: "Global Or Nothing",
      title: "We build and scale brands at a [global] level.",
      lead: "We build brands, operations, and growth systems for companies that weren't born to be average.",
      waBtn: "Talk on WhatsApp",
      talkBtn: "Start conversation",
      methodBtn: "Discover the method"
    },
    marquee: ["Branding", "Product", "Operations", "Growth", "TikTok Shop", "Management"],
    statements: {
      one: {
        text: "Growth is not a department.",
        span: "It is a system."
      },
      two: {
        text: "We don't build companies for the local market.",
        span: "We build them to compete with the world."
      }
    },
    problem: {
      title: "The problem",
      lead: "Most companies try to grow in silos. Marketing on one side. Product on another. Operations running behind. Management putting out fires.",
      label: "SYMPTOM",
      tab1: "Branding",
      tab2: "Marketing",
      tab3: "Product",
      tab4: "Management",
      p1: { title: "Branding alone doesn't solve it.", desc: "Brand without product, operation, and channel becomes a promise without delivery.", solution: "At GOON, we unite positioning with your supply chain and scale channels." },
      p2: { title: "Marketing alone doesn't scale.", desc: "Campaigns generate spikes. Systems generate consistent growth.", solution: "We build owned channels, creator partnerships, and integrated supply." },
      p3: { title: "Product alone doesn't sell.", desc: "Products need narrative, channel, margin, inventory, and cadence.", solution: "We structure smart collections, margin analysis, and anchor-product pricing." },
      p4: { title: "Management without execution stalls.", desc: "Planning only matters when it becomes a ritual, KPI, and accountability.", solution: "We implement daily, weekly, and monthly check-in rituals with dedicated heads." }
    },
    systems: {
      title: "We build systems.",
      lead: "GOON connects the parts that usually work in silos. Brand, product, operations, technology, and sales under a single growth logic.",
      s1: { title: "Brand", desc: "Positioning, territory, narrative, and desire." },
      s2: { title: "Product", desc: "Mix, collection, pricing, and anchor products." },
      s3: { title: "Operations", desc: "Supply, vendors, inventory, lead time, and quality." },
      s4: { title: "Management", desc: "Committees, KPIs, roles, rituals, and action plan." },
      s5: { title: "Growth", desc: "Social commerce, TikTok Shop, creators, lives, and GMV." }
    },
    method: {
      title: "GOON Method",
      lead: "A methodology to turn vision into structure, structure into execution, and execution into scale.",
      p1: { title: "Position", desc: "We define the game: market, customer, brand, differentiation, and flight plan." },
      p2: { title: "Build", desc: "We build the assets: product, channels, processes, narratives, and systems." },
      p3: { title: "Operate", desc: "We run the operations with rituals, heads, KPIs, and executive cadence." },
      p4: { title: "Scale", desc: "We adjust the course, accelerate sales, and prepare the company to scale." }
    },
    timeline: {
      title: "How we operate",
      lead: "From diagnosis to implementation. No theater. No presentations left in a drawer.",
      step: "STAGE",
      step1: { title: "Position", desc: "We define the game: market, customer, brand, differentiation, and flight plan." },
      step2: { title: "Build", desc: "We build the assets: product, channels, processes, narratives, and systems." },
      step3: { title: "Operate", desc: "We run the operations with rituals, heads, KPIs, and executive cadence." },
      step4: { title: "Scale", desc: "We adjust the course, accelerate sales, and prepare the company to scale." }
    },
    ecosystem: {
      title: "Ecosystem",
      lead: "Different ways to access the same philosophy: building companies as systems.",
      c1: { title: "GOON Consulting", desc: "Executive projects for companies that need to reposition, structure, and scale.", action: "Apply →" },
      c2: { title: "GOON Elite", desc: "Individual mentoring for founders who want strategic direction and close execution.", action: "Apply →" },
      c3: { title: "GOON Infinity", desc: "Group program for brands that want method, rhythm, and community.", action: "Join →" },
      c4: { title: "GOON Advisor", desc: "Strategic board for critical growth, product, and operations decisions.", action: "Request →" },
      c5: { title: "GOON Club", desc: "Community for entrepreneurs, operators, and brands in construction.", action: "Enter →" },
      c6: { title: "GOON Events", desc: "Imersions, meetups, and experiences to accelerate vision, connection, and execution.", action: "See events →" }
    },
    stats: {
      title1: "Operators.",
      title2: "Not spectators.",
      lead: "While many teach, we operate. While many present, we implement. While many observe, we build.",
      s1: "years building brands",
      s2: "countries reached",
      s3: "in historical revenue",
      s4: "global or nothing"
    },
    cases: {
      title: "Cases",
      lead: "Connecting brand, product, operations, and growth. Discover the strategies that drove startups and e-commerce companies to global scale.",
      c1: {
        name: "AURA",
        tag: "BRAND BUILD · GLOBAL BRANDING",
        title: "Rethinking global brand positioning",
        desc: "How GOON aligned luxury digital positioning with an international supply chain, yielding record-breaking customer retention.",
        m1v: "+180%",
        m1l: "LTV Growth",
        m2v: "3.2x",
        m2l: "Digital Channel ROI",
        quote: "GOON didn't just deliver beautiful design; they restructured our product operational logic and international brand positioning."
      },
      c2: {
        name: "VELO",
        tag: "COMMERCE SCALE · SOCIAL COMMERCE",
        title: "Mass scale scaling via TikTok Shop",
        desc: "A social commerce infrastructure integrating partner creators, commercial live streams, and fast-fulfillment logistics for massive sales spikes.",
        m1v: "$4.2M",
        m1l: "GMV in 90 days",
        m2v: "250K+",
        m2l: "Customers Acquired",
        quote: "GOON's social commerce method and operational speed allowed us to ride the TikTok Shop wave without stockouts."
      },
      c3: {
        name: "APEX",
        tag: "OPERATION SYSTEM · SUPPLY CHAIN",
        title: "Operating system & supply chain sync",
        desc: "Implementing executive rituals, real-time dashboards, and global vendor optimization to unlock cash flow and logistical bottlenecks.",
        m1v: "-42%",
        m1l: "Lead Time Reduction",
        m2v: "+35%",
        m2l: "Inventory Efficiency",
        quote: "With the implementation of GOON's rituals, our end-to-end management began operating with Swiss-watch precision."
      }
    },
    offices: {
      title: "Our Offices",
      lead: "Global physical presence structured to connect your brand and operations with the world's main commercial hubs.",
      br: "Brazil",
      py: "Paraguay",
      us: "United States",
      eu: "Europe",
      af: "Africa",
      oc: "Oceania",
      ae: "Dubai"
    },
    contact: {
      title: "Let's talk",
      lead: "Choose the channel. We respond quickly and directly — the first conversation is already a diagnosis.",
      waTitle: "WhatsApp",
      waDesc: "Fast response, directly with the team. The shortest path to start.",
      waAction: "Chat now →",
      mailTitle: "E-mail",
      mailDesc: "For proposals, partnerships, and executive projects. contato@goon-global.com",
      mailAction: "Write →",
      igTitle: "Instagram",
      igDesc: "Behind the scenes, cases, and the philosophy of operating instead of just teaching.",
      igAction: "Follow →",
      finalTitle1: "Ready to build",
      finalTitle2: "something bigger?",
      finalDesc: "If your company needs brand, product, operations, and growth working as a single system, start with a conversation.",
      finalWa: "Talk on WhatsApp",
      finalTalk: "Start a conversation",
      waMsg: "Hello! I came through the GOON website and want to discuss a project."
    },
    footer: {
      rights: "© 2026 GOON. All rights reserved.",
      credits: "Design by GOON."
    },
    leadForm: {
      title: "Start Diagnosis",
      name: "Full Name",
      phone: "Phone / WhatsApp",
      revenue: "Monthly Revenue",
      instagram: "Company Instagram (@)",
      submit: "Send Message",
      waTemplate: "Hello GOON! I want to start a diagnosis:\n- *Name:* {name}\n- *Phone:* {phone}\n- *Revenue:* {revenue}\n- *Instagram:* {instagram}"
    }
  },
  es: {
    nav: {
      home: "Inicio",
      problem: "Problema",
      systems: "Sistemas",
      method: "Método",
      timeline: "Proceso",
      ecosystem: "Ecosistema",
      stats: "Números",
      cases: "Casos",
      offices: "Sedes",
      about: "Sobre",
      contact: "Contacto"
    },
    hero: {
      sub: "Global Or Nothing",
      title: "Creamos y escalamos marcas a nivel [global].",
      lead: "Construimos marcas, operaciones y sistemas de crecimiento para empresas que no nacieron para ser promedio.",
      waBtn: "Hablar por WhatsApp",
      talkBtn: "Iniciar conversación",
      methodBtn: "Conoce el método"
    },
    marquee: ["Branding", "Producto", "Operaciones", "Growth", "TikTok Shop", "Gestión"],
    statements: {
      one: {
        text: "El crecimiento no es un departamento.",
        span: "Es un sistema."
      },
      two: {
        text: "No construimos empresas para el mercado local.",
        span: "Construimos para competir con el mundo."
      }
    },
    problem: {
      title: "El problema",
      lead: "La mayoría de las empresas intentan crecer por partes. Marketing por un lado. Producto por el otro. Operación corriendo detrás. Gestión apagando incendios.",
      label: "SÍNTOMA",
      tab1: "Branding",
      tab2: "Marketing",
      tab3: "Producto",
      tab4: "Gestión",
      p1: { title: "El branding solo no lo resuelve.", desc: "Una marca sin producto, operación y canal se convierte en una promesa sin entrega.", solution: "En GOON, unimos el posicionamiento con tu cadena de suministro y canales de escala." },
      p2: { title: "El marketing solo no escala.", desc: "Las campañas generan picos. Un sistema genera un crecimiento constante.", solution: "Desarrollamos canales propios, alianzas con creadores y suministro integrado." },
      p3: { title: "El producto solo no se vende.", desc: "Un producto necesita narrativa, canal, margen, stock y ritmo.", solution: "Estructuramos colecciones inteligentes, análisis de margen y precios de producto ancla." },
      p4: { title: "La gestión sin execução se estanca.", desc: "La planificación solo importa cuando se convierte en ritual, KPI y exigencia.", solution: "Implementamos rituales diarios, semanales y mensuales de control con directores dedicados." }
    },
    systems: {
      title: "We build systems.",
      lead: "GOON conecta las partes que normalmente trabajan por separado. Marca, producto, operaciones, tecnología y ventas bajo una única lógica de crecimiento.",
      s1: { title: "Marca", desc: "Posicionamiento, territorio, narrativa y deseo." },
      s2: { title: "Producto", desc: "Mix, colección, fijación de precios y productos ancla." },
      s3: { title: "Operaciones", desc: "Supply, proveedores, inventario, lead time y calidad." },
      s4: { title: "Gestión", desc: "Comités, KPIs, roles, rituales y plan de acción." },
      s5: { title: "Growth", desc: "Social commerce, TikTok Shop, creadores, en vivo y GMV." }
    },
    method: {
      title: "GOON Method",
      lead: "Una metodología para transformar visión en estructura, estructura en ejecución y ejecución a escala.",
      p1: { title: "Position", desc: "Definimos el juego: mercado, cliente, marca, diferenciación y plan de vuelo." },
      p2: { title: "Build", desc: "Construimos los activos: producto, canales, procesos, narrativas y sistemas." },
      p3: { title: "Operate", desc: "Entramos en la operación con rituales, directores, KPIs y cadencia ejecutiva." },
      p4: { title: "Scale", desc: "Ajustamos rumbo, aceleramos ventas y preparamos la empresa para crecer." }
    },
    timeline: {
      title: "Cómo operamos",
      lead: "Del diagnóstico a la implementación. Sin teatro. Sin presentaciones olvidadas en un cajón.",
      step: "ETAPA",
      step1: { title: "Position", desc: "Definimos el juego: mercado, cliente, marca, diferenciación y plan de vuelo." },
      step2: { title: "Build", desc: "Construimos los activos: producto, canales, procesos, narrativas y sistemas." },
      step3: { title: "Operate", desc: "Entramos en la operación con rituales, directores, KPIs y cadencia ejecutiva." },
      step4: { title: "Scale", desc: "Ajustamos rumbo, aceleramos ventas y preparamos la empresa para crecer." }
    },
    ecosystem: {
      title: "Ecosistema",
      lead: "Diferentes formas de acceder a la misma filosofía: construir empresas como sistemas.",
      c1: { title: "GOON Consulting", desc: "Proyectos ejecutivos para empresas que necesitan reposicionar, estructurar y escalar.", action: "Apply →" },
      c2: { title: "GOON Elite", desc: "Mentoría individual para founders que buscan dirección estratégica y ejecución cercana.", action: "Apply →" },
      c3: { title: "GOON Infinity", desc: "Programa grupal para marcas que buscan método, ritmo y comunidad.", action: "Join →" },
      c4: { title: "GOON Advisor", desc: "Consejo estratégico para decisiones críticas de crecimiento, producto y operación.", action: "Request →" },
      c5: { title: "GOON Club", desc: "Comunidad para empresarios, operadores y marcas en construcción.", action: "Enter →" },
      c6: { title: "GOON Events", desc: "Inmersiones, encuentros y experiencias para acelerar visión, conexión y ejecución.", action: "See events →" }
    },
    stats: {
      title1: "Operadores.",
      title2: "No espectadores.",
      lead: "Mientras muchos enseñan, nosotros operamos. Mientras muchos presentan, nosotros implementamos. Mientras muchos observan, nosotros construimos.",
      s1: "años construyendo marcas",
      s2: "países alcanzados",
      s3: "en facturación histórica",
      s4: "global or nothing"
    },
    cases: {
      title: "Casos",
      lead: "Conectando marca, producto, operación y growth. Conozca las estrategias que llevaron a startups y e-commerces a la escala internacional.",
      c1: {
        name: "AURA",
        tag: "BRAND BUILD · BRANDING GLOBAL",
        title: "Repensando el posicionamiento de marca global",
        desc: "Cómo GOON alineó el posicionamiento de lujo digital con la cadena de suministro internacional, generando un récord de retención de clientes.",
        m1v: "+180%",
        m1l: "Crecimiento de LTV",
        m2v: "3.2x",
        m2l: "ROI en Canales Digitales",
        quote: "GOON no solo entregó un diseño hermoso; reestructuraron nuestra lógica operativa de producto y posicionamiento de marca internacional."
      },
      c2: {
        name: "VELO",
        tag: "COMMERCE SCALE · SOCIAL COMMERCE",
        title: "Escalada masiva a través de TikTok Shop",
        desc: "Una infraestructura de social commerce que integra creadores asociados, transmisiones en vivo y logística de fast-fulfillment para picos de ventas.",
        m1v: "$4.2M",
        m1l: "GMV en 90 días",
        m2v: "250K+",
        m2l: "Clientes Adquiridos",
        quote: "El método de social commerce y la velocidad operativa de GOON nos permitieron aprovechar la ola de TikTok Shop sin quiebres de stock."
      },
      c3: {
        name: "APEX",
        tag: "OPERATION SYSTEM · SUPPLY CHAIN",
        title: "Sistema operativo y cadena de suministro",
        desc: "Implementación de rituales ejecutivos, tableros en tiempo real y optimización de proveedores globales para liberar cuellos de botella de caja y logística.",
        m1v: "-42%",
        m1l: "Reducción de Lead Time",
        m2v: "+35%",
        m2l: "Eficiencia de Inventario",
        quote: "Con la implementación de los rituales de GOON, nuestra gestión de extremo a extremo comenzó a operar con precisión de reloj suizo."
      }
    },
    offices: {
      title: "Nuestras Sedes",
      lead: "Presencia física global estructurada para conectar tu marca y operación con los principales ejes comerciales del mundo.",
      br: "Brasil",
      py: "Paraguay",
      us: "Estados Unidos",
      eu: "Europa",
      af: "África",
      oc: "Oceania",
      ae: "Dubái"
    },
    contact: {
      title: "Hablemos",
      lead: "Elige el canal. Respondemos rápido y directo: la primera conversación ya es un diagnóstico.",
      waTitle: "WhatsApp",
      waDesc: "Respuesta rápida, directamente con el equipo. El camino más corto para empezar.",
      waAction: "Llamar ahora →",
      mailTitle: "E-mail",
      mailDesc: "Para propuestas, alianzas y proyectos ejecutivos. contato@goon-global.com",
      mailAction: "Escribir →",
      igTitle: "Instagram",
      igDesc: "Detrás de escena, casos y la filosofía de operar en lugar de solo enseñar.",
      igAction: "Seguir →",
      finalTitle1: "Ready to build",
      finalTitle2: "something bigger?",
      finalDesc: "Si tu empresa necesita marca, producto, operación y crecimiento trabajando como un único sistema, comienza con una conversación.",
      finalWa: "Hablar por WhatsApp",
      finalTalk: "Iniciar conversación",
      waMsg: "¡Hola! Vine por el sitio web de GOON e quiero conversar sobre un proyecto."
    },
    footer: {
      rights: "© 2026 GOON. Todos los derechos reservados.",
      credits: "Diseño por GOON."
    },
    leadForm: {
      title: "Iniciar Diagnóstico",
      name: "Nombre Completo",
      phone: "Teléfono / WhatsApp",
      revenue: "Facturación Mensual",
      instagram: "Instagram de la Empresa (@)",
      submit: "Enviar Mensaje",
      waTemplate: "¡Hola GOON! Quiero iniciar un diagnóstico:\n- *Nombre:* {name}\n- *Teléfono:* {phone}\n- *Facturación:* {revenue}\n- *Instagram:* {instagram}"
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('goon_lang') || 'pt';
  });

  const setLanguage = (lang) => {
    if (translations[lang]) {
      setLanguageState(lang);
      localStorage.setItem('goon_lang', lang);
    }
  };

  const t = (keyPath) => {
    const keys = keyPath.split('.');
    let current = translations[language];
    for (const key of keys) {
      if (current[key] !== undefined) {
        current = current[key];
      } else {
        return keyPath;
      }
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
