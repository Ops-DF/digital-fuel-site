# Site da Digital Fuel

Site estático da [Digital Fuel](https://digitalfuelagency.com/), agência de conteúdo digital e performance em Marlborough, Massachusetts. HTML, CSS e JavaScript puros, em inglês e português.

## As quatro versões

| Versão | Endereço | Topo |
|---|---|---|
| 1 | `/` e `/pt-br/` | Gota de combustível que cai e acende, animada em código |
| 2 | `/site-2/` e `/site-2/pt-br/` | Dois retratos do time que reagem ao scroll |
| 3 | `/site-3/` e `/site-3/pt-br/` | Vídeo do time na mesa, guiado pelo scroll |
| 4 | `/site-4/` e `/site-4/pt-br/` | Página clara, desenhada no Claude Design, com o vídeo do time tocando uma vez |

As versões 2, 3 e 4 estão marcadas com `noindex` até uma delas ser escolhida.

## Pastas

- `site/`: o que vai ao ar. É a única pasta publicada.
- `ferramentas/gerar-paginas.mjs`: gera as oito páginas e os arquivos de SEO. Todo o texto do site mora aqui.
- `pacote-de-design.md`: as decisões de design e o texto aprovado.

## Mudar um texto

Edite `ferramentas/gerar-paginas.mjs` e rode:

```bash
node ferramentas/gerar-paginas.mjs
```

Não edite os arquivos `.html` à mão, porque o gerador os reescreve.

## Ver no computador

```bash
python3 -m http.server 4173 --directory site
```

Depois abra http://localhost:4173/

## Publicação

Cada envio para a branch `main` publica a pasta `site/` no GitHub Pages, pelo fluxo em `.github/workflows/pages.yml`.

## Antes de trocar o domínio

As páginas apontam `canonical`, `hreflang` e as imagens de compartilhamento para `https://digitalfuelagency.com`. Se o endereço final for outro, mude `ORIGIN` no gerador e rode de novo.
