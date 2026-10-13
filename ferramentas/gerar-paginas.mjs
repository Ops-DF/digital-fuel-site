// Gera as duas páginas estáticas (inglês e português) e os arquivos de SEO a partir de um só lugar,
// para os dois idiomas nunca saírem de sincronia. Sem dependências: node ferramentas/gerar-paginas.mjs
// O texto vem do pacote-de-design.md e embarca ao pé da letra.
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = join(dirname(fileURLToPath(import.meta.url)), '..', 'site');
const ORIGIN = 'https://digitalfuelagency.com';   // DEPLOY STEP: confirme o domínio do ar antes de publicar
const UPDATED = '2026-10-12';
const FORM = 'wYbvUMNeKti78OZ1AfbY';              // formulário LeadConnector "Lead Sales - Form" do site atual
const PHONE = { href: 'tel:+13512102512', text: '(351) 210-2512' };
const EMAIL = 'contact@digitalfuelagency.com';
const MAP = 'https://maps.app.goo.gl/HQXtMH3MMT9xS4z59';
const SOCIAL = [
  ['Instagram', 'https://www.instagram.com/digitalfuelagency/'],
  ['YouTube', 'https://www.youtube.com/@digitalfuelagency'],
  ['LinkedIn', 'https://www.linkedin.com/company/digital-fuel-agency']
];
const CLIENTS = [
  ['time-general-construction', 'Time General Construction'], ['wm-home-improvement', 'WM Home Improvement'],
  ['cabrini-equipment', 'Cabrini Equipment'], ['pro-coating', 'Pro Coating'],
  ['souzet', 'Souzet'], ['linares-electric', 'Linares Electric'],
  ['real-painting-home-improvement', 'Real Painting & Home Improvement'], ['onyx-marble-granite', 'Onyx Marble & Granite']
];
const GATES = [
  '(max-width: 720px)',
  '(orientation: portrait) and (max-width: 1024px)',
  '(orientation: portrait) and (pointer: coarse)',
  '(orientation: landscape) and (pointer: coarse) and (max-height: 560px)',
  '(prefers-reduced-motion: reduce)'
];

