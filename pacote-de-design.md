# Pacote de Design: Digital Fuel

Nível 1, jornada única. Este documento segura cada decisão criativa do site. Cada linha de texto aqui embarca ao pé da letra. Faixas e números de ritmo são pontos de partida, validados depois pelo teste de flick.

Dois desvios da skill, ditos em voz alta:

1. **Duas páginas em vez de uma.** `/` em inglês e `/pt-br/` em português, com os mesmos arquivos de `assets/`. Um botão que troca o idioma por JavaScript não é indexado como página própria, e o pedido é SEO nos dois idiomas.
2. **Hero animado em código, sem vídeo de IA.** O plano gratuito do Higgsfield bloqueou os três modelos de vídeo tentados. O hero usa três quadros fotográficos do mesmo cenário (gota, cenário limpo, anel de fogo) e o movimento é desenhado em canvas, guiado pelo scroll. O dia em que houver vídeo de IA, ele entra como `assets/hero-scrub.mp4` no pipeline de scrub da skill.

## 1. A premissa da marca

**Fuel.** Toda empresa é um motor, e marketing é o combustível. A criatividade é a faísca, a performance é a chama que fica acesa. O site inteiro ensina e vende essa ideia: a gota do logotipo cai, acende, e a página mostra como a Digital Fuel mantém o fogo de um negócio aceso com criação e performance no mesmo time. A voz é direta, confiante, de frases curtas.

## 2. A paleta como tokens CSS

Amostrada dos três quadros do hero: fumaça cinza fria, piso preto polido, chama laranja da marca, base azul da chama.

```css
:root{
  --canvas:#0f1114;        /* fuligem fria, o cinza mais escuro do piso */
  --panel:#171a1f;         /* carvão, cartões e superfícies elevadas */
  --panel-2:#1f232a;       /* carvão claro, bordas internas e chips */
  --accent:#ff3600;        /* o laranja da chama da marca: CTA e ênfase rara */
  --accent-hover:#ff5a2e;  /* hover do acento */
  --accent-muted:rgba(255,84,32,.16); /* brilhos, bordas, partículas */
  --flame-blue:#6fa8ff;    /* a base azul da chama, só em números e no medidor */
  --line:#2b3038;          /* linhas finas decorativas */
  --line-strong:#4a515c;   /* bordas de elementos interativos */
  --text-secondary:#aab0ba;
  --text-primary:#f3f1ee;
}
```

Preto com laranja está na lista de visuais batidos da skill. Fica porque é a identidade real da marca, e o mundo vem da filmagem: o fundo é cinza frio de fumaça, não preto, e o azul da base da chama entra como segundo tom.

## 3. O trio de fontes

- **Display:** Archivo, eixo de largura em 112 a 125, pesos 700 e 800. Larga e pesada, cara de placa de posto e de pista.
- **Texto:** Instrument Sans, pesos 400, 500 e 600.
- **Mono:** DM Mono, pesos 400 e 500, para rótulos, medidor e números.

## 4. O mapa de faixas

Hero de 500vh (400vh de scroll). Ação no terço direito, texto no espaço calmo da esquerda.

| Faixa | Intervalo (ponto de partida) | Momento da cena | Entrada |
|---|---|---|---|
| 1 | 0.00 a 0.24 | a gota paira e treme | rampa de carregamento, deriva para baixo |
| 2 | 0.26 a 0.49 | a gota cai reta pela fumaça | deriva para baixo |
| 3 | 0.51 a 0.74 | impacto, clarão, o anel de fogo se espalha | soco de palavra com overshoot |
| 4 | 0.76 a 1.00 | o anel assenta, chama baixa e firme | subida palavra por palavra em etapas |

### Texto das faixas, inglês

- **Kicker (dentro do h1):** Digital content and performance agency · Massachusetts, USA
- **Faixa 1 (h1):** Your business is the engine. We bring the fuel.
- **Deixa de scroll:** Scroll to ignite
- **Faixa 2:** First, the spark. / Creative work people stop for. Websites, content, video and ads.
- **Faixa 3:** Then, the steady flame. / Performance you can count. Calls, forms and booked jobs.
- **Faixa 4:** Creativity and performance, in one team. / Digital Fuel plans, builds and runs your online advertising, then shows you what every dollar brought back.
- **CTA:** Book your free strategy session
- **Link secundário:** See how it works

