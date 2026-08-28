# Cloudflare Worker - DecapCMS OAuth Backend

Este Cloudflare Worker é responsável por autenticar os usuários no DecapCMS via GitHub OAuth.

## Passo a Passo para Configuração e Deploy

### 1. Criar uma Aplicação OAuth no GitHub
1. Acesse **GitHub Developer Settings**: `https://github.com/settings/developers`
2. Clique em **OAuth Apps** -> **New OAuth App**.
3. Preencha os campos:
   - **Application name**: `DevCapu DecapCMS`
   - **Homepage URL**: `https://devcapu.dev` (ou sua URL do GitHub Pages)
   - **Authorization callback URL**: `https://website.<seu-subdominio>.workers.dev/callback` (URL que será gerada pelo Cloudflare Worker após o deploy).
4. Guarde o **Client ID** e gere um **Client Secret**.

### 2. Configurar Segredos no Cloudflare Workers
No terminal, entre na pasta `oauth-worker` e execute:

```bash
cd oauth-worker
npx wrangler secret put GITHUB_CLIENT_ID
# Insira o Client ID do GitHub

npx wrangler secret put GITHUB_CLIENT_SECRET
# Insira o Client Secret do GitHub
```

### 3. Fazer Deploy do Worker
```bash
npx wrangler deploy
```

Após o deploy, você receberá a URL final do Worker (ex: `https://website.<seu-subdominio>.workers.dev`).

### 4. Atualizar o `public/admin/config.yml`
No arquivo `public/admin/config.yml` do seu site Next.js, descomente e ajuste as linhas `base_url` e `auth_endpoint`:

```yaml
backend:
  name: github
  repo: devcapu/devcapu.github.io
  branch: master
  base_url: https://website.<seu-subdominio>.workers.dev
  auth_endpoint: auth
```