const T = {
  en: {
    lang: 'en', ogLocale: 'en_US', ogAlt: 'pt_BR', path: '/', assets: 'assets/', home: './',
    alt: { href: 'pt-br/', lang: 'pt-BR', label: 'Português', short: 'PT' },
    title: 'Digital Fuel | Digital Marketing Agency in Massachusetts',
    desc: 'Digital content and performance agency in Marlborough, MA. Websites, SEO, Google and Meta ads, automation. Book a free strategy session.',
    ogImageAlt: 'A glowing drop of fuel in dark smoke, with the Digital Fuel logo',
    skip: 'Skip to content',
    nav: { aria: 'Primary', services: 'Services', industries: 'Industries', programs: 'Programs', how: 'How it works', faq: 'FAQ', cta: 'Book a free session', ctaShort: 'Free session', brand: 'Digital Fuel, home', menu: 'Menu' },
    gauge: 'Fuel',
    hero: {
      aria: 'Introduction',
      kicker: 'Digital content and performance agency · Massachusetts, USA',
      h1: 'Your business is the engine. We bring the fuel.',
      cue: 'Scroll to ignite',
      b2: ['First, the spark.', 'Creative work people stop for. Websites, content, video and ads.'],
      b3: ['Then, the steady flame.', 'Performance you can count. Calls, forms and booked jobs.'],
      b4: ['Creativity and performance, in one team.', 'Digital Fuel plans, builds and runs your online advertising, then shows you what every dollar brought back.'],
      cta: 'Book your free strategy session', link: 'See how it works'
    },
    trust: {
      aria: 'Experience and certifications',
      stat: 'Over <b>10 years</b> of experience in digital marketing.',
      badges: ['Meta Business Partner badge', 'Google Partner badge', 'Google Analytics Certified Professional badge', 'BBB Accredited Business, A+ rating']
    },
    about: {
      eyebrow: 'About',
      h2: 'An agency built on two things: creativity and performance.',
      p: 'Digital Fuel is a digital content and performance agency based in Massachusetts, USA. We run the online advertising strategy for companies in many industries across the country. Our clients sell products and services: retail stores, home renovation companies, contractors and local service businesses. Every plan is built around the goals of one business, and every result is measured against them.',
      specTitle: 'Digital Fuel at a glance',
      spec: [
        ['Type', 'Digital content and performance marketing agency'],
        ['Based in', 'Marlborough, Massachusetts, USA'],
        ['Serves', 'Companies across the United States'],
        ['Industries', 'Home renovation, construction, home services, retail, local services'],
        ['Services', 'Websites, SEO, Google Ads, Meta ads, content and video, email and SMS, CRM and automation'],
        ['Experience', 'Over 10 years'],
        ['Languages', 'English and Portuguese']
      ]
    },
    pains: {
      eyebrow: 'The problem',
      h2: 'Sound familiar?',
      pairs: [
        ['You pay every month and get a report full of charts. No new jobs.', 'We report in leads, calls and sales. Every program includes support and reports.'],
        ['Leads come in, but most never pick up the phone.', 'Ads aimed at your service and your area, with automatic follow-up by text and email, so real buyers hear back fast.'],
        ["You can't tell which dollar brought which customer.", 'Call and form tracking, with a CRM that shows where each lead came from.'],
        ['The last agency promised a lot, then went quiet.', 'A U.S.-based team that answers fast and works as part of yours.']
      ],
      closer: 'That is the gap Digital Fuel was built to close.'
    },
    services: {
      eyebrow: 'Services',
      h2: 'Two halves of one fire.',
      lede: 'Creative gets attention. Performance turns it into revenue. You get both from the same team.',
      spark: {
        label: 'The spark', title: 'Creative', alt: 'A glowing drop of fuel hanging in dark smoke',
        items: [
          ['Website design', 'Custom websites built to bring in qualified leads. Hosting and ongoing support included.'],
          ['Content and social media', 'Posts, photos and video for the platforms your customers use every day.'],
          ['Photo and video production', 'Commercial photo and video shoots, with editing for ads and social.'],
          ['Branding and design', 'Visual identity and design that make a small company look established.']
        ]
      },
      flame: {
        label: 'The flame', title: 'Performance', alt: 'Orange flames with a blue base, seen up close on a dark polished floor',
        items: [
          ['SEO and local SEO', 'Built to put your business on page one of Google in your local market, for the searches your customers type.'],
          ['Google Search Ads', 'Campaigns aimed at people searching for your service right now, so the phone rings.'],
          ['Google Local Services Ads', 'Appear at the very top of Google for local searches and get calls from customers ready to hire.'],
          ['Meta ads: Facebook and Instagram', 'Targeted ads on the platforms your customers scroll every day, built to generate leads.'],
          ['Online reviews and Google Business Profile', 'A steady flow of new reviews and a tuned Google Business Profile, so your reputation sells for you.'],
          ['CRM and automation (FuelStation)', 'FuelStation, our CRM and automation platform, keeps every lead in one place and follows up for you by text and email.'],
          ['AI agent: voice and text', 'An AI agent that answers calls and messages around the clock, so no lead goes cold.'],
          ['Email and SMS marketing', 'Campaigns that bring past customers back and keep new leads warm.'],
          ['Call and form tracking', 'See which ad, keyword or page produced each call and each form.']
        ]
      }
    },
    how: {
      eyebrow: 'How it works',
      h2: 'Three steps to a running engine.',
      idle: 'Hold to ignite', done: 'Ignition on.', hint: ['Press and hold.', 'Or press Enter.'],
      steps: [
        ['Book your free strategy session', 'We learn about your business, your market and your goals.'],
        ['Get your custom game plan', 'A marketing plan built for your business, with the numbers we will track together.'],
        ['Watch growth you can measure', 'We run the campaigns, automate the follow-up and report what came back.']
      ],
      cta: 'Book your free strategy session'
    },
    industries: {
      eyebrow: 'Industries',
      h2: 'Who we fuel.',
      feature: ['Home renovation and construction', 'Our deepest experience. General contractors, painters, electricians, stone fabricators, coating and equipment companies already run on Digital Fuel.'],
      logosLabel: 'Businesses we work with', logoAlt: n => `${n} logo`,
      tiles: [
        ['Home services', 'For the trades that live on local calls: cleaning, landscaping, roofing, HVAC.'],
        ['Retail', 'Stores and product brands that need foot traffic and online sales.'],
        ['Local and professional services', 'Any business that sells a service and needs a steady flow of qualified leads.']
      ]
    },
    programs: {
      eyebrow: 'Programs',
      h2: 'Pick your fuel level.',
      lede: 'Three programs. Each one includes everything in the one before it.',
      cta: 'Check availability',
      tiers: [
        { name: 'GROW', tag: 'Scale organically', level: 0.34, items: ['Marketing strategy', 'Custom website', 'Search engine optimization', 'Google Local Services Ads', 'Meta ads: Facebook and Instagram leads', 'Video editing', 'Support and reports'] },
        { name: 'SCALE', tag: 'Results guaranteed', level: 0.67, plus: 'Everything in Grow, plus:', items: ['Local SEO and reviews boost', 'Google Search Ads', 'Custom landing pages', 'Call and form tracking', 'CRM setup and management', '8 social media posts'] },
        { name: 'ACCELERATE', tag: 'Local domination', level: 1, top: true, plus: 'Everything in Scale, plus:', items: ['Personalized CRM automations', 'AI agent: voice and text', 'Advanced SEO: blog, listings, links', 'Email marketing campaigns', 'SMS marketing campaigns', 'CRM sales training', 'Market exclusivity', 'Commercial photo and video production'] }
      ]
    },
    faq: {
      eyebrow: 'FAQ',
      h2: 'Straight answers.',
      items: [
        ['What does Digital Fuel do?', 'Digital Fuel is a digital content and performance marketing agency based in Marlborough, Massachusetts. We plan, build and run online advertising for companies across the United States: websites, SEO, Google Ads, Meta ads, content, email and automation.'],
        ['Which industries does Digital Fuel work with?', 'We work with companies that sell products and services, and our deepest experience is in home renovation and construction. Our clients include general contractors, painters, electricians, stone fabricators and retailers.'],
        ['Where is Digital Fuel located, and do you work outside Massachusetts?', 'Our office is at 2 Mt Royal Ave, Suite 210, Marlborough, MA 01752. We work with clients in every part of the United States.'],
        ['How do you measure results?', 'We measure results in leads, calls and sales. Every program includes support and reports, and the Scale and Accelerate programs add call and form tracking with a CRM, so you can see where each lead came from.'],
        ['How much does it cost to work with Digital Fuel?', 'The price depends on the program you choose (Grow, Scale or Accelerate) and on your market. You get the exact number in your free strategy session, before you commit to anything.'],
        ['How long does it take to see results?', 'Google Ads and Local Services Ads can start bringing calls within days of launch. SEO takes longer, usually a few months, and keeps working after that.'],
        ['Do you work in Portuguese?', 'Yes. Our team works in English and Portuguese, and this site is available in both languages.'],
        ['What happens in the free strategy session?', 'We learn about your business, your market and your goals, then show you a plan built for your company. The session is free and you decide what happens next.'],
        ['Do I need a new website to start?', 'Every program includes a custom website built to generate leads, with hosting and ongoing support.']
      ]
    },
    contact: {
      eyebrow: 'Contact',
      h2: "Let's fill the tank.",
      lede: 'Book your free strategy session. Tell us about your company and we will come back with a plan.',
      alt: (tel, mail) => `Prefer to talk? Call ${tel} or write to ${mail}.`,
      note: 'Your details go straight to the Digital Fuel team.',
      formTitle: 'Free strategy session form'
    },
    foot: {
      tagline: 'Digital content and performance agency. Creativity is the spark. Performance keeps it burning.',
      explore: 'Explore', contact: 'Contact', follow: 'Follow', aria: 'Footer',
      rights: '© 2026 Digital Fuel. All rights reserved.',
      marks: 'Meta, Google and BBB marks belong to their owners.',
      updated: 'Updated October 2026.'
    },
    team: {
      callAlt: 'A Digital Fuel team member on a phone call',
      planAlt: 'A Digital Fuel team member smiling and writing notes',
      tableAlt: 'Four members of the Digital Fuel team working on laptops around a meeting table',
      steps: ['Two members of the Digital Fuel team in a strategy conversation', 'A Digital Fuel team member smiling at a laptop during a planning session', 'A Digital Fuel team member reviewing campaign dashboards on two screens'],
      people: 'Real people on the other end.'
    },
    v4: { h1: ['Your business is the engine.', 'We', 'bring the', 'fuel.'] },   // hero.h1 cortado onde entram as duas pílulas
    schema: {
      orgDesc: 'Digital Fuel is a digital content and performance marketing agency based in Marlborough, Massachusetts. It plans, builds and runs online advertising for companies across the United States, with its deepest experience in home renovation and construction.',
      slogan: 'Creativity is the spark. Performance keeps it burning.',
      catalog: 'Digital marketing services'
    }
  },

  pt: {
    lang: 'pt-BR', ogLocale: 'pt_BR', ogAlt: 'en_US', path: '/pt-br/', assets: '../assets/', home: './',
    alt: { href: '../', lang: 'en', label: 'English', short: 'EN' },
    title: 'Digital Fuel | Agência de Marketing Digital nos EUA',
    desc: 'Agência de conteúdo digital e performance em Massachusetts. Sites, SEO, Google Ads, Meta e automação para empresas de brasileiros nos EUA. Sessão gratuita.',
    ogImageAlt: 'Uma gota de combustível incandescente na fumaça escura, com o logotipo da Digital Fuel',
    skip: 'Pular para o conteúdo',
    nav: { aria: 'Principal', services: 'Serviços', industries: 'Setores', programs: 'Programas', how: 'Como funciona', faq: 'Dúvidas', cta: 'Agendar sessão gratuita', ctaShort: 'Sessão grátis', brand: 'Digital Fuel, início', menu: 'Menu' },
    gauge: 'Tanque',
    hero: {
      aria: 'Apresentação',
      kicker: 'Agência de conteúdo digital e performance · Massachusetts, EUA',
      h1: 'Sua empresa é o motor. A gente traz o combustível.',
      cue: 'Role para acender',
      b2: ['Primeiro, a faísca.', 'Criação que faz a pessoa parar. Site, conteúdo, vídeo e anúncio.'],
      b3: ['Depois, a chama firme.', 'Performance que dá para contar. Ligações, formulários e serviços fechados.'],
      b4: ['Criatividade e performance, no mesmo time.', 'A Digital Fuel planeja, cria e roda a sua publicidade online, e mostra o que cada dólar trouxe de volta.'],
      cta: 'Agende sua sessão estratégica gratuita', link: 'Veja como funciona'
    },
    trust: {
      aria: 'Experiência e certificações',
      stat: 'Mais de <b>10 anos</b> de experiência em marketing digital.',
      badges: ['Selo Meta Business Partner', 'Selo Google Partner', 'Selo Google Analytics Certified Professional', 'BBB Accredited Business, nota A+']
    },
    about: {
      eyebrow: 'Sobre',
      h2: 'Uma agência feita de duas coisas: criatividade e performance.',
      p: 'A Digital Fuel é uma agência de conteúdo digital e performance com sede em Massachusetts, nos Estados Unidos. Cuidamos da estratégia de publicidade online de empresas de vários setores, no país inteiro. Nossos clientes vendem produtos e serviços: lojas, empresas de reforma, construtoras e negócios locais. Cada plano nasce dos objetivos de uma empresa só, e cada resultado é medido a partir deles.',
      specTitle: 'A Digital Fuel em resumo',
      spec: [
        ['Tipo', 'Agência de conteúdo digital e marketing de performance'],
        ['Sede', 'Marlborough, Massachusetts, EUA'],
        ['Atende', 'Empresas em todos os Estados Unidos'],
        ['Setores', 'Reforma, construção, serviços residenciais, varejo, serviços locais'],
        ['Serviços', 'Sites, SEO, Google Ads, anúncios na Meta, conteúdo e vídeo, e-mail e SMS, CRM e automação'],
        ['Experiência', 'Mais de 10 anos'],
        ['Idiomas', 'Português e inglês']
      ]
    },
    pains: {
      eyebrow: 'O problema',
      h2: 'Isso soa familiar?',
      pairs: [
        ['Você paga todo mês e recebe um relatório cheio de gráfico. Serviço novo, nenhum.', 'A gente reporta em leads, ligações e vendas. Todo programa inclui suporte e relatórios.'],
        ['O lead até chega, mas quase ninguém atende o telefone.', 'Anúncio mirado no seu serviço e na sua região, com retorno automático por mensagem e e-mail, para quem quer comprar ouvir de você rápido.'],
        ['Você não sabe qual dólar trouxe qual cliente.', 'Rastreamento de ligações e formulários, com um CRM que mostra de onde veio cada lead.'],
        ['A última agência prometeu muito e depois sumiu.', 'Um time nos Estados Unidos, que responde rápido e trabalha como parte da sua equipe.']
      ],
      closer: 'Foi para fechar esse buraco que a Digital Fuel foi criada.'
    },
    services: {
      eyebrow: 'Serviços',
      h2: 'Duas metades do mesmo fogo.',
      lede: 'A criação chama atenção. A performance transforma atenção em faturamento. Você recebe as duas do mesmo time.',
      spark: {
        label: 'A faísca', title: 'Criação', alt: 'Uma gota de combustível incandescente parada na fumaça escura',
        items: [
          ['Criação de sites', 'Sites sob medida, feitos para trazer leads qualificados. Hospedagem e suporte contínuo incluídos.'],
          ['Conteúdo e redes sociais', 'Posts, fotos e vídeos para as plataformas que seus clientes usam todo dia.'],
          ['Produção de foto e vídeo', 'Gravações comerciais de foto e vídeo, com edição para anúncios e redes sociais.'],
          ['Branding e design', 'Identidade visual e design que fazem uma empresa pequena parecer estabelecida.']
        ]
      },
      flame: {
        label: 'A chama', title: 'Performance', alt: 'Chamas laranja com base azul, vistas de perto sobre um piso escuro polido',
        items: [
          ['SEO e SEO local', 'Trabalho feito para colocar sua empresa na primeira página do Google na sua região, nas buscas que seus clientes digitam.'],
          ['Google Search Ads', 'Campanhas para quem está procurando o seu serviço agora, para o telefone tocar.'],
          ['Google Local Services Ads', 'Apareça no topo do Google nas buscas locais e receba ligações de clientes prontos para contratar.'],
          ['Anúncios na Meta: Facebook e Instagram', 'Anúncios segmentados nas plataformas em que seus clientes passam o dia, feitos para gerar leads.'],
          ['Avaliações online e Perfil da Empresa no Google', 'Um fluxo constante de avaliações novas e um Perfil da Empresa no Google bem ajustado, para a sua reputação vender por você.'],
          ['CRM e automação (FuelStation)', 'O FuelStation, nossa plataforma de CRM e automação, guarda cada lead em um lugar só e faz o retorno por mensagem e e-mail para você.'],
          ['Agente de IA: voz e texto', 'Um agente de IA que atende ligações e mensagens a qualquer hora, para nenhum lead esfriar.'],
          ['E-mail e SMS marketing', 'Campanhas que trazem clientes antigos de volta e mantêm os novos leads aquecidos.'],
          ['Rastreamento de ligações e formulários', 'Veja qual anúncio, palavra-chave ou página gerou cada ligação e cada formulário.']
        ]
      }
    },
    how: {
      eyebrow: 'Como funciona',
      h2: 'Três passos para o motor ligar.',
      idle: 'Segure para dar a partida', done: 'Motor ligado.', hint: ['Pressione e segure.', 'Ou aperte Enter.'],
      steps: [
        ['Agende sua sessão estratégica gratuita', 'A gente conhece sua empresa, seu mercado e seus objetivos.'],
        ['Receba seu plano sob medida', 'Um plano de marketing feito para a sua empresa, com os números que vamos acompanhar juntos.'],
        ['Acompanhe um crescimento que dá para medir', 'A gente roda as campanhas, automatiza o retorno aos leads e reporta o que voltou.']
      ],
      cta: 'Agende sua sessão estratégica gratuita'
    },
    industries: {
      eyebrow: 'Setores',
      h2: 'Quem a gente abastece.',
      feature: ['Reforma e construção', 'Nossa experiência mais profunda. Construtoras, pintores, eletricistas, marmorarias e empresas de revestimento e equipamentos já rodam com a Digital Fuel.'],
      logosLabel: 'Empresas que atendemos', logoAlt: n => `Logotipo da ${n}`,
      tiles: [
        ['Serviços residenciais', 'Para quem vive de chamada local: limpeza, paisagismo, telhado, ar-condicionado.'],
        ['Varejo', 'Lojas e marcas de produto que precisam de movimento na loja e de venda online.'],
        ['Serviços locais e profissionais', 'Qualquer negócio que vende serviço e precisa de um fluxo constante de leads qualificados.']
      ]
    },
    programs: {
      eyebrow: 'Programas',
      h2: 'Escolha o nível do tanque.',
      lede: 'Três programas. Cada um inclui tudo do anterior.',
      cta: 'Consultar disponibilidade',
      tiers: [
        { name: 'GROW', tag: 'Crescimento orgânico', level: 0.34, items: ['Estratégia de marketing', 'Site sob medida', 'Otimização para buscadores (SEO)', 'Google Local Services Ads', 'Anúncios na Meta: leads no Facebook e Instagram', 'Edição de vídeo', 'Suporte e relatórios'] },
        { name: 'SCALE', tag: 'Resultados garantidos', level: 0.67, plus: 'Tudo do Grow, e mais:', items: ['SEO local e impulso de avaliações', 'Google Search Ads', 'Landing pages sob medida', 'Rastreamento de ligações e formulários', 'Implantação e gestão de CRM', '8 posts para redes sociais'] },
        { name: 'ACCELERATE', tag: 'Domínio local', level: 1, top: true, plus: 'Tudo do Scale, e mais:', items: ['Automações de CRM personalizadas', 'Agente de IA: voz e texto', 'SEO avançado: blog, listagens e links', 'Campanhas de e-mail marketing', 'Campanhas de SMS marketing', 'Treinamento de vendas no CRM', 'Exclusividade de mercado', 'Produção comercial de foto e vídeo'] }
      ]
    },
    faq: {
      eyebrow: 'Dúvidas',
      h2: 'Respostas diretas.',
      items: [
        ['O que a Digital Fuel faz?', 'A Digital Fuel é uma agência de conteúdo digital e marketing de performance com sede em Marlborough, Massachusetts. A gente planeja, cria e roda a publicidade online de empresas em todos os Estados Unidos: sites, SEO, Google Ads, anúncios na Meta, conteúdo, e-mail e automação.'],
        ['Com quais setores a Digital Fuel trabalha?', 'Trabalhamos com empresas que vendem produtos e serviços, e nossa experiência mais profunda é em reforma e construção. Entre os clientes estão construtoras, pintores, eletricistas, marmorarias e lojas.'],
        ['Onde fica a Digital Fuel? Vocês atendem fora de Massachusetts?', 'Nosso escritório fica na 2 Mt Royal Ave, Suite 210, Marlborough, MA 01752. Atendemos clientes em qualquer parte dos Estados Unidos.'],
        ['Minha empresa é de brasileiros nos EUA. Vocês anunciam para o público americano?', 'Sim. As campanhas são feitas em inglês, para o cliente americano da sua região, e todo o nosso contato com você pode ser em português.'],
        ['Como vocês medem resultado?', 'Medimos resultado em leads, ligações e vendas. Todo programa inclui suporte e relatórios, e os programas Scale e Accelerate somam rastreamento de ligações e formulários com um CRM, para você ver de onde veio cada lead.'],
        ['Quanto custa trabalhar com a Digital Fuel?', 'O valor depende do programa escolhido (Grow, Scale ou Accelerate) e do seu mercado. Você recebe o número exato na sessão estratégica gratuita, antes de assumir qualquer compromisso.'],
        ['Em quanto tempo aparecem os resultados?', 'Google Ads e Local Services Ads podem começar a trazer ligações poucos dias depois de entrarem no ar. SEO leva mais tempo, em geral alguns meses, e continua trabalhando depois disso.'],
        ['O atendimento é em português?', 'Sim. Nosso time atende em português e em inglês, e este site existe nos dois idiomas.'],
        ['O que acontece na sessão estratégica gratuita?', 'A gente conhece sua empresa, seu mercado e seus objetivos, e mostra um plano feito para o seu negócio. A sessão é gratuita e quem decide o próximo passo é você.'],
        ['Preciso de um site novo para começar?', 'Todo programa inclui um site sob medida, feito para gerar leads, com hospedagem e suporte contínuo.']
      ]
    },
    contact: {
      eyebrow: 'Contato',
      h2: 'Vamos encher o tanque.',
      lede: 'Agende sua sessão estratégica gratuita. Conte sobre a sua empresa e a gente volta com um plano.',
      alt: (tel, mail) => `Prefere conversar? Ligue para ${tel} ou escreva para ${mail}.`,
      note: 'Seus dados vão direto para o time da Digital Fuel. O formulário está em inglês, mas pode responder em português.',
      formTitle: 'Formulário da sessão estratégica gratuita'
    },
    foot: {
      tagline: 'Agência de conteúdo digital e performance. A criatividade é a faísca. A performance mantém aceso.',
      explore: 'Navegue', contact: 'Contato', follow: 'Redes', aria: 'Rodapé',
      rights: '© 2026 Digital Fuel. Todos os direitos reservados.',
      marks: 'As marcas Meta, Google e BBB pertencem aos seus donos.',
      updated: 'Atualizado em outubro de 2026.'
    },
    team: {
      callAlt: 'Integrante do time da Digital Fuel em uma ligação',
      planAlt: 'Integrante do time da Digital Fuel sorrindo e fazendo anotações',
      tableAlt: 'Quatro integrantes do time da Digital Fuel trabalhando em notebooks em volta de uma mesa de reunião',
      steps: ['Dois integrantes do time da Digital Fuel em uma conversa de estratégia', 'Integrante do time da Digital Fuel sorrindo diante do notebook em uma sessão de planejamento', 'Integrante do time da Digital Fuel analisando painéis de campanha em duas telas'],
      people: 'Gente de verdade do outro lado.'
    },
    v4: { h1: ['Sua empresa é o motor.', 'A gente', 'traz o', 'combustível.'] },
    schema: {
      orgDesc: 'A Digital Fuel é uma agência de conteúdo digital e marketing de performance com sede em Marlborough, Massachusetts. Planeja, cria e roda a publicidade online de empresas em todos os Estados Unidos, com experiência mais profunda em reforma e construção.',
      slogan: 'A criatividade é a faísca. A performance mantém aceso.',
      catalog: 'Serviços de marketing digital'
    }
  }
};