### Texto das faixas, português

- **Kicker (dentro do h1):** Agência de conteúdo digital e performance · Massachusetts, EUA
- **Faixa 1 (h1):** Sua empresa é o motor. A gente traz o combustível.
- **Deixa de scroll:** Role para acender
- **Faixa 2:** Primeiro, a faísca. / Criação que faz a pessoa parar. Site, conteúdo, vídeo e anúncio.
- **Faixa 3:** Depois, a chama firme. / Performance que dá para contar. Ligações, formulários e serviços fechados.
- **Faixa 4:** Criatividade e performance, no mesmo time. / A Digital Fuel planeja, cria e roda a sua publicidade online, e mostra o que cada dólar trouxe de volta.
- **CTA:** Agende sua sessão estratégica gratuita
- **Link secundário:** Veja como funciona

## 5. O bloco de texto do hero estático

Regra nascida do feedback de 12/10/2026: **o anel de fogo nunca aparece como imagem parada.** Parado ele lê como círculo de ritual. Toda apresentação estática usa a gota de combustível, que é a gota do logotipo. O anel só existe dentro da animação de scroll do computador.

- **Celulares e telas em pé:** kicker e h1, depois a linha da faixa 4 com o parágrafo e o CTA (o botão fica na primeira tela), depois a gota flutuando devagar sobre a fumaça com o reflexo no piso, e por fim as linhas de faísca e chama. A gota é montada com o cenário limpo e a luz da gota, somando 52 KB.
- **Telas largas com movimento reduzido e celular deitado:** a gota de fundo inteiro, com as quatro faixas em coluna à esquerda.
- **Menu no celular:** botão de menu que abre a lista de seções e o idioma. Rótulos curtos na barra: Free session / Sessão grátis, PT / EN.
- Nenhum texto duplicado no HTML: as quatro faixas são as mesmas do computador, reordenadas por CSS.

## 6. O esboço abaixo da dobra

Toda seção afunila para UMA âncora: `#contact`, o formulário da sessão estratégica gratuita.

### 6.1 Faixa de confiança

- EN: Over 10 years of experience in digital marketing. / Businesses we work with
- PT: Mais de 10 anos de experiência em marketing digital. / Empresas que atendemos
- Selos: Meta Business Partner, Google Partner, Google Analytics Certified Professional, BBB Accredited Business A+.
- Logos de clientes: Time General Construction, WM Home Improvement, Cabrini Equipment, Pro Coating, Souzet, Linares Electric, Real Painting & Home Improvement, Onyx Marble & Granite.

### 6.2 Quem somos, com ficha citável

**EN**

- Título: An agency built on two things: creativity and performance.
- Texto: Digital Fuel is a digital content and performance agency based in Massachusetts, USA. We run the online advertising strategy for companies in many industries across the country. Our clients sell products and services: retail stores, home renovation companies, contractors and local service businesses. Every plan is built around the goals of one business, and every result is measured against them.
- Ficha, título: Digital Fuel at a glance
  - Type: Digital content and performance marketing agency
  - Based in: Marlborough, Massachusetts, USA
  - Serves: Companies across the United States
  - Industries: Home renovation, construction, home services, retail, local services
  - Services: Websites, SEO, Google Ads, Meta ads, content and video, email and SMS, CRM and automation
  - Experience: Over 10 years
  - Languages: English and Portuguese

**PT**

- Título: Uma agência feita de duas coisas: criatividade e performance.
- Texto: A Digital Fuel é uma agência de conteúdo digital e performance com sede em Massachusetts, nos Estados Unidos. Cuidamos da estratégia de publicidade online de empresas de vários setores, no país inteiro. Nossos clientes vendem produtos e serviços: lojas, empresas de reforma, construtoras e negócios locais. Cada plano nasce dos objetivos de uma empresa só, e cada resultado é medido a partir deles.
- Ficha, título: A Digital Fuel em resumo
  - Tipo: Agência de conteúdo digital e marketing de performance
  - Sede: Marlborough, Massachusetts, EUA
  - Atende: Empresas em todos os Estados Unidos
  - Setores: Reforma, construção, serviços residenciais, varejo, serviços locais
  - Serviços: Sites, SEO, Google Ads, anúncios na Meta, conteúdo e vídeo, e-mail e SMS, CRM e automação
  - Experiência: Mais de 10 anos
  - Idiomas: Português e inglês

