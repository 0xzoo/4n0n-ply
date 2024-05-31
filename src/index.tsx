import {
  FrameContext,
  Frog,
} from 'frog'
import { getFont } from './lib/fonts'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
import { AIRSTACK_API_KEY } from './lib/key'
import { anonplyScreen } from './screens/4n0nply'
import { addAnonplyScreen } from './screens/add-4n0nply'
import { castedScreen } from './screens/casted'
import { sentScreen } from './screens/sent'

export type Env = {
  AIRSTACK_API_KEY: string,
  WEBHOOK_SECRET: string,
  SIGNER_UUID: string,
}

type FrogOptions = {
  Bindings: Env,
}

export type CustomFrameContext = FrameContext<FrogOptions>

export const app = new Frog<FrogOptions>({
  hub: {
    apiUrl: "https://hubs.airstack.xyz",
    fetchOptions: {
      headers: {
        "x-airstack-hubs": AIRSTACK_API_KEY,
      }
    }
  },
  assetsPath: '/assets',
  imageOptions: async () => {
    const helvetica = await getFont(400)
    const helveticaBold = await getFont(500)
    const helveticaBlack = await getFont(600)

    return {
      fonts: [helvetica, helveticaBold, helveticaBlack]
    }
  },
  headers: {
    'cache-control': 'max-age=0',
  }
})

app.frame('/add', addAnonplyScreen)
app.frame('/frame', anonplyScreen)
app.frame('/casted', castedScreen)
app.frame('/sent', sentScreen)

app.castAction(
  '/4n0n-ply',
  (c) => {
    return c.res({ type: 'frame', path: '/frame' })
  },
  { name: "4n0n-ply", icon: "dependabot" }
)

const isCloudflareWorker = typeof caches !== 'undefined'
if (isCloudflareWorker) {
  // @ts-ignore
  const manifest = await import('__STATIC_CONTENT_MANIFEST')
  //
  const serveStaticOptions = { manifest, root: './' }
  app.use('/*', serveStatic(serveStaticOptions))
  devtools(app, { assetsPath: '/frog', serveStatic, serveStaticOptions })
} else {
  devtools(app, { serveStatic })
}

export default app
