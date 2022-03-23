import arc from "@architect/functions"
import { deletePlayer } from "@architect/shared/db/players.mjs"

export const handler = arc.http.async(http)

async function http (req) {
  const id = req.pathParameters?.id

  const result = await deletePlayer(id)

  return {
    location: '/players'
  }
}