const e = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const BADGES = ['meta-business-partner.jpg', 'google-partner.jpg', 'google-analytics-certified.jpg', 'bbb-accredited-a-plus.png'];
const BADGE_SIZE = { 'bbb-accredited-a-plus.png': [500, 242] };

function schema(t, url = ORIGIN + t.path) {
  const org = ORIGIN + '/#organization', site = ORIGIN + '/#website';
  const services = [...t.services.spark.items, ...t.services.flame.items];
  const graph = [
    {
      '@type': ['ProfessionalService', 'LocalBusiness'], '@id': org,
      name: 'Digital Fuel', alternateName: 'Digital Fuel Agency', url: ORIGIN + '/',
      logo: ORIGIN + '/assets/logo-digital-fuel.png', image: ORIGIN + '/assets/og-digital-fuel.jpg',
      description: t.schema.orgDesc, slogan: t.schema.slogan,
      telephone: '+1-351-210-2512', email: EMAIL,
      address: { '@type': 'PostalAddress', streetAddress: '2 Mt Royal Ave, Suite 210', addressLocality: 'Marlborough', addressRegion: 'MA', postalCode: '01752', addressCountry: 'US' },
      hasMap: MAP,
      areaServed: { '@type': 'Country', name: 'United States' },
      knowsLanguage: ['en', 'pt-BR'],
      knowsAbout: ['Digital marketing', 'Performance marketing', 'Lead generation', 'Search engine optimization', 'Local SEO', 'Google Ads', 'Google Local Services Ads', 'Meta ads', 'Web design', 'Content marketing', 'Marketing automation', 'CRM', 'Home renovation marketing', 'Construction marketing'],
      sameAs: SOCIAL.map(s => s[1]),
      hasOfferCatalog: {
        '@type': 'OfferCatalog', name: t.schema.catalog,
        itemListElement: services.map(([name, description]) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name, description, provider: { '@id': org }, areaServed: { '@type': 'Country', name: 'United States' } } }))
      }
    },
    { '@type': 'WebSite', '@id': site, url: ORIGIN + '/', name: 'Digital Fuel', inLanguage: ['en', 'pt-BR'], publisher: { '@id': org } },
    {
      '@type': 'WebPage', '@id': url + '#webpage', url, name: t.title, description: t.desc, inLanguage: t.lang,
      isPartOf: { '@id': site }, about: { '@id': org }, dateModified: UPDATED,
      primaryImageOfPage: { '@type': 'ImageObject', url: ORIGIN + '/assets/og-digital-fuel.jpg', width: 1200, height: 630 }
    },
    {
      '@type': 'FAQPage', '@id': url + '#faq', inLanguage: t.lang, isPartOf: { '@id': url + '#webpage' },
      mainEntity: t.faq.items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
    }
  ];
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}

