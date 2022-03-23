import arc from "@architect/functions"
import { upsertPlayer } from "@architect/shared/db/players.mjs"

export const handler = arc.http.async(http)

async function http (req) {
  console.log(req.body)
  let result = await upsertPlayer(req.body)

  return {
    location: '/players'
  }
}
