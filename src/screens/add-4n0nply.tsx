import {
  Button,
  FrameHandler,
} from 'frog'
import {
  actionsHomeStyles,
  backgroundStyles,
  anonGradientStyles,
  add4n0nStyles
} from '../lib/styles'
import { CustomFrameContext } from '..'


export const addAnonplyScreen: FrameHandler = async (c: CustomFrameContext) => {
  return c.res({
    image: (
      <div
        style={{
          ...backgroundStyles,
          ...actionsHomeStyles
        }}
      >
        <img
          height='450px'
          width='450px'
          style={{
            marginTop: '180px',
            marginLeft: '600px',
          }}
          src={'https://imgs.search.brave.com/lA8lbK0XBf9L5awl7xKbColCpmM5j6mCtKvaarhPeeI/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAwLzU0LzY1LzE2/LzM2MF9GXzU0NjUx/NjA3X09KT0dickZC/QjNtRFRwWkRLbWRq/alI5NGxzYlpNVFZh/LmpwZw'}
        />
        <div
          class={'text'}
          style={{
            ...add4n0nStyles
          }}
        >
          <text style={{ marginBottom: '20px', padding: 0 }}>
            add
            <span style={{ ...anonGradientStyles, marginBottom: '20px' }}>4n0n-ply</span>
          </text>
          <text style={{ margin: 0, padding: 0 }}>
            to cast or reply anon with
          </text>
          <text style={{ ...anonGradientStyles, marginLeft: '120px', marginTop: '20px' }}>
            4n0n-bot
          </text>
        </div>
        <div
          class={'footer'}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            marginTop: '30px',
            marginBottom: '10px',
            marginRight: '30px',
          }}
        >
        </div>
      </div>
    ),
    imageOptions: { width: 1200, height: 630 },
    intents: [
      <Button.AddCastAction
        action='/4n0n-ply'
      >
        add 4n0n-ply
      </Button.AddCastAction>,
    ]
  })
}