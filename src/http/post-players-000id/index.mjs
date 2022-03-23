import arc from "@architect/functions"
import { upsertPlayer } from "@architect/shared/db/players.mjs"

export const handler = arc.http.async(http)

async function http (req) {
  const id = req.pathParameters?.id
  const player = { ...req.body, email: id}
  console.log(player)

  const result = await upsertPlayer(player)

  return {
    location: '/players'
  }
}
