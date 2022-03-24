import arc from "@architect/functions"
import { upsertGame } from "@architect/shared/db/games.mjs"
import arcOauth from 'arc-plugin-oauth'
const auth = arcOauth.auth

export const handler = arc.http.async(auth, http)

async function http (req) {
  console.log(req.body)
  let result = await upsertGame(req.body)

  return {
    location: '/games'
  }
}
