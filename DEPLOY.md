# 🚀 Guia de Deploy - Pelada Fácil

Este documento fornece instruções detalhadas para fazer o deploy do site Pelada Fácil em diferentes plataformas.

## 📋 Pré-requisitos

- Arquivos do projeto
- Conta em uma plataforma de hospedagem
- (Opcional) Domínio próprio

## 🌐 Opções de Hospedagem

### 1. GitHub Pages (Gratuito)

**Vantagens:**
- Gratuito
- HTTPS automático
- Deploy automático com Git
- Ideal para sites estáticos

**Instruções:**

```bash
# 1. Crie um repositório no GitHub
# 2. Faça push do projeto

git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/seu-usuario/pelada-facil.git
git push -u origin main

# 3. Ative GitHub Pages nas configurações do repositório
# Settings > Pages > Source: main branch > Save
```

URL: `https://seu-usuario.github.io/pelada-facil/`

**Domínio customizado:**
1. Adicione um arquivo `CNAME` com seu domínio
2. Configure DNS no seu provedor:
   - Type: CNAME
   - Name: www
   - Value: seu-usuario.github.io

---

### 2. Netlify (Recomendado)

**Vantagens:**
- Deploy em segundos
- HTTPS automático
- CDN global
- Formulários e funções serverless
- Domínio gratuito (.netlify.app)

**Opção A - Deploy via Git:**

```bash
# 1. Faça push para GitHub/GitLab/Bitbucket
# 2. Conecte repositório no Netlify
# 3. Configure build settings:
#    - Build command: (deixe vazio)
#    - Publish directory: /
```

**Opção B - Deploy Manual:**

```bash
# 1. Instale Netlify CLI
npm install -g netlify-cli

# 2. Login
netlify login

# 3. Deploy
cd /caminho/para/pelada-facil
netlify deploy --prod
```

**Configuração netlify.toml:**

```toml
[build]
  publish = "/"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

URL: `https://seu-site.netlify.app`

---

### 3. Vercel

**Vantagens:**
- Deploy instantâneo
- Preview deployments
- Edge network global
- Integrações com frameworks

**Instruções:**

```bash
# 1. Instale Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
cd /caminho/para/pelada-facil
vercel --prod
```

**Configuração vercel.json:**

```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

URL: `https://pelada-facil.vercel.app`

---

### 4. Firebase Hosting

**Vantagens:**
- CDN do Google
- SSL gratuito
- Integração com Firebase services

**Instruções:**

```bash
# 1. Instale Firebase CLI
npm install -g firebase-tools

# 2. Login
firebase login

# 3. Inicialize
firebase init hosting

# Configurações:
# - Public directory: . (ponto)
# - Single-page app: No
# - GitHub deploys: Yes (opcional)

# 4. Deploy
firebase deploy --only hosting
```

**firebase.json:**

```json
{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      },
      {
        "source": "**/*.@(css|js)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

URL: `https://pelada-facil.web.app`

---

### 5. AWS S3 + CloudFront

**Vantagens:**
- Escalabilidade máxima
- Controle total
- Performance global

**Instruções básicas:**

1. Crie bucket S3
2. Ative static website hosting
3. Configure CloudFront distribution
4. Aponte DNS para CloudFront

(Instruções detalhadas disponíveis na documentação AWS)

---

### 6. Hospedagem Tradicional (cPanel)

**Instruções:**

1. Acesse seu cPanel
2. Vá para "Gerenciador de Arquivos"
3. Navegue até `public_html/`
4. Faça upload de todos os arquivos:
   - index.html
   - css/
   - js/
   - manifest.json
   - robots.txt
   - etc.

5. Acesse seu domínio: `https://seudominio.com.br`

---

## 🔧 Otimizações Antes do Deploy

### 1. Minificar CSS

```bash
# Usando cssnano
npx cssnano css/style.css css/style.min.css

# Atualize o link no HTML
<link rel="stylesheet" href="css/style.min.css">
```

### 2. Minificar JavaScript

```bash
# Usando terser
npx terser js/script.js -o js/script.min.js -c -m

# Atualize o link no HTML
<script src="js/script.min.js"></script>
```

### 3. Otimizar Imagens

```bash
# Usando imagemin
npm install -g imagemin-cli
imagemin images/* --out-dir=images/optimized
```

### 4. Gerar Service Worker (PWA)

Crie `sw.js` na raiz:

```javascript
const CACHE_NAME = 'pelada-facil-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/script.js',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

Registre no `index.html`:

```javascript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```

---

## 📊 Analytics

### Google Analytics 4

Adicione antes de `</head>`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🔒 Segurança

### Headers de Segurança

Configure no servidor ou via meta tags:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;">
```

### HTTPS

**Certifique-se de sempre usar HTTPS:**
- Let's Encrypt (gratuito)
- Cloudflare SSL (gratuito)
- SSL do provedor de hospedagem

---

## 📈 SEO

### 1. Sitemap

Crie `sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://peladafacil.com.br/</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### 2. Google Search Console

1. Acesse: https://search.google.com/search-console
2. Adicione sua propriedade
3. Verifique propriedade
4. Envie sitemap

### 3. Meta Tags

Já implementadas no `index.html`!

---

## ✅ Checklist Final

Antes de fazer o deploy, verifique:

- [ ] Todos os links funcionam
- [ ] Imagens carregam corretamente
- [ ] Formulários funcionam
- [ ] Site responsivo (mobile, tablet, desktop)
- [ ] Testado em múltiplos navegadores
- [ ] CSS e JS minificados
- [ ] Imagens otimizadas
- [ ] Analytics configurado
- [ ] HTTPS ativo
- [ ] Sitemap enviado
- [ ] robots.txt configurado
- [ ] Meta tags completas
- [ ] Favicon adicionado
- [ ] Performance > 90 no Lighthouse

---

## 🧪 Testes

### Performance

```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun --url=https://seusite.com
```

### Responsividade

Teste em:
- Chrome DevTools (F12 > Toggle device toolbar)
- BrowserStack
- Real devices

### Cross-browser

- Chrome
- Firefox
- Safari
- Edge
- Mobile browsers

---

## 🆘 Solução de Problemas

### Arquivos CSS/JS não carregam

- Verifique caminhos relativos
- Confirme que arquivos foram enviados
- Limpe cache do navegador

### Fontes não carregam

- Verifique CORS
- Teste CDN alternativo

### Site não aparece no Google

- Aguarde 1-2 semanas
- Envie sitemap no Search Console
- Verifique robots.txt

---

## 📞 Suporte

Problemas com deploy? Entre em contato:
- Email: contato@peladafacil.com.br
- GitHub Issues: [Link]

---

**Boa sorte com o deploy! ⚽🚀**