### 6.3 O problema, nas palavras dos compradores

**EN**: título: Sound familiar?

1. You pay every month and get a report full of charts. No new jobs. → We report in leads, calls and sales. Every program includes support and reports.
2. Leads come in, but most never pick up the phone. → Ads aimed at your service and your area, with automatic follow-up by text and email, so real buyers hear back fast.
3. You can't tell which dollar brought which customer. → Call and form tracking, with a CRM that shows where each lead came from.
4. The last agency promised a lot, then went quiet. → A U.S.-based team that answers fast and works as part of yours.

Fecho: That is the gap Digital Fuel was built to close.

**PT**: título: Isso soa familiar?

1. Você paga todo mês e recebe um relatório cheio de gráfico. Serviço novo, nenhum. → A gente reporta em leads, ligações e vendas. Todo programa inclui suporte e relatórios.
2. O lead até chega, mas quase ninguém atende o telefone. → Anúncio mirado no seu serviço e na sua região, com retorno automático por mensagem e e-mail, para quem quer comprar ouvir de você rápido.
3. Você não sabe qual dólar trouxe qual cliente. → Rastreamento de ligações e formulários, com um CRM que mostra de onde veio cada lead.
4. A última agência prometeu muito e depois sumiu. → Um time nos Estados Unidos, que responde rápido e trabalha como parte da sua equipe.

Fecho: Foi para fechar esse buraco que a Digital Fuel foi criada.

### 6.4 Serviços: a faísca e a chama

**EN**: título: Two halves of one fire. / Creative gets attention. Performance turns it into revenue. You get both from the same team.

The spark · Creative

- Website design: Custom websites built to bring in qualified leads. Hosting and ongoing support included.
- Content and social media: Posts, photos and video for the platforms your customers use every day.
- Photo and video production: Commercial photo and video shoots, with editing for ads and social.
- Branding and design: Visual identity and design that make a small company look established.

The flame · Performance

- SEO and local SEO: Built to put your business on page one of Google in your local market, for the searches your customers type.
- Google Search Ads: Campaigns aimed at people searching for your service right now, so the phone rings.
- Google Local Services Ads: Appear at the very top of Google for local searches and get calls from customers ready to hire.
- Meta ads: Facebook and Instagram: Targeted ads on the platforms your customers scroll every day, built to generate leads.
- Online reviews and Google Business Profile: A steady flow of new reviews and a tuned Google Business Profile, so your reputation sells for you.
- CRM and automation (FuelStation): FuelStation, our CRM and automation platform, keeps every lead in one place and follows up for you by text and email.
- AI agent: voice and text: An AI agent that answers calls and messages around the clock, so no lead goes cold.
- Email and SMS marketing: Campaigns that bring past customers back and keep new leads warm.
- Call and form tracking: See which ad, keyword or page produced each call and each form.

**PT**: título: Duas metades do mesmo fogo. / A criação chama atenção. A performance transforma atenção em faturamento. Você recebe as duas do mesmo time.

A faísca · Criação

- Criação de sites: Sites sob medida, feitos para trazer leads qualificados. Hospedagem e suporte contínuo incluídos.
- Conteúdo e redes sociais: Posts, fotos e vídeos para as plataformas que seus clientes usam todo dia.
- Produção de foto e vídeo: Gravações comerciais de foto e vídeo, com edição para anúncios e redes sociais.
- Branding e design: Identidade visual e design que fazem uma empresa pequena parecer estabelecida.

A chama · Performance

