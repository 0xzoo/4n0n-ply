import {
  Button,
  FrameHandler,
  TextInput,
} from 'frog'
import {
  actionsHomeStyles,
  anonGradientStyles,
  backgroundStyles,
  nglGradienttStyles,
  replyAnonErrorStyles,
  replyAnonStyles
} from '../lib/styles'
import { CustomFrameContext } from '..'
import { NEYNAR_API_KEY, SIGNER_UUID } from '../lib/key'
import { getCastChannel } from '../lib/airstack'

type PostBodyOptions = {
  signer_uuid: string,
  text: string,
  channel_id?: string
}

export const castedScreen: FrameHandler = async (c: CustomFrameContext) => {
  const inputText = c.inputText as string
  const castHash = c.frameData?.castId.hash as string
  const { channel } = await getCastChannel(castHash) // deal with error?

  let bodyOptions: PostBodyOptions = {
    signer_uuid: SIGNER_UUID,
    text: inputText,
  }
  if (channel) bodyOptions.channel_id = channel.channelId

  const postOptions = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      api_key: NEYNAR_API_KEY,
      'content-type': 'application/json',
      'signer_uuid': SIGNER_UUID
    },
    body: JSON.stringify(bodyOptions)
  }

  try {
    await fetch('https://api.neynar.com/v2/farcaster/cast', postOptions)
      .catch(err => { throw (err) })

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
            src={'https://media.istockphoto.com/id/1149886876/photo/paper-airplane.jpg?s=612x612&w=0&k=20&c=nA2uHME1mdGZZMZsv_9lugsOXnD_4lq3EFyZgfXOkI0='}
          />
          <div
            class={'text'}
            style={{
              ...replyAnonStyles
            }}
          >
            <text>\\ cast</text>
            <text style={{ ...anonGradientStyles, paddingLeft: '10px' }}>\\ sent</text>
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
      intents: []
    })
  } catch (err) {
    // console.log('fetch err', err)
    // throw (err)

    return c.res({
      image: (
        <div
          style={{
            ...backgroundStyles,
            ...actionsHomeStyles
          }}
        >
          <div
            class={'text'}
            style={{
              ...replyAnonErrorStyles
            }}
          >
            <text>\\ something went wrong</text>
            <text style={{ ...nglGradienttStyles, paddingLeft: '10px' }}>\\ pls try again</text>
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
        <Button action='/sent'>4n0n-ply</Button>
      ]
    })
  }
}