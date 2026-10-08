import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { createGithubHandler } from './api/github-contributions.js'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'GITHUB_')
  const handler = createGithubHandler({
    token: env.GITHUB_TOKEN,
    username: env.GITHUB_USERNAME,
  })
  const middleware = (req, res, next) => {
    const pathname = req.url?.split('?')[0]
    if (pathname !== '/api/github-contributions' && pathname !== '/api/github-contributions.js') return next()
    return handler(req, res)
  }

  return {
    plugins: [react(), {
      name: 'github-contributions-api',
      configureServer(server) {
        server.middlewares.use(middleware)
      },
      configurePreviewServer(server) {
        server.middlewares.use(middleware)
      },
    }],
  }
})