- SEO e SEO local: Trabalho feito para colocar sua empresa na primeira página do Google na sua região, nas buscas que seus clientes digitam.
- Google Search Ads: Campanhas para quem está procurando o seu serviço agora, para o telefone tocar.
- Google Local Services Ads: Apareça no topo do Google nas buscas locais e receba ligações de clientes prontos para contratar.
- Anúncios na Meta: Facebook e Instagram: Anúncios segmentados nas plataformas em que seus clientes passam o dia, feitos para gerar leads.
- Avaliações online e Perfil da Empresa no Google: Um fluxo constante de avaliações novas e um Perfil da Empresa no Google bem ajustado, para a sua reputação vender por você.
- CRM e automação (FuelStation): O FuelStation, nossa plataforma de CRM e automação, guarda cada lead em um lugar só e faz o retorno por mensagem e e-mail para você.
- Agente de IA: voz e texto: Um agente de IA que atende ligações e mensagens a qualquer hora, para nenhum lead esfriar.
- E-mail e SMS marketing: Campanhas que trazem clientes antigos de volta e mantêm os novos leads aquecidos.
- Rastreamento de ligações e formulários: Veja qual anúncio, palavra-chave ou página gerou cada ligação e cada formulário.

### 6.5 Como funciona, com o momento interativo

O visitante segura um botão de ignição. O medidor enche enquanto ele segura, solta cedo e o medidor desce suave. Ao completar, os três passos acendem em sequência. Movimento reduzido e teclado recebem o estado final com um toque. Nada fica escondido: apagado, o texto continua legível, só frio.

**EN**: título: Three steps to a running engine. / Botão: Hold to ignite / Dica: Press and hold. Or press Enter. / Pronto: Ignition on.

1. Book your free strategy session. We learn about your business, your market and your goals.
2. Get your custom game plan. A marketing plan built for your business, with the numbers we will track together.
3. Watch growth you can measure. We run the campaigns, automate the follow-up and report what came back.

**PT**: título: Três passos para o motor ligar. / Botão: Segure para dar a partida / Dica: Pressione e segure. Ou aperte Enter. / Pronto: Motor ligado.

1. Agende sua sessão estratégica gratuita. A gente conhece sua empresa, seu mercado e seus objetivos.
2. Receba seu plano sob medida. Um plano de marketing feito para a sua empresa, com os números que vamos acompanhar juntos.
3. Acompanhe um crescimento que dá para medir. A gente roda as campanhas, automatiza o retorno aos leads e reporta o que voltou.

### 6.6 Setores

**EN**: título: Who we fuel.

- Destaque, Home renovation and construction: Our deepest experience. General contractors, painters, electricians, stone fabricators, coating and equipment companies already run on Digital Fuel.
- Home services: For the trades that live on local calls: cleaning, landscaping, roofing, HVAC.
- Retail: Stores and product brands that need foot traffic and online sales.
- Local and professional services: Any business that sells a service and needs a steady flow of qualified leads.

**PT**: título: Quem a gente abastece.

- Destaque, Reforma e construção: Nossa experiência mais profunda. Construtoras, pintores, eletricistas, marmorarias e empresas de revestimento e equipamentos já rodam com a Digital Fuel.
- Serviços residenciais: Para quem vive de chamada local: limpeza, paisagismo, telhado, ar-condicionado.
- Varejo: Lojas e marcas de produto que precisam de movimento na loja e de venda online.
- Serviços locais e profissionais: Qualquer negócio que vende serviço e precisa de um fluxo constante de leads qualificados.

### 6.7 Programas

Nomes e itens vêm do site atual. Sem preço, como hoje.

**EN**: título: Pick your fuel level. / Three programs. Each one includes everything in the one before it. / Botão: Check availability

- GROW, Scale organically: Marketing strategy. Custom website. Search engine optimization. Google Local Services Ads. Meta ads: Facebook and Instagram leads. Video editing. Support and reports.
- SCALE, Results guaranteed: Everything in Grow, plus: Local SEO and reviews boost. Google Search Ads. Custom landing pages. Call and form tracking. CRM setup and management. 8 social media posts.
- ACCELERATE, Local domination: Everything in Scale, plus: Personalized CRM automations. AI agent: voice and text. Advanced SEO: blog, listings, links. Email marketing campaigns. SMS marketing campaigns. CRM sales training. Market exclusivity. Commercial photo and video production.

**PT**: título: Escolha o nível do tanque. / Três programas. Cada um inclui tudo do anterior. / Botão: Consultar disponibilidade

