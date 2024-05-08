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

export const sentScreen: FrameHandler = async (c: CustomFrameContext) => {
  const inputText = c.inputText as string
  const castHash = c.frameData?.castId.hash
  // const messageHash = c.frameData?.messageHash
  // console.log('castHash', castHash)
  // console.log('messageHash', messageHash)
  // let success = true

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      api_key: NEYNAR_API_KEY,
      'content-type': 'application/json',
      'signer_uuid': SIGNER_UUID
    },
    body: JSON.stringify({ signer_uuid: SIGNER_UUID, text: inputText, parent: castHash })
  }

  try {
    await fetch('https://api.neynar.com/v2/farcaster/cast', options)
      .then(response => response.json())
      .then(response => {
        console.log('jsonRes', response)
      })
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
            <text>\\ reply</text>
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
      // imageAspectRatio: '1:1',
      intents: []
    })
  } catch (err) {
    // success = false
    console.log('fetch err', err)
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