function page(t, v = 1) {
  const two = v === 2, three = v === 3, extra = v > 1;   // versions 2 and 3 live under /site-2/ and /site-3/
  const A = (extra ? '../' : '') + t.assets, base = ORIGIN + (extra ? '/site-' + v : ''), url = base + t.path;
  const tel = `<a href="${PHONE.href}">${PHONE.text}</a>`, mail = `<a href="mailto:${EMAIL}">${EMAIL}</a>`;
  const svc = items => items.map(([h, p]) => `            <li><h4>${e(h)}</h4><p>${e(p)}</p></li>`).join('\n');
  const band = (n, a, b, fx, inner) => `        <div class="band band--${n}" data-a="${a}" data-b="${b}" data-fx="${fx}">\n${inner}\n        </div>`;

  const hero = three ? `  <section class="hero hero--film" id="top" aria-label="${e(t.hero.aria)}">
    <div class="stage">
      <div class="poster" role="img" aria-label="${e(t.team.tableAlt)}"></div>
      <video class="scene" data-src="team-film.mp4" data-poster="team-film-poster.jpg" preload="none" muted playsinline disablepictureinpicture aria-hidden="true" tabindex="-1"></video>
      <div class="scrim" aria-hidden="true"></div>
      <div class="bands">
${band(1, 0, 0.24, 'drift', `          <h1><span class="kicker chip">${e(t.hero.kicker)}</span> <span class="display split">${e(t.hero.h1)}</span></h1>
          <p class="cue" aria-hidden="true">${e(t.hero.cue)}</p>`)}
${band(2, 0.26, 0.49, 'fall', `          <p class="display split">${e(t.hero.b2[0])}</p>
          <p class="band__sub">${e(t.hero.b2[1])}</p>`)}
${band(3, 0.51, 0.74, 'punch', `          <p class="display split">${e(t.hero.b3[0])}</p>
          <p class="band__sub">${e(t.hero.b3[1])}</p>`)}
${band(4, 0.76, 1, 'rise', `          <p class="display split">${e(t.hero.b4[0])}</p>
          <p class="band__sub">${e(t.hero.b4[1])}</p>
          <p class="band__cta"><a class="btn" href="#contact">${e(t.hero.cta)}</a> <a class="link" href="#how">${e(t.hero.link)}</a></p>`)}
      </div>
    </div>
  </section>
` : two ? `  <section class="hero hero--team" id="top" aria-label="${e(t.hero.aria)}">
    <div class="stage">
      <div class="bands">
${band(1, 0, 0.24, 'drift', `          <h1><span class="kicker chip">${e(t.hero.kicker)}</span> <span class="display split">${e(t.hero.h1)}</span></h1>
          <p class="cue" aria-hidden="true">${e(t.hero.cue)}</p>`)}
${band(2, 0.26, 0.49, 'fall', `          <p class="display split">${e(t.hero.b2[0])}</p>
          <p class="band__sub">${e(t.hero.b2[1])}</p>`)}
${band(3, 0.51, 0.74, 'punch', `          <p class="display split">${e(t.hero.b3[0])}</p>
          <p class="band__sub">${e(t.hero.b3[1])}</p>`)}
${band(4, 0.76, 1, 'rise', `          <p class="display split">${e(t.hero.b4[0])}</p>
          <p class="band__sub">${e(t.hero.b4[1])}</p>
          <p class="band__cta"><a class="btn" href="#contact">${e(t.hero.cta)}</a> <a class="link" href="#how">${e(t.hero.link)}</a></p>`)}
      </div>
      <div class="duo">
        <figure class="portrait portrait--call"><img src="${A}team-call.jpg" alt="${e(t.team.callAlt)}" width="497" height="1024" fetchpriority="high" decoding="async"></figure>
        <figure class="portrait portrait--plan"><img src="${A}team-plan.jpg" alt="${e(t.team.planAlt)}" width="497" height="1024" fetchpriority="high" decoding="async"></figure>
      </div>
    </div>
  </section>
` : `  <section class="hero" id="top" aria-label="${e(t.hero.aria)}">
    <div class="stage">
      <div class="poster" aria-hidden="true"></div>
      <canvas class="scene" width="1920" height="1072" aria-hidden="true"></canvas>
      <div class="scrim" aria-hidden="true"></div>
      <div class="bands">
${band(1, 0, 0.24, 'drift', `          <h1><span class="kicker chip">${e(t.hero.kicker)}</span> <span class="display split">${e(t.hero.h1)}</span></h1>
          <p class="cue" aria-hidden="true">${e(t.hero.cue)}</p>`)}
${band(2, 0.26, 0.49, 'fall', `          <p class="display split">${e(t.hero.b2[0])}</p>
          <p class="band__sub">${e(t.hero.b2[1])}</p>`)}
${band(3, 0.51, 0.74, 'punch', `          <p class="display split">${e(t.hero.b3[0])}</p>
          <p class="band__sub">${e(t.hero.b3[1])}</p>`)}
${band(4, 0.76, 1, 'rise', `          <p class="display split">${e(t.hero.b4[0])}</p>
          <p class="band__sub">${e(t.hero.b4[1])}</p>
          <p class="band__cta"><a class="btn" href="#contact">${e(t.hero.cta)}</a> <a class="link" href="#how">${e(t.hero.link)}</a></p>`)}
      </div>
    </div>
  </section>
`;
  const about = three ? `  <section class="sec about about--duo" id="about">
    <div class="wrap about__grid">
      <div data-reveal>
        <p class="eyebrow mono">${e(t.about.eyebrow)}</p>
        <h2>${e(t.about.h2)}</h2>
        <p class="lede">${e(t.about.p)}</p>
        <figure class="duo"><span class="portrait"><img src="${A}team-call.jpg" alt="${e(t.team.callAlt)}" width="497" height="1024" loading="lazy" decoding="async"></span><span class="portrait"><img src="${A}team-plan.jpg" alt="${e(t.team.planAlt)}" width="497" height="1024" loading="lazy" decoding="async"></span></figure>
      </div>
      <aside class="spec" aria-labelledby="spec-title" data-reveal>
        <h3 id="spec-title">${e(t.about.specTitle)}</h3>
        <dl>
${t.about.spec.map(([k, v]) => `          <div><dt>${e(k)}</dt><dd>${e(v)}</dd></div>`).join('\n')}
        </dl>
      </aside>
    </div>
  </section>
` : two ? `  <section class="sec about about--team" id="about">
    <div class="wrap">
      <div data-reveal>
        <p class="eyebrow mono">${e(t.about.eyebrow)}</p>
        <h2>${e(t.about.h2)}</h2>
      </div>
      <div data-reveal>
        <figure class="about__photo"><img src="${A}team-table.jpg" alt="${e(t.team.tableAlt)}" width="1436" height="626" loading="lazy" decoding="async"></figure>
      </div>
      <div class="about__grid">
        <div data-reveal><p class="lede">${e(t.about.p)}</p></div>
        <aside class="spec" aria-labelledby="spec-title" data-reveal>
          <h3 id="spec-title">${e(t.about.specTitle)}</h3>
          <dl>
${t.about.spec.map(([k, v]) => `            <div><dt>${e(k)}</dt><dd>${e(v)}</dd></div>`).join('\n')}
          </dl>
        </aside>
      </div>
    </div>
  </section>
` : `  <section class="sec about" id="about">
    <div class="wrap about__grid">
      <div data-reveal>
        <p class="eyebrow mono">${e(t.about.eyebrow)}</p>
        <h2>${e(t.about.h2)}</h2>
        <p class="lede">${e(t.about.p)}</p>
      </div>
      <aside class="spec" aria-labelledby="spec-title" data-reveal>
        <h3 id="spec-title">${e(t.about.specTitle)}</h3>
        <dl>
${t.about.spec.map(([k, v]) => `          <div><dt>${e(k)}</dt><dd>${e(v)}</dd></div>`).join('\n')}
        </dl>
      </aside>
    </div>
  </section>
`;
  const how = extra ? `  <section class="sec how how--team" id="how">
    <div class="wrap how__grid">
      <div class="how__intro" data-reveal>
        <div>
          <p class="eyebrow mono">${e(t.how.eyebrow)}</p>
          <h2>${e(t.how.h2)}</h2>
        </div>
        <div>
        <button class="ignite" type="button" aria-pressed="false" data-idle="${e(t.how.idle)}" data-done="${e(t.how.done)}">
          <span class="ignite__ring" aria-hidden="true"><svg viewBox="0 0 64 64"><circle class="trk" cx="32" cy="32" r="28"/><circle class="prg" cx="32" cy="32" r="28"/><path class="drop" d="M32 17c0 0-10 13-10 20.500a10 10 0 0 0 20 0C42 30 32 17 32 17z"/></svg></span>
          <span class="ignite__label">${e(t.how.idle)}</span>
        </button>
        <p class="ignite__hint">${e(t.how.hint[0])} <span class="kbd">${e(t.how.hint[1])}</span></p>
        <p class="ignite__status vh" role="status" aria-live="polite"></p>
        <p class="how__cta"><a class="btn" href="#contact">${e(t.how.cta)}</a></p>
        </div>
      </div>
      <ol class="steps steps--photo" data-reveal>
${t.how.steps.map(([h, p], i) => `        <li class="step"><figure class="step__ph"><img src="${A}team-step-${i + 1}.jpg" alt="${e(t.team.steps[i])}" width="491" height="343" loading="lazy" decoding="async"></figure><span class="step__n mono">0${i + 1}</span><h3>${e(h)}</h3><p>${e(p)}</p></li>`).join('\n')}
      </ol>
    </div>
  </section>
` : `  <section class="sec how" id="how">
    <div class="wrap how__grid">
      <div data-reveal>
        <p class="eyebrow mono">${e(t.how.eyebrow)}</p>
        <h2>${e(t.how.h2)}</h2>
        <button class="ignite" type="button" aria-pressed="false" data-idle="${e(t.how.idle)}" data-done="${e(t.how.done)}">
          <span class="ignite__ring" aria-hidden="true"><svg viewBox="0 0 64 64"><circle class="trk" cx="32" cy="32" r="28"/><circle class="prg" cx="32" cy="32" r="28"/><path class="drop" d="M32 17c0 0-10 13-10 20.500a10 10 0 0 0 20 0C42 30 32 17 32 17z"/></svg></span>
          <span class="ignite__label">${e(t.how.idle)}</span>
        </button>
        <p class="ignite__hint">${e(t.how.hint[0])} <span class="kbd">${e(t.how.hint[1])}</span></p>
        <p class="ignite__status vh" role="status" aria-live="polite"></p>
        <p class="how__cta"><a class="btn" href="#contact">${e(t.how.cta)}</a></p>
      </div>
      <ol class="steps" data-reveal>
${t.how.steps.map(([h, p], i) => `        <li class="step"><span class="step__n mono">0${i + 1}</span><h3>${e(h)}</h3><p>${e(p)}</p></li>`).join('\n')}
      </ol>
    </div>
  </section>
`;
  const contact = two ? `  <section class="sec contact" id="contact">
    <div class="wrap contact__grid">
      <div data-reveal>
        <p class="eyebrow mono">${e(t.contact.eyebrow)}</p>
        <h2>${e(t.contact.h2)}</h2>
        <p class="lede">${e(t.contact.lede)}</p>
        <p class="contact__alt">${t.contact.alt(tel, mail)}</p>
        <address><a href="${MAP}" rel="noopener">2 Mt Royal Ave, Suite 210<br>Marlborough, MA 01752</a></address>
        <figure class="people"><span class="portrait"><img src="${A}team-call.jpg" alt="" width="497" height="1024" loading="lazy" decoding="async"></span><span class="portrait"><img src="${A}team-plan.jpg" alt="" width="497" height="1024" loading="lazy" decoding="async"></span><figcaption class="mono">${e(t.team.people)}</figcaption></figure>
      </div>
      <div class="formcard" data-reveal>
        <iframe src="https://api.leadconnectorhq.com/widget/form/${FORM}" id="inline-${FORM}" title="${e(t.contact.formTitle)}" loading="lazy" data-layout="{'id':'INLINE'}" data-trigger-type="alwaysShow" data-trigger-value="" data-activation-type="alwaysActivated" data-activation-value="" data-deactivation-type="neverDeactivate" data-deactivation-value="" data-form-name="Lead Sales - Form" data-height="1010" data-layout-iframe-id="inline-${FORM}" data-form-id="${FORM}"></iframe>
        <p class="formcard__note">${e(t.contact.note)}</p>
      </div>
    </div>
  </section>
` : `  <section class="sec contact" id="contact">
    <div class="contact__bg" aria-hidden="true"></div>
    <div class="wrap contact__grid">
      <div data-reveal>
        <p class="eyebrow mono">${e(t.contact.eyebrow)}</p>
        <h2>${e(t.contact.h2)}</h2>
        <p class="lede">${e(t.contact.lede)}</p>
        <p class="contact__alt">${t.contact.alt(tel, mail)}</p>
        <address><a href="${MAP}" rel="noopener">2 Mt Royal Ave, Suite 210<br>Marlborough, MA 01752</a></address>
      </div>
      <div class="formcard" data-reveal>
        <iframe src="https://api.leadconnectorhq.com/widget/form/${FORM}" id="inline-${FORM}" title="${e(t.contact.formTitle)}" loading="lazy" data-layout="{'id':'INLINE'}" data-trigger-type="alwaysShow" data-trigger-value="" data-activation-type="alwaysActivated" data-activation-value="" data-deactivation-type="neverDeactivate" data-deactivation-value="" data-form-name="Lead Sales - Form" data-height="1010" data-layout-iframe-id="inline-${FORM}" data-form-id="${FORM}"></iframe>
        <p class="formcard__note">${e(t.contact.note)}</p>
      </div>
    </div>
  </section>
`;

  // the film is calm, so its captions enter calmly
  const heroOut = three ? hero.replace('data-fx="fall"', 'data-fx="drift"').replace('data-fx="punch"', 'data-fx="rise"') : hero;
  const contactOut = three ? contact.replace('class="sec contact"', 'class="sec contact contact--film"') : contact;

  return `<!doctype html>
<html lang="${t.lang}" data-assets="${A}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(t.title)}</title>
<meta name="description" content="${e(t.desc)}">
<meta name="robots" content="${extra ? 'noindex, follow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'}">
<meta name="theme-color" content="${three ? '#0d0d0e' : two ? '#110e0c' : '#0f1114'}">
<meta name="color-scheme" content="dark">
<meta name="geo.region" content="US-MA">
<meta name="geo.placename" content="Marlborough">
<!-- DEPLOY STEP: confirme o domínio do ar. canonical, hreflang, og:url, og:image, sitemap.xml, robots.txt e llms.txt usam ${ORIGIN} -->
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="en" href="${base}/">
<link rel="alternate" hreflang="pt-BR" href="${base}/pt-br/">
<link rel="alternate" hreflang="x-default" href="${base}/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Digital Fuel">
<meta property="og:title" content="${e(t.title)}">
<meta property="og:description" content="${e(t.desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ORIGIN}/assets/og-digital-fuel.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${e(t.ogImageAlt)}">
<meta property="og:locale" content="${t.ogLocale}">
<meta property="og:locale:alternate" content="${t.ogAlt}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${e(t.title)}">
<meta name="twitter:description" content="${e(t.desc)}">
<meta name="twitter:image" content="${ORIGIN}/assets/og-digital-fuel.jpg">
<link rel="icon" type="image/png" href="${A}favicon.png">
<link rel="apple-touch-icon" href="${A}apple-touch-icon.png">
<script>(function(){var d=document.documentElement,G=${JSON.stringify(GATES)},s=false,i;window.__GATES=G;for(i=0;i<G.length;i++){if(window.matchMedia(G[i]).matches){s=true;break}}d.className+=" js "+(s?"static":"scrub")})()</script>
${three ? `<link rel="preload" as="image" href="${A}team-film-poster.jpg" fetchpriority="high">\n` : two ? '' : `<link rel="preload" as="image" href="${A}hero-poster.jpg" media="(min-width: 721px) and (orientation: landscape)" fetchpriority="high">
<link rel="preload" as="image" href="${A}hero-clean-m.jpg" media="(max-width: 720px), (orientation: portrait) and (max-width: 1024px)" fetchpriority="high">
<link rel="preload" as="image" href="${A}hero-drop-light.jpg" media="(max-width: 720px), (orientation: portrait) and (max-width: 1024px)">
`}<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@112..125,700..800&amp;family=DM+Mono:wght@400;500&amp;family=Instrument+Sans:wght@400;500;600&amp;display=swap">
<link rel="stylesheet" href="${A}site.css">${extra ? `\n<link rel="stylesheet" href="${A}site${v}.css">` : ''}
<script type="application/ld+json">${schema(t, url)}</script>
</head>
<body>
<a class="skip" href="#main">${e(t.skip)}</a>
<div class="ambient" aria-hidden="true"></div>
<div class="gauge" aria-hidden="true"><span class="gauge__f">F</span><span class="gauge__track"><i class="gauge__fill"></i></span><span class="gauge__e">E</span><span class="gauge__read" data-label="${e(t.gauge)}">${e(t.gauge)} 0%</span></div>

<header class="nav">
  <a class="nav__brand" href="${t.home}" aria-label="${e(t.nav.brand)}"><img src="${A}logo-digital-fuel.png" alt="Digital Fuel" width="470" height="127"></a>
  <nav class="nav__links" id="nav-links" aria-label="${e(t.nav.aria)}">
    <a href="#services">${e(t.nav.services)}</a>
    <a href="#industries">${e(t.nav.industries)}</a>
    <a href="#programs">${e(t.nav.programs)}</a>
    <a href="#how">${e(t.nav.how)}</a>
    <a href="#faq">${e(t.nav.faq)}</a>
    <a class="nav__alt" href="${t.alt.href}" hreflang="${t.alt.lang}" lang="${t.alt.lang}">${e(t.alt.label)}</a>
  </nav>
  <a class="nav__lang" href="${t.alt.href}" hreflang="${t.alt.lang}" lang="${t.alt.lang}" data-short="${t.alt.short}">${e(t.alt.label)}</a>
  <a class="btn btn--sm" href="#contact" data-short="${e(t.nav.ctaShort)}">${e(t.nav.cta)}</a>
  <button class="nav__toggle" type="button" aria-expanded="false" aria-controls="nav-links" aria-label="${e(t.nav.menu)}"><span></span><span></span></button>
</header>

<main id="main" tabindex="-1">

${heroOut}
  <section class="trust" aria-label="${e(t.trust.aria)}">
    <div class="wrap trust__row" data-reveal>
      <p class="trust__stat">${t.trust.stat}</p>
      <ul class="badges">
${BADGES.map((f, i) => { const [w, h] = BADGE_SIZE[f] || [474, 184]; return `        <li><img src="${A}badges/${f}" alt="${e(t.trust.badges[i])}" width="${w}" height="${h}" loading="lazy" decoding="async"></li>`; }).join('\n')}
      </ul>
    </div>
  </section>

${about}
  <section class="sec pains" id="why">
    <div class="wrap">
      <div data-reveal>
        <p class="eyebrow mono">${e(t.pains.eyebrow)}</p>
        <h2>${e(t.pains.h2)}</h2>
      </div>
      <ol class="pairs">
${t.pains.pairs.map(([p, f]) => `        <li class="pair" data-reveal><p class="pain">${e(p)}</p><span class="pair__link" aria-hidden="true"></span><p class="fix">${e(f)}</p></li>`).join('\n')}
      </ol>
      <div data-reveal><p class="closer">${e(t.pains.closer)}</p></div>
    </div>
  </section>

  <section class="sec services${extra ? ' services--team' : ''}" id="services">
    <div class="wrap">
      <header class="sec__head" data-reveal>
        <p class="eyebrow mono">${e(t.services.eyebrow)}</p>
        <h2>${e(t.services.h2)}</h2>
        <p class="lede">${e(t.services.lede)}</p>
      </header>
      <div class="halves">
        <div class="half half--spark" data-reveal>
${extra ? '' : `          <figure class="half__media"><img src="${A}spark.jpg" alt="${e(t.services.spark.alt)}" width="880" height="880" loading="lazy" decoding="async"></figure>
`}          <h3 class="half__title"><span class="mono">${e(t.services.spark.label)}</span> ${e(t.services.spark.title)}</h3>
          <ul class="svc">
${svc(t.services.spark.items)}
          </ul>
        </div>
        <div class="fuse" aria-hidden="true"><i></i><b></b></div>
        <div class="half half--flame" data-reveal>
${extra ? '' : `          <figure class="half__media"><img src="${A}flame.jpg" alt="${e(t.services.flame.alt)}" width="880" height="880" loading="lazy" decoding="async"></figure>
`}          <h3 class="half__title"><span class="mono">${e(t.services.flame.label)}</span> ${e(t.services.flame.title)}</h3>
          <ul class="svc">
${svc(t.services.flame.items)}
          </ul>
        </div>
      </div>
    </div>
  </section>

${how}
  <section class="sec industries" id="industries">
    <div class="wrap">
      <div data-reveal>
        <p class="eyebrow mono">${e(t.industries.eyebrow)}</p>
        <h2>${e(t.industries.h2)}</h2>
      </div>
      <div class="bento" data-reveal>
        <article class="tile tile--feature">
          <h3>${e(t.industries.feature[0])}</h3>
          <p>${e(t.industries.feature[1])}</p>
          <span class="mono">${e(t.industries.logosLabel)}</span>
          <ul class="logos">
${CLIENTS.map(([f, n]) => `            <li><img src="${A}clients/${f}.jpg" alt="${e(t.industries.logoAlt(n))}" width="422" height="198" loading="lazy" decoding="async"></li>`).join('\n')}
          </ul>
        </article>
${t.industries.tiles.map(([h, p]) => `        <article class="tile"><h3>${e(h)}</h3><p>${e(p)}</p></article>`).join('\n')}
      </div>
    </div>
  </section>

  <section class="sec programs" id="programs">
    <div class="wrap">
      <header class="sec__head" data-reveal>
        <p class="eyebrow mono">${e(t.programs.eyebrow)}</p>
        <h2>${e(t.programs.h2)}</h2>
        <p class="lede">${e(t.programs.lede)}</p>
      </header>
      <div class="tiers" data-reveal>
${t.programs.tiers.map(r => `        <article class="tier${r.top ? ' tier--top' : ''}" style="--level:${r.level}">
          <div class="tank" aria-hidden="true"><i></i></div>
          <h3>${e(r.name)}</h3>
          <p class="tier__tag mono">${e(r.tag)}</p>${r.plus ? `\n          <p class="tier__plus">${e(r.plus)}</p>` : ''}
          <ul>
${r.items.map(x => `            <li>${e(x)}</li>`).join('\n')}
          </ul>
          <a class="btn btn--ghost" href="#contact">${e(t.programs.cta)}</a>
        </article>`).join('\n')}
      </div>
    </div>
  </section>

  <section class="sec faq" id="faq">
    <div class="wrap faq__grid">
      <div data-reveal>
        <p class="eyebrow mono">${e(t.faq.eyebrow)}</p>
        <h2>${e(t.faq.h2)}</h2>
      </div>
      <div class="faq__list" data-reveal>
${t.faq.items.map(([q, a], i) => `        <details${i === 0 ? ' open' : ''}><summary><h3>${e(q)}</h3></summary><p>${e(a)}</p></details>`).join('\n')}
      </div>
    </div>
  </section>

${contactOut}
</main>

<footer class="foot">
  <div class="wrap">
    <div class="foot__grid">
      <div class="foot__brand">
        <img src="${A}logo-digital-fuel.png" alt="Digital Fuel" width="470" height="127" loading="lazy" decoding="async">
        <p>${e(t.foot.tagline)}</p>
      </div>
      <nav aria-label="${e(t.foot.aria)}">
        <h2>${e(t.foot.explore)}</h2>
        <ul>
          <li><a href="#services">${e(t.nav.services)}</a></li>
          <li><a href="#industries">${e(t.nav.industries)}</a></li>
          <li><a href="#programs">${e(t.nav.programs)}</a></li>
          <li><a href="#how">${e(t.nav.how)}</a></li>
          <li><a href="#faq">${e(t.nav.faq)}</a></li>
          <li><a href="${t.alt.href}" hreflang="${t.alt.lang}" lang="${t.alt.lang}">${e(t.alt.label)}</a></li>
        </ul>
      </nav>
      <div>
        <h2>${e(t.foot.contact)}</h2>
        <address>
          <a href="${MAP}" rel="noopener">2 Mt Royal Ave, Suite 210<br>Marlborough, MA 01752</a><br>
          ${tel}<br>
          ${mail}
        </address>
        <h2 style="margin-top:1.6rem">${e(t.foot.follow)}</h2>
        <ul>
${SOCIAL.map(([n, u]) => `          <li><a href="${u}" rel="noopener me">${n}</a></li>`).join('\n')}
        </ul>
      </div>
    </div>
    <p class="foot__legal"><span>${e(t.foot.rights)}</span><span>${e(t.foot.marks)}</span><time datetime="${UPDATED}">${e(t.foot.updated)}</time></p>
  </div>
</footer>

<script src="${A}site.js" defer></script>
</body>
</html>
`;
}