- GROW, Crescimento orgânico: Estratégia de marketing. Site sob medida. Otimização para buscadores (SEO). Google Local Services Ads. Anúncios na Meta: leads no Facebook e Instagram. Edição de vídeo. Suporte e relatórios.
- SCALE, Resultados garantidos: Tudo do Grow, e mais: SEO local e impulso de avaliações. Google Search Ads. Landing pages sob medida. Rastreamento de ligações e formulários. Implantação e gestão de CRM. 8 posts para redes sociais.
- ACCELERATE, Domínio local: Tudo do Scale, e mais: Automações de CRM personalizadas. Agente de IA: voz e texto. SEO avançado: blog, listagens e links. Campanhas de e-mail marketing. Campanhas de SMS marketing. Treinamento de vendas no CRM. Exclusividade de mercado. Produção comercial de foto e vídeo.

### 6.8 FAQ (responde as travas reais da pesquisa, resposta na primeira frase)

**EN**: título: Straight answers.

1. What does Digital Fuel do? Digital Fuel is a digital content and performance marketing agency based in Marlborough, Massachusetts. We plan, build and run online advertising for companies across the United States: websites, SEO, Google Ads, Meta ads, content, email and automation.
2. Which industries does Digital Fuel work with? We work with companies that sell products and services, and our deepest experience is in home renovation and construction. Our clients include general contractors, painters, electricians, stone fabricators and retailers.
3. Where is Digital Fuel located, and do you work outside Massachusetts? Our office is at 2 Mt Royal Ave, Suite 210, Marlborough, MA 01752. We work with clients in every part of the United States.
4. How do you measure results? We measure results in leads, calls and sales. Every program includes support and reports, and the Scale and Accelerate programs add call and form tracking with a CRM, so you can see where each lead came from.
5. How much does it cost to work with Digital Fuel? The price depends on the program you choose (Grow, Scale or Accelerate) and on your market. You get the exact number in your free strategy session, before you commit to anything.
6. How long does it take to see results? Google Ads and Local Services Ads can start bringing calls within days of launch. SEO takes longer, usually a few months, and keeps working after that.
7. Do you work in Portuguese? Yes. Our team works in English and Portuguese, and this site is available in both languages.
8. What happens in the free strategy session? We learn about your business, your market and your goals, then show you a plan built for your company. The session is free and you decide what happens next.
9. Do I need a new website to start? Every program includes a custom website built to generate leads, with hosting and ongoing support.

**PT**: título: Respostas diretas.

1. O que a Digital Fuel faz? A Digital Fuel é uma agência de conteúdo digital e marketing de performance com sede em Marlborough, Massachusetts. A gente planeja, cria e roda a publicidade online de empresas em todos os Estados Unidos: sites, SEO, Google Ads, anúncios na Meta, conteúdo, e-mail e automação.
2. Com quais setores a Digital Fuel trabalha? Trabalhamos com empresas que vendem produtos e serviços, e nossa experiência mais profunda é em reforma e construção. Entre os clientes estão construtoras, pintores, eletricistas, marmorarias e lojas.
3. Onde fica a Digital Fuel? Vocês atendem fora de Massachusetts? Nosso escritório fica na 2 Mt Royal Ave, Suite 210, Marlborough, MA 01752. Atendemos clientes em qualquer parte dos Estados Unidos.
4. Minha empresa é de brasileiros nos EUA. Vocês anunciam para o público americano? Sim. As campanhas são feitas em inglês, para o cliente americano da sua região, e todo o nosso contato com você pode ser em português.
5. Como vocês medem resultado? Medimos resultado em leads, ligações e vendas. Todo programa inclui suporte e relatórios, e os programas Scale e Accelerate somam rastreamento de ligações e formulários com um CRM, para você ver de onde veio cada lead.
6. Quanto custa trabalhar com a Digital Fuel? O valor depende do programa escolhido (Grow, Scale ou Accelerate) e do seu mercado. Você recebe o número exato na sessão estratégica gratuita, antes de assumir qualquer compromisso.
7. Em quanto tempo aparecem os resultados? Google Ads e Local Services Ads podem começar a trazer ligações poucos dias depois de entrarem no ar. SEO leva mais tempo, em geral alguns meses, e continua trabalhando depois disso.
8. O atendimento é em português? Sim. Nosso time atende em português e em inglês, e este site existe nos dois idiomas.
9. O que acontece na sessão estratégica gratuita? A gente conhece sua empresa, seu mercado e seus objetivos, e mostra um plano feito para o seu negócio. A sessão é gratuita e quem decide o próximo passo é você.
10. Preciso de um site novo para começar? Todo programa inclui um site sob medida, feito para gerar leads, com hospedagem e suporte contínuo.

