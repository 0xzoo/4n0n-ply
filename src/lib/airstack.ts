import {
  init,
  fetchQuery
} from "@airstack/airstack-react"
import { AIRSTACK_API_KEY } from "./key"

init(AIRSTACK_API_KEY, { env: "prod" })

export async function getCastChannel(castHash: string) {
  const query = `
    query MyQuery($castHash: String!) {
      FarcasterCasts(
        input: {filter: {hash: {_eq: $castHash}}, blockchain: ALL}
      ) {
        Cast {
          channel {
            channelId
          }
        }
      }
    }
  `

  const { data, error } = await fetchQuery(query, { castHash })
  const channel = data.FarcasterCasts.Cast[0].channel
  return { channel, error }
}