// Versão 4, "Luz do dia": página clara desenhada no Claude Design. Mesmo texto e mesmo SEO das outras,
// com marcação, folha (site4.css) e script (site4.js) próprios.
const CHECK = '<svg class="check" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
const DROP = 'M12 2.5c3.6 4.3 6.2 7.5 6.2 10.9a6.2 6.2 0 0 1-12.4 0C5.8 10 8.4 6.8 12 2.5z';
const SPARK = 'M12 3v5M12 16v5M3 12h5M16 12h5M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18';
const FILM_ON = '(min-width: 900px) and (hover: hover) and (prefers-reduced-motion: no-preference)';   // onde o vídeo do time toca

function page4(t) {
  const A = '../' + t.assets, base = ORIGIN + '/site-4', url = base + t.path;
  const tel = `<a href="${PHONE.href}">${PHONE.text}</a>`, mail = `<a href="mailto:${EMAIL}">${EMAIL}</a>`;
  const [l1, we, verb, fuel] = t.v4.h1;
  if (t.v4.h1.join(' ') !== t.hero.h1) throw new Error('v4.h1 saiu de sincronia com hero.h1 em ' + t.lang);
  const svc = items => items.map(([h, p]) => `          <li><h4>${e(h)}</h4><p>${e(p)}</p></li>`).join('\n');
  const eyebrow = s => `<p class="eyebrow">${e(s)}</p>`;
  const langLink = cls => `<a${cls ? ` class="${cls}"` : ''} href="${t.alt.href}" hreflang="${t.alt.lang}" lang="${t.alt.lang}">`;

  return `<!doctype html>
<html lang="${t.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(t.title)}</title>
<meta name="description" content="${e(t.desc)}">
<meta name="robots" content="noindex, follow">
<meta name="theme-color" content="#f5f5f3">
<meta name="color-scheme" content="light">
<meta name="geo.region" content="US-MA">
<meta name="geo.placename" content="Marlborough">
<!-- DEPLOY STEP: confirme o domínio do ar. canonical, hreflang, og:url, og:image, sitemap.xml, robots.txt e llms.txt usam ${ORIGIN} -->
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="en" href="${base}/">
<link rel="alternate" hreflang="pt-BR" href="${base}/pt-br/">
<link rel="alternate" hreflang="x-default" href="${base}/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Digital Fuel">
<meta property="og:title" content="${e(t.title)}">
<meta property="og:description" content="${e(t.desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ORIGIN}/assets/og-digital-fuel.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${e(t.ogImageAlt)}">
<meta property="og:locale" content="${t.ogLocale}">
<meta property="og:locale:alternate" content="${t.ogAlt}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${e(t.title)}">
<meta name="twitter:description" content="${e(t.desc)}">
<meta name="twitter:image" content="${ORIGIN}/assets/og-digital-fuel.jpg">
<link rel="icon" type="image/png" href="${A}favicon.png">
<link rel="apple-touch-icon" href="${A}apple-touch-icon.png">
<script>(function(){var d=document.documentElement;d.className+=" js"+(window.matchMedia(${JSON.stringify(FILM_ON)}).matches?" can-film":"");setTimeout(function(){if(!window.__df4)d.className+=" no-reveal"},4000)})()</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&amp;family=Figtree:wght@400..700&amp;display=swap">
<link rel="stylesheet" href="${A}site4.css">
<script type="application/ld+json">${schema(t, url)}</script>
</head>
<body>
<a class="skip" href="#main">${e(t.skip)}</a>

<div class="navwrap">
<header class="nav">
  <a class="nav__brand" href="${t.home}" aria-label="${e(t.nav.brand)}"><img src="${A}logo-digital-fuel-dark.png" alt="Digital Fuel" width="470" height="127"></a>
  <nav class="nav__links" id="nav-links" aria-label="${e(t.nav.aria)}">
    <a href="#services">${e(t.nav.services)}</a>
    <a href="#industries">${e(t.nav.industries)}</a>
    <a href="#programs">${e(t.nav.programs)}</a>
    <a href="#how">${e(t.nav.how)}</a>
    <a href="#faq">${e(t.nav.faq)}</a>
    ${langLink('nav__alt')}${e(t.alt.label)}</a>
  </nav>
  ${langLink('nav__lang')}<span class="long">${e(t.alt.label)}</span><span class="short">${t.alt.short}</span></a>
  <a class="btn btn--sm" href="#contact"><span class="long">${e(t.nav.cta)}</span><span class="short">${e(t.nav.ctaShort)}</span></a>
  <button class="nav__toggle" type="button" aria-expanded="false" aria-controls="nav-links" aria-label="${e(t.nav.menu)}"><span></span><span></span></button>
</header>
</div>

<main id="main" tabindex="-1">

  <section class="hero wrap" id="top" aria-label="${e(t.hero.aria)}">
    <p class="chip">${e(t.hero.kicker)}</p>
    <h1><span class="l">${e(l1)}</span> <span class="l">${e(we)} <img class="pill" src="${A}team-step-2.jpg" alt="" width="491" height="343" decoding="async"> ${e(verb)} <span class="pill pill--fuel" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${DROP}"/></svg></span> ${e(fuel)}</span></h1>
    <div class="hero__row">
      <div class="hero__copy">
        <p class="hero__lead">${e(t.hero.b4[0])}</p>
        <p class="hero__sub">${e(t.hero.b4[1])}</p>
        <p class="hero__cta"><a class="btn" href="#contact">${e(t.hero.cta)}</a> <a class="link" href="#how">${e(t.hero.link)}</a></p>
      </div>
      <figure class="film">
        <picture><source media="${FILM_ON}" srcset="${A}team-film-poster.jpg"><img src="${A}team-film-ending.jpg" alt="${e(t.team.tableAlt)}" width="1280" height="720" fetchpriority="high" decoding="async"></picture>
        <video data-src="${A}team-film.mp4" muted playsinline disablepictureinpicture preload="none" aria-hidden="true" tabindex="-1"></video>
      </figure>
    </div>
    <div class="beats">
      <div class="beat"><span class="beat__ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${SPARK}"/></svg></span><div><p class="beat__t">${e(t.hero.b2[0])}</p><p>${e(t.hero.b2[1])}</p></div></div>
      <div class="beat beat--flame"><span class="beat__ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${DROP}"/></svg></span><div><p class="beat__t">${e(t.hero.b3[0])}</p><p>${e(t.hero.b3[1])}</p></div></div>
    </div>
  </section>

  <section class="trust" aria-label="${e(t.trust.aria)}">
    <div class="wrap trust__row">
      <p class="trust__stat">${t.trust.stat}</p>
      <ul class="badges">
${BADGES.map((f, i) => { const [w, h] = BADGE_SIZE[f] || [474, 184]; return `        <li><img src="${A}badges/${f}" alt="${e(t.trust.badges[i])}" width="${w}" height="${h}" loading="lazy" decoding="async"></li>`; }).join('\n')}
      </ul>
    </div>
  </section>

  <section class="sec wrap about" id="about">
    <div class="about__row">
      <div class="about__copy" data-reveal>
        ${eyebrow(t.about.eyebrow)}
        <h2>${e(t.about.h2)}</h2>
        <p class="lede">${e(t.about.p)}</p>
      </div>
      <figure class="capsules" data-reveal><img src="${A}team-call.jpg" alt="${e(t.team.callAlt)}" width="497" height="1024" loading="lazy" decoding="async"><img src="${A}team-plan.jpg" alt="${e(t.team.planAlt)}" width="497" height="1024" loading="lazy" decoding="async"></figure>
    </div>
    <aside class="spec" aria-labelledby="spec-title" data-reveal>
      <h3 class="label" id="spec-title">${e(t.about.specTitle)}</h3>
      <dl>
${t.about.spec.map(([k, v]) => `        <div><dt>${e(k)}</dt><dd>${e(v)}</dd></div>`).join('\n')}
      </dl>
    </aside>
  </section>

  <section class="band" id="why">
    <div class="sec wrap">
      <div data-reveal>
        ${eyebrow(t.pains.eyebrow)}
        <h2>${e(t.pains.h2)}</h2>
      </div>
      <ol class="pairs">
${t.pains.pairs.map(([p, f]) => `        <li class="pair" data-reveal><p class="pain">${e(p)}</p><p class="fix">${CHECK}<span>${e(f)}</span></p></li>`).join('\n')}
      </ol>
      <p class="closer" data-reveal>${e(t.pains.closer)}</p>
    </div>
  </section>

  <section class="sec wrap services" id="services">
    <header data-reveal>
      ${eyebrow(t.services.eyebrow)}
      <h2>${e(t.services.h2)}</h2>
      <p class="lede">${e(t.services.lede)}</p>
    </header>
    <div class="halves">
      <div class="half half--spark" data-reveal>
        <h3 class="half__title"><span>${e(t.services.spark.label)}</span> ${e(t.services.spark.title)}</h3>
        <ul class="svc">
${svc(t.services.spark.items)}
        </ul>
      </div>
      <div class="half half--flame" data-reveal>
        <h3 class="half__title"><span>${e(t.services.flame.label)}</span> ${e(t.services.flame.title)}</h3>
        <ul class="svc">
${svc(t.services.flame.items)}
        </ul>
      </div>
    </div>
  </section>

  <section class="sheet" id="how">
    <div class="sec wrap">
      <div class="how__head" data-reveal>
        <div>
          ${eyebrow(t.how.eyebrow)}
          <h2>${e(t.how.h2)}</h2>
        </div>
        <a class="btn" href="#contact">${e(t.how.cta)}</a>
      </div>
      <ol class="steps">
${t.how.steps.map(([h, p], i) => `        <li class="step" data-reveal><figure class="step__ph"><img src="${A}team-step-${i + 1}.jpg" alt="${e(t.team.steps[i])}" width="491" height="343" loading="lazy" decoding="async"><span class="step__n" aria-hidden="true">${i + 1}</span></figure><h3>${e(h)}</h3><p>${e(p)}</p></li>`).join('\n')}
      </ol>
    </div>
  </section>

  <section class="sec wrap industries" id="industries">
    <div data-reveal>
      ${eyebrow(t.industries.eyebrow)}
      <h2>${e(t.industries.h2)}</h2>
    </div>
    <div class="bento" data-reveal>
      <article class="tile tile--feature">
        <h3>${e(t.industries.feature[0])}</h3>
        <p>${e(t.industries.feature[1])}</p>
        <span class="label">${e(t.industries.logosLabel)}</span>
        <ul class="logos">
${CLIENTS.map(([f, n]) => `          <li><img src="${A}clients/${f}.jpg" alt="${e(t.industries.logoAlt(n))}" width="422" height="198" loading="lazy" decoding="async"></li>`).join('\n')}
        </ul>
      </article>
      <div class="tiles">
${t.industries.tiles.map(([h, p]) => `        <article class="tile"><h3>${e(h)}</h3><p>${e(p)}</p></article>`).join('\n')}
      </div>
    </div>
  </section>

  <section class="band" id="programs">
    <div class="sec wrap">
      <header data-reveal>
        ${eyebrow(t.programs.eyebrow)}
        <h2>${e(t.programs.h2)}</h2>
        <p class="lede">${e(t.programs.lede)}</p>
      </header>
      <div class="tiers" data-reveal>
${t.programs.tiers.map(r => `        <article class="tier${r.top ? ' tier--top' : ''}" style="--level:${r.level}">
          <div class="tier__head"><h3>${e(r.name)}</h3><p class="tier__tag">${e(r.tag)}</p></div>
          <div class="tank" aria-hidden="true"><i></i></div>${r.plus ? `\n          <p class="tier__plus">${e(r.plus)}</p>` : ''}
          <ul>
${r.items.map(x => `            <li>${CHECK}<span>${e(x)}</span></li>`).join('\n')}
          </ul>
          <a class="btn${r.top ? '' : ' btn--ghost'}" href="#contact">${e(t.programs.cta)}</a>
        </article>`).join('\n')}
      </div>
    </div>
  </section>

  <section class="sec wrap faq" id="faq">
    <div class="faq__grid">
      <div class="faq__head" data-reveal>
        ${eyebrow(t.faq.eyebrow)}
        <h2>${e(t.faq.h2)}</h2>
      </div>
      <div class="faq__list" data-reveal>
${t.faq.items.map(([q, a], i) => `        <details${i === 0 ? ' open' : ''}><summary><h3>${e(q)}</h3></summary><p>${e(a)}</p></details>`).join('\n')}
      </div>
    </div>
  </section>

  <section class="wrap contact" id="contact">
    <div class="tankcard" data-reveal>
      <div class="tankcard__copy">
        ${eyebrow(t.contact.eyebrow)}
        <h2>${e(t.contact.h2)}</h2>
        <p class="lede">${e(t.contact.lede)}</p>
        <p class="contact__alt">${t.contact.alt(tel, mail)}</p>
        <address><a href="${MAP}" rel="noopener">2 Mt Royal Ave, Suite 210<br>Marlborough, MA 01752</a></address>
        <figure class="people"><span><img src="${A}team-call.jpg" alt="" width="497" height="1024" loading="lazy" decoding="async"><img src="${A}team-plan.jpg" alt="" width="497" height="1024" loading="lazy" decoding="async"></span><figcaption>${e(t.team.people)}</figcaption></figure>
      </div>
      <div class="formcard">
        <iframe src="https://api.leadconnectorhq.com/widget/form/${FORM}" id="inline-${FORM}" title="${e(t.contact.formTitle)}" loading="lazy" data-layout="{'id':'INLINE'}" data-trigger-type="alwaysShow" data-trigger-value="" data-activation-type="alwaysActivated" data-activation-value="" data-deactivation-type="neverDeactivate" data-deactivation-value="" data-form-name="Lead Sales - Form" data-height="1010" data-layout-iframe-id="inline-${FORM}" data-form-id="${FORM}"></iframe>
        <p class="formcard__note">${e(t.contact.note)}</p>
      </div>
    </div>
  </section>

</main>

<footer class="foot">
  <div class="wrap">
    <div class="foot__grid">
      <div class="foot__brand">
        <img src="${A}logo-digital-fuel.png" alt="Digital Fuel" width="470" height="127" loading="lazy" decoding="async">
        <p>${e(t.foot.tagline)}</p>
      </div>
      <nav aria-label="${e(t.foot.aria)}">
        <h2>${e(t.foot.explore)}</h2>
        <ul>
          <li><a href="#services">${e(t.nav.services)}</a></li>
          <li><a href="#industries">${e(t.nav.industries)}</a></li>
          <li><a href="#programs">${e(t.nav.programs)}</a></li>
          <li><a href="#how">${e(t.nav.how)}</a></li>
          <li><a href="#faq">${e(t.nav.faq)}</a></li>
          <li>${langLink('')}${e(t.alt.label)}</a></li>
        </ul>
      </nav>
      <div>
        <h2>${e(t.foot.contact)}</h2>
        <address>
          <a href="${MAP}" rel="noopener">2 Mt Royal Ave, Suite 210<br>Marlborough, MA 01752</a><br>
          ${tel}<br>
          ${mail}
        </address>
      </div>
      <div>
        <h2>${e(t.foot.follow)}</h2>
        <ul>
${SOCIAL.map(([n, u]) => `          <li><a href="${u}" rel="noopener me">${n}</a></li>`).join('\n')}
        </ul>
      </div>
    </div>
    <p class="foot__legal"><span>${e(t.foot.rights)}</span><span>${e(t.foot.marks)}</span><time datetime="${UPDATED}">${e(t.foot.updated)}</time></p>
  </div>
</footer>

<script src="${A}site4.js" defer></script>
</body>
</html>
`;
}

