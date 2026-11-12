# hugocarvalho.mat.br

Código-fonte do meu [site pessoal](https://hugocarvalho.mat.br/), com visual inspirado no LCARS.
É HTML + CSS + um pouco de JS, **sem build**: nada de Quarto, Node ou gerador.

## Ver localmente

Dê dois cliques em `index.html`. Todos os links são relativos, então não precisa de servidor.

## Estrutura

```
index.html          Home
research.html       Publicações
ensino.html         Disciplinas e materiais (PT)
ensino-en.html      Teaching (EN)
orientacoes.html    Orientações em andamento e concluídas (PT)
orientacoes-en.html Supervision (EN)
compositions.html   Composições
apps.html           Apps didáticos e jogos
assets/lcars.css    Tema: cores em :root, moldura, componentes
assets/lcars.js     Data estelar, painel de números e prévia dos vídeos
assets/photo.jpg
assets/favicon.svg, favicon-32.png, apple-touch-icon.png   Ícone da aba (🖖 Twemoji)
CNAME               Domínio para o GitHub Pages
```

## Editar conteúdo

Cada página é um arquivo HTML completo. A moldura (topo, menu e rodapé) se repete nos 8 arquivos.
O conteúdo de cada página fica dentro de `<main class="content">`.

- **Nova publicação:** copie uma linha `<li>` da lista certa em `research.html` e troque ano, autores, título e link.
- **Nova orientação:** igual, em `orientacoes.html` **e** `orientacoes-en.html`. Atualize também a data em "Última atualização".
- **Novo semestre:** copie um bloco `<div><dt>…</dt><dd>…</dd></div>` em `ensino.html` **e** `ensino-en.html`.
- **Novo app:** copie um `<article class="app">` em `apps.html`.
- **Nova página no menu:** acrescente um `<a>` no `<nav class="nav">` de **todas** as páginas.
- **Cores:** as variáveis no início de `assets/lcars.css` (`--orange`, `--peach`, `--lilac`…).

## Publicar (GitHub Pages)

O GitHub Pages serve a branch `main`, pasta `/ (root)` (*Settings → Pages → Deploy from a branch*).
Para publicar uma alteração, basta fazer commit e push em `main`. O site atualiza em um ou dois minutos.

- `CNAME` mantém o domínio `hugocarvalho.mat.br`.
- `.nojekyll` faz o GitHub servir os arquivos como estão, sem processá-los com o Jekyll.

## Créditos

O design foi escrito do zero e não usa código do template do TheLCARS.com. As fontes [Barlow e Barlow Condensed](https://fonts.google.com/specimen/Barlow) são distribuídas sob a SIL Open Font License.
O ícone da aba é o emoji 🖖 do [Twemoji](https://github.com/jdecked/twemoji), licença CC-BY 4.0.
Star Trek e LCARS são marcas da CBS Studios Inc. Este site não tem afiliação com a CBS.
Feito com o auxílio do Claude Opus 5.5, da Anthropic.

---

[![CC BY-NC 4.0][cc-by-nc-shield]][cc-by-nc]

This work is licensed under a
[Creative Commons Attribution-NonCommercial 4.0 International License][cc-by-nc].

[![CC BY-NC 4.0][cc-by-nc-image]][cc-by-nc]

[cc-by-nc]: http://creativecommons.org/licenses/by-nc/4.0/
[cc-by-nc-image]: https://i.creativecommons.org/l/by-nc/4.0/88x31.png
[cc-by-nc-shield]: https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg
