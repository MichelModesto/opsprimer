# OpsPrimer

Site de conteúdo sobre automação de marketing e operações para agências e consultorias.
Astro estático, sem back-end, sem segredos no repositório.

Estratégia, verificação de programas e decisões: dossiê em `../testeTT/`.

---

## Rodar

```bash
npm install
npm run setup      # ativa o hook de segurança (obrigatório, uma vez)
npm run dev
```

**`npm run setup` não é opcional.** Ele aponta o Git para `.githooks/`, que bloqueia commit
com segredo. Sem isso você perde a proteção.

Requer [gitleaks](https://github.com/gitleaks/gitleaks): `brew install gitleaks`

| Comando | O quê |
|---|---|
| `npm run dev` | Servidor local |
| `npm run build` | Build estático em `dist/` |
| `npm run preview` | Serve o build |
| `npm run check:secrets` | Varre **todo o histórico** atrás de segredo |

---

## Regras do projeto

### 1. Link de afiliado só pelo componente

```mdx
import AffiliateLink from '../../components/AffiliateLink.astro';

<AffiliateLink href="https://...">HubSpot</AffiliateLink>
```

Nunca `<a>` cru. O componente garante `rel="sponsored nofollow noopener"` —
`sponsored` é exigido pelo Google para link de afiliado, `noopener` impede tabnabbing.

### 2. Todo artigo abre com a divulgação FTC

O componente `<Disclosure />` já está no layout de artigo, no topo — não no rodapé.

### 3. Artigo novo

Crie `src/content/articles/slug.mdx` com frontmatter `title`, `description`, `pubDate`.
Use `draft: true` enquanto escreve — draft não entra no build nem no sitemap.

Molde e regras de escrita: `src/content/articles/example-pattern.mdx`

### 4. Segredos

Não existem. Formulário por embed, analytics por beacon, deploy por integração Git —
tudo público por natureza. **Se algum dia precisar de token de API, ele vai nas variáveis
de ambiente do Cloudflare Pages, nunca em arquivo.**

---

## ⚠️ Antes de publicar qualquer artigo

- [ ] Nenhum screenshot com dado de cliente real (nome, e-mail, telefone, valor de negócio)
- [ ] EXIF removido de imagem própria: `exiftool -all= imagem.jpg`
- [ ] Nenhum preço afirmado sem ter conferido — use `[VERIFY: ___]`
- [ ] Nenhuma experiência inventada — use `[MY EXPERIENCE: ___]` e preencha você
- [ ] Uma fraqueza real declarada para cada ferramenta, inclusive as que pagam comissão

## ⚠️ Antes de tornar o repositório público

```bash
npm run check:secrets
git ls-files | grep -iE "^\.env" | grep -v "^\.env\.example$" && echo "⚠️ PARE" || echo "✅ ok"
git log --format='%ae' | sort -u        # confira: nenhum e-mail pessoal
```

Checklist completo: `../testeTT/11-setup-e-seguranca.md`

---

## Preencher antes do primeiro deploy

Procure por `[` no `src/pages/`:

| Arquivo | O quê |
|---|---|
| `about.astro` | Nome real, experiência, e-mail de negócio |
| `affiliate-disclosure.astro` | Data, e-mail, lista de programas conforme aprovado |
| `privacy-policy.astro` | Data, e-mail. **Atualize ao adicionar formulário ou analytics** |

```bash
grep -rn "\[SEU\|\[DATA\|\[VERIFY\|\[MY EXPERIENCE\|\[Criterio\|\[situacao" src/
```

## Deploy

Cloudflare Pages → conectar o repositório → build `npm run build`, output `dist`.
Sem token, sem variável de ambiente, sem segredo.