function llms() {
  const t = T.en;
  const svc = [...t.services.spark.items, ...t.services.flame.items];
  return `# Digital Fuel

> ${t.schema.orgDesc} The team works in English and Portuguese.

## Key facts

${t.about.spec.map(([k, v]) => `- ${k}: ${v}`).join('\n')}
- Address: 2 Mt Royal Ave, Suite 210, Marlborough, MA 01752, USA
- Phone: +1 (351) 210-2512
- Email: ${EMAIL}
- Certifications shown on the site: Meta Business Partner, Google Partner, Google Analytics Certified Professional, BBB Accredited Business (A+)

## Services

${svc.map(([h, p]) => `- ${h}: ${p}`).join('\n')}

## Programs

${t.programs.tiers.map(r => `- ${r.name} (${r.tag}): ${r.plus ? r.plus + ' ' : ''}${r.items.join('; ')}.`).join('\n')}

Pricing is not published. It depends on the program and the market, and is given in a free strategy session.

## Who it is for

- ${t.industries.feature[0]}: ${t.industries.feature[1]}
${t.industries.tiles.map(([h, p]) => `- ${h}: ${p}`).join('\n')}
- Brazilian-owned businesses in the United States: campaigns run in English for American customers, with account contact in Portuguese.

## Frequently asked questions

${t.faq.items.map(([q, a]) => `### ${q}\n\n${a}`).join('\n\n')}

## Pages

- [Digital Fuel, English](${ORIGIN}/): services, industries, programs, process, FAQ and contact form.
- [Digital Fuel, Português do Brasil](${ORIGIN}/pt-br/): the same content in Brazilian Portuguese.

## Contact

- Book a free strategy session: ${ORIGIN}/#contact
- Instagram: ${SOCIAL[0][1]}
- YouTube: ${SOCIAL[1][1]}
- LinkedIn: ${SOCIAL[2][1]}

Last updated: ${UPDATED}
`;
}

const AI_BOTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Bingbot', 'meta-externalagent', 'CCBot'];
const robots = `# Everyone is welcome, AI crawlers and assistants included.
User-agent: *
Allow: /

${AI_BOTS.map(b => `User-agent: ${b}\nAllow: /`).join('\n\n')}

Sitemap: ${ORIGIN}/sitemap.xml
`;

const alt = `    <xhtml:link rel="alternate" hreflang="en" href="${ORIGIN}/"/>
    <xhtml:link rel="alternate" hreflang="pt-BR" href="${ORIGIN}/pt-br/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}/"/>`;
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${ORIGIN}/</loc>
    <lastmod>${UPDATED}</lastmod>
${alt}
  </url>
  <url>
    <loc>${ORIGIN}/pt-br/</loc>
    <lastmod>${UPDATED}</lastmod>
${alt}
  </url>
</urlset>
`;

mkdirSync(join(SITE, 'pt-br'), { recursive: true });
mkdirSync(join(SITE, 'site-2', 'pt-br'), { recursive: true });
mkdirSync(join(SITE, 'site-3', 'pt-br'), { recursive: true });
mkdirSync(join(SITE, 'site-4', 'pt-br'), { recursive: true });
const out = [
  ['index.html', page(T.en)], ['pt-br/index.html', page(T.pt)],
  ['site-2/index.html', page(T.en, 2)], ['site-2/pt-br/index.html', page(T.pt, 2)],
  ['site-3/index.html', page(T.en, 3)], ['site-3/pt-br/index.html', page(T.pt, 3)],   // versão 3, o time em vídeo, fora do índice de busca   // versão 2, com as fotos do time, fora do índice de busca
  ['site-4/index.html', page4(T.en)], ['site-4/pt-br/index.html', page4(T.pt)],   // versão 4, clara, desenhada no Claude Design, fora do índice de busca
  ['llms.txt', llms()], ['robots.txt', robots], ['sitemap.xml', sitemap]
];
for (const [name, text] of out) { writeFileSync(join(SITE, name), text, 'utf8'); console.log('ok', name, Buffer.byteLength(text), 'bytes'); }