### 6.9 Chamada final e formulário

Destino: o formulário LeadConnector "Lead Sales - Form" que já está no site atual, embutido. Os contatos caem direto no CRM da Digital Fuel. O formulário é carregado só quando a seção se aproxima da tela.

- EN: Let's fill the tank. / Book your free strategy session. Tell us about your company and we will come back with a plan. / Prefer to talk? Call (351) 210-2512 or write to contact@digitalfuelagency.com. / Your details go straight to the Digital Fuel team.
- PT: Vamos encher o tanque. / Agende sua sessão estratégica gratuita. Conte sobre a sua empresa e a gente volta com um plano. / Prefere conversar? Ligue para (351) 210-2512 ou escreva para contact@digitalfuelagency.com. / Seus dados vão direto para o time da Digital Fuel. O formulário está em inglês, mas pode responder em português.

### 6.10 Rodapé

- EN: Digital content and performance agency. Creativity is the spark. Performance keeps it burning. / © 2026 Digital Fuel. All rights reserved. / Meta, Google and BBB marks belong to their owners. / Updated October 2026.
- PT: Agência de conteúdo digital e performance. A criatividade é a faísca. A performance mantém aceso. / © 2026 Digital Fuel. Todos os direitos reservados. / As marcas Meta, Google e BBB pertencem aos seus donos. / Atualizado em outubro de 2026.
- Contato: 2 Mt Royal Ave, Suite 210, Marlborough, MA 01752 · (351) 210-2512 · contact@digitalfuelagency.com
- Redes: Instagram, YouTube, LinkedIn.

### 6.11 Rótulos pequenos

- Menu EN: Services, Industries, Programs, How it works, FAQ, Português, Book a free session.
- Menu PT: Serviços, Setores, Programas, Como funciona, Dúvidas, English, Agendar sessão gratuita.
- Rótulos de seção EN: About, The problem, Services, How it works, Industries, Programs, FAQ, Contact.
- Rótulos de seção PT: Sobre, O problema, Serviços, Como funciona, Setores, Programas, Dúvidas, Contato.
- Medidor: Fuel / Tanque.
- Rodapé EN: Explore, Contact, Follow. Rodapé PT: Navegue, Contato, Redes.
- Link de pular: Skip to content / Pular para o conteúdo.
- Barra do celular: Free session / Sessão grátis, PT / EN, Menu.

## 7. O plano da camada vetorial

- **Elemento assinatura, o medidor de combustível:** trilho fino fixo na borda direita, de E a F, que enche com o progresso da página. Leitura em mono, atualizada a 10Hz e só na mudança. Em telas estreitas vira uma barra fina no topo.
- **O pavio:** linha SVG vertical que se traça sozinha entre as duas colunas de serviços conforme a seção rola.
- **Divisórias de calor:** linha fina com um ponto de brasa que pulsa em nível de sussurro, uma por seção.
- **Brasas:** poucas partículas subindo devagar sobre o anel de fogo do hero.
- **A gota reutilizada:** a gota volta no canto inferior esquerdo da chamada final, sob o texto. A imagem da coluna de performance é um close das chamas, sem o círculo inteiro. A imagem de compartilhamento usa a gota com o logotipo.
- **Camada de ambiente fixa:** dois brilhos radiais à deriva em ciclo de 70 segundos, mais grão.
- Tudo honra movimento reduzido: estados finais mostrados, motores parados.

## 8. A lista de engenharia

Do padrão de `pipeline-scrub.md`, o que vale para este hero em canvas:

