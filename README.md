# John Raymart Tenio — Portfolio

A personal portfolio built with React, Vite, and Tailwind CSS, with project pages, a text-only blog, experience, a resume, and live GitHub contributions.

## Local development

Use Node.js 22.19 or newer within the 22.x release line.

```sh
npm ci
npm run dev
```

Copy `.env.example` to `.env.local` and set your GitHub token for contribution activity. Edit the files in `src/data` to update portfolio content.

## GitHub contribution activity

Keep `GITHUB_TOKEN` in `.env.local`. The existing token does not need a `VITE_` prefix; it is read only by the server. `GITHUB_USERNAME` is optional and overrides the account from `src/data/profile.js` for the activity calendar. The calendar's GitHub link uses the account returned by the API.

Restart `npm run dev` after changing environment variables. Both `npm run dev` and `npm run preview` execute `/api/github-contributions?year=2026` as a JSON endpoint. Successful responses are cached on the server for five minutes. Loading errors show a retry button; years with no contributions show an empty calendar and a message.

The endpoint returns a safe error code when configuration or GitHub access fails: `NOT_CONFIGURED`, `AUTH_FAILED`, `ACCESS_DENIED`, `USER_NOT_FOUND`, `RATE_LIMITED`, or `GITHUB_TIMEOUT`. Check these codes in the browser's Network panel when diagnosing configuration. Tokens are never returned by the endpoint.

For a hosted deployment, the host must execute `api/github-contributions.js` as a Node server function and provide `GITHUB_TOKEN` in its server environment. A static upload of `dist` alone does not run this endpoint. Local preview middleware is for testing the build, not a production hosting server.

Run `npm test`, `npm run lint`, and `npm run build` to check the application.

## Deploy to Vercel through GitHub

1. Push this repository to GitHub. Keep `.env.local`, `node_modules`, `dist`, and `.vercel` out of Git; `.gitignore` excludes them.
2. In Vercel, choose **Add New → Project**, connect GitHub, and import the repository. Use the repository root as the Root Directory.
3. The committed `vercel.json` selects **Vite**, installs with `npm ci`, builds with `npm run build`, and serves `dist`. `package.json` selects Node.js 22.x.
4. Before deploying, add `GITHUB_TOKEN` under Environment Variables for **Production** and **Preview**, using the value from your local environment file. Add `GITHUB_USERNAME=Maskirade` if you want to set the account explicitly. The token belongs in Vercel's environment settings, not in Git or `vercel.json`.
5. Deploy, then open and refresh `/projects`, `/experience`, `/resume`, and a `/blog/<slug>` article. The rewrite rules serve the React app for those routes while keeping `/api/github-contributions` and static assets separate.
6. Check `/api/github-contributions?year=2026` returns JSON and the contribution calendar loads. If environment variables are changed after a deployment, redeploy to apply them.

With the GitHub integration connected, future pushes to the project's production branch trigger production deployments, and other branches can create previews.

Deployment references: [Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite), [Vercel environment variables](https://vercel.com/docs/environment-variables), and [GitHub deployment integration](https://vercel.com/docs/git/vercel-for-github).
