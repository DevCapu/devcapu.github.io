export interface Env {
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/auth") {
      const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${env.GITHUB_CLIENT_ID}&scope=repo`;
      return Response.redirect(redirectUrl, 302);
    }

    if (url.pathname === "/callback") {
      const code = url.searchParams.get("code");
      if (!code) {
        return new Response("Missing code parameter", { status: 400 });
      }

      const response = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });

      const data = (await response.json()) as { access_token?: string; error?: string; error_description?: string };

      if (data.error || !data.access_token) {
        return new Response(`OAuth Error: ${data.error_description || data.error || "Failed to obtain token"}`, {
          status: 400,
        });
      }

      const token = data.access_token;
      const content = `
        <!DOCTYPE html>
        <html>
        <body>
          <script>
            (function() {
              function receiveMessage(e) {
                console.log("receiveMessage", e);
                window.opener.postMessage(
                  'authorization:github:success:${JSON.stringify({ token, provider: "github" })}',
                  e.origin
                );
              }
              window.addEventListener("message", receiveMessage, false);
              window.opener.postMessage("authorizing:github", "*");
            })();
          </script>
        </body>
        </html>
      `;

      return new Response(content, {
        headers: { "Content-Type": "text/html;charset=UTF-8" },
      });
    }

    return new Response("DecapCMS OAuth Worker is Running", { status: 200 });
  },
};