- Interpolação do progresso normalizada por dt, num loop rAF que descansa ao convergir e com o hero fora da tela.
- Escritas de DOM só na mudança, legendas travadas por delta.
- Faixas ritmadas em distância de scroll, validadas pelo teste de flick (120, 240 e 360px).
- Sistema de legibilidade de quatro camadas: scrim global, scrim por faixa, sombra de texto, chip para texto pequeno. Auditoria do pior quadro, mínimo 3,5 para 1.
- Os cinco portões do hero estático, idênticos em CSS e JS, mantidos vivos com listeners de mudança.
- Página completa sem as imagens do hero.
- Piso de qualidade inteiro: fontes enxutas com preconnect, contraste computado, marcos semânticos, foco visível, alvos de toque de 44px, overflow travado, movimento reduzido nas duas direções.
- O que não se aplica sem vídeo: busca por Blob, anel de carregamento e trava de seek. Voltam se o vídeo de IA entrar.

SEO e SEO para IA:

- `hreflang` entre `/` e `/pt-br/`, `canonical` em cada página, `x-default` no inglês.
- Todo o texto no HTML. Nada de conteúdo injetado por JavaScript.
- JSON-LD: `ProfessionalService` com endereço, telefone, área atendida, idiomas e redes; `WebSite`; `WebPage`; catálogo de serviços; `FAQPage`. Sem `AggregateRating`, porque não há nota verificável.
- `llms.txt`, `robots.txt` liberando os robôs de IA, `sitemap.xml` com os dois idiomas.
- Um h1 por página, hierarquia real de títulos, ficha citável, FAQ com a resposta na primeira frase.
- Telefone corrigido: o site atual usa `tel:+351...`, que é o código de Portugal. O certo é `tel:+13512102512`.

## 9. A linha do gate de texto

Cada linha voltada ao visitante acima embarca ao pé da letra. As duas páginas precisam passar o gate de grep da Fase 9: zero travessões, zero palavras de estoque em português e em inglês, mais a varredura do corpo por sinais de IA. Dispositivos de marca deliberados deste pacote ficam: "First, the spark. Then, the steady flame." e os nomes de programa GROW, SCALE e ACCELERATE, que são produtos reais da agência.

## Versão 2: gente primeiro (rota /site-2/)

Pedido de 12/10/2026: outra versão do mesmo site, com um design que inclua as fotos da equipe do site atual. Mesmo texto, mesma estrutura de SEO, outro mundo visual.

- **Onde vive:** `site/site-2/index.html` e `site/site-2/pt-br/index.html`, gerados pelo mesmo `ferramentas/gerar-paginas.mjs` (`page(t, 2)`). Usa `assets/site.css` mais `assets/site2.css`, que só muda o que difere. O script é o mesmo `assets/site.js`.
- **Fora do Google por enquanto:** as páginas da versão 2 levam `noindex` e não entram no `sitemap.xml`, para não competir com a versão 1 com o mesmo texto. Quando uma das duas for escolhida, ela vira a raiz com o SEO completo.
- **Fotos usadas, todas do digitalfuelagency.com:** os dois retratos do topo (recortados de `mobile.png`), a foto dos quatro na mesa (`ima9ge.png`) e três fotos do dia a dia (`Mask-group*.png`). Os originais estão em `materiais-originais/fotos-equipe/`. São arquivos pequenos: os retratos têm 497 x 1024 e as fotos do dia a dia 491 x 343. Originais em alta deixariam tudo mais nítido.
- **Paleta:** pretos quentes e o pêssego do fundo dos retratos no lugar do cinza frio e do azul da versão 1. O laranja da marca continua só no botão e nas bordas.
- **Elemento assinatura:** o painel inclinado dos retratos, com a mesma inclinação do site atual e uma borda de chama.
- **Topo, guiado pelo scroll:** os dois retratos entram desalinhados. Em "Primeiro, a faísca" quem planeja e anota vem para a frente. Em "Depois, a chama firme" quem está na ligação vem para a frente, porque performance é o telefone tocando. Em "no mesmo time" os dois se alinham e encostam. Só transform e opacity, tudo reversível, guiado por uma variável `--p` que o loop escreve.
- **Sobre:** a foto dos quatro na mesa em largura cheia, com a ficha citável sobreposta.
- **Serviços:** sem imagem de gota ou de fogo. Só tipografia e o pavio.
- **Como funciona:** um passo, uma foto. Os três passos ganham foto, e a ignição acende as três.
- **Contato:** os dois retratos pequenos com a frase "Real people on the other end." / "Gente de verdade do outro lado."
- **Celular:** título, botão, os dois retratos lado a lado, depois faísca e chama.
- **Sem nomes:** não inventei nome nem cargo. Os textos alternativos dizem "integrante do time da Digital Fuel". Com nomes e cargos reais dá para legendar as fotos.

