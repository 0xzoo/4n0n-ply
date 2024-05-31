import {
  Button,
  FrameHandler,
  TextInput,
} from 'frog'
import {
  actionsHomeStyles,
  anonGradientStyles,
  backgroundStyles,
  replyAnonStyles
} from '../lib/styles'
import { CustomFrameContext } from '..'


export const anonplyScreen: FrameHandler = async (c: CustomFrameContext) => {
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
            marginTop: '90px',
            marginLeft: '600px',
          }}
          src={'https://imgs.search.brave.com/lA8lbK0XBf9L5awl7xKbColCpmM5j6mCtKvaarhPeeI/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAwLzU0LzY1LzE2/LzM2MF9GXzU0NjUx/NjA3X09KT0dickZC/QjNtRFRwWkRLbWRq/alI5NGxzYlpNVFZh/LmpwZw'}
        />
        <div
          class={'text'}
          style={{
            ...replyAnonStyles
          }}
        >
          <text>\\ cast,</text>
          <text style={{ ...anonGradientStyles }}>\\ anon</text>
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
      <TextInput placeholder='🗣️'></TextInput>,
      <Button action="/casted">4n0n-cast</Button>,
      <Button action="/sent">4n0n-ply</Button>
    ]
  })
}