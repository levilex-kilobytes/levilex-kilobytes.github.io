# Levi Monda's portfolio

## Deploy to Cloudflare Pages

This is a Vite static site. In Cloudflare, create a Pages project connected to
this repository and use:

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Production branch:** your default Git branch

The [Wrangler configuration](./wrangler.jsonc) identifies the Pages project as
`levi-co-ke`. Add `levi.co.ke` (and `www.levi.co.ke` if desired) under the
project's **Custom domains** settings. Follow Cloudflare's prompts to activate
the domain and confirm the domain's nameservers are delegated to Cloudflare.
Do not remove existing DNS records that are still needed for email or other
services.

## PostHog analytics

PostHog is initialized with the project API key supplied for this site. You can
override the key or region by setting these variables in **Cloudflare Pages >
Settings > Variables and Secrets** for the production environment:

- `VITE_POSTHOG_KEY`: the project's public PostHog project API key.
- `VITE_POSTHOG_HOST`: the ingestion host for the project's region, for example
  `https://us.i.posthog.com` or `https://eu.i.posthog.com`.

The project API key is included in the public site bundle; it is not a private
server secret. Do not put private credentials in `VITE_` variables. PostHog's
default autocapture and page-view capture are enabled. Custom events track
successful contact submissions, resume downloads, project link clicks, blog
post expansions, and theme changes. JavaScript exceptions and React render
errors are also captured. The portfolio has no user accounts, so user
identification is not configured. Set either variable to an empty value to
disable analytics in production. After changing the variables, trigger a new
Pages deployment because Vite embeds them during the build.

For local development, copy `.env.example` to `.env.local`, set the project key,
and run `npm run dev`. Leave the key empty to disable PostHog.