## Versão 3: o time em filme (rota /site-3/)

Pedido de 13/10/2026: outra versão com a skill, com imagens da equipe e uma tentativa de animação pelo Higgsfield. Mesmo texto e mesmo SEO das outras duas.

- **Onde vive:** `site/site-3/index.html` e `site/site-3/pt-br/index.html`, gerados por `page(t, 3)`. Usa `assets/site.css` mais `assets/site3.css`. O script é o mesmo `assets/site.js`, que ganhou o pipeline de vídeo da skill.
- **Fora do Google por enquanto,** como a versão 2: `noindex` e fora do `sitemap.xml` até a escolha.
- **O vídeo:** a foto dos quatro na mesa ganhou vida no Veo 3.1 Lite, o único modelo de vídeo que o plano gratuito liberou. Foram duas gerações de 9 créditos. A primeira, sem logotipo na tela, foi trocada a pedido pela segunda, com o logotipo. Para as letras não entortarem, uma versão nítida do logotipo foi colocada no monitor do quadro inicial antes de gerar.
- **Consentimento:** em 13/10/2026 a Digital Fuel confirmou que as quatro pessoas concordam em aparecer em vídeo feito por IA. Os rostos de frente e os sorrisos foram criados pela IA, porque na foto três delas estão de perfil.
- **O corte aprovado:** os 3 primeiros segundos. O scroll leva o time de trabalhando até olhando para o visitante, e o olhar chega junto com a frase "no mesmo time" e o botão. Brutos em `review/v3/`.
- **Encode de scrub:** 1280 x 720, interpolado para 48 quadros por segundo (141 posições de scroll), keyframe a cada 8 quadros, sem áudio, 1,6 MB em cores. Baixado inteiro como Blob, com trava de seek. No servidor local, que não aceita download parcial, o scrub funciona.
- **Mundo visual:** documentário sobre pretos neutros, com o vídeo e as fotos em cores. Grão de filme por cima do vídeo.
- **Cores, pedido de 13/10/2026:** nada no site fica em preto e branco. A foto dos quatro na mesa só existia em preto e branco, então foi colorida por IA com as outras fotos do escritório como referência. Para nenhum rosto ser redesenhado, a luz e o detalhe vêm da foto original e só a cor vem da IA. O vídeo aprovado foi colorido do mesmo jeito, quadro a quadro, com três quadros coloridos de referência (início, meio e fim) e a cor de cada pessoa mudando no momento em que ela vira o rosto. Uma tentativa de gerar o vídeo de novo em cores foi descartada porque a IA inventou duas pessoas a mais. Arquivos de trabalho em `review/cor/`.
- **Legendas:** no terço de baixo, como legendas de filme, para nenhum rosto ficar coberto. O menu ganha uma barra própria sobre o vídeo.
- **Sobre:** os dois retratos, em cores, porque a agência é feita de duas coisas.
- **Como funciona:** um passo, uma foto, como na versão 2.
- **Contato:** o último quadro do filme, com o time olhando, reaparece esmaecido no canto.
- **Celular e movimento reduzido:** a fotografia real, parada. O vídeo não é baixado.
- **Limites honestos:** o modelo entrega 720p, então em tela grande a imagem fica um pouco suave. As fotos das seções continuam pequenas.

## Confirmado pela Digital Fuel em 12/10/2026

- O time atende em português e em inglês.
- FuelStation é o nome da plataforma de CRM e automação.
- O rótulo "Results guaranteed" do programa Scale vale.
- Os selos Meta, Google e BBB continuam válidos.
- CEP 01752 no endereço.

## Pendências

- Depoimentos e números reais para a seção de prova, quando houver.
- Página de política de privacidade: o site atual lista o link, mas a página não existe.
- Confirmar o domínio do ar antes de publicar (as páginas apontam para digitalfuelagency.com).
- Escolher entre a versão 1 (raiz), a versão 2 (`/site-2/`) e a versão 3 (`/site-3/`).
- Nomes e cargos das pessoas das fotos, e as fotos originais em alta, se a versão 2 seguir.
