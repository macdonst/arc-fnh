import arc from '@architect/functions'
import { upsertPlayer } from '@architect/shared/db/players.mjs'
import arcOauth from 'arc-plugin-oauth'
const auth = arcOauth.auth

export const handler = arc.http.async(auth, http)

async function http(req) {
  const id = req.pathParameters?.id
  const player = { ...req.body, email: id }
  console.log(player)

  await upsertPlayer(player)

  return {
    location: '/players'
  }
}
