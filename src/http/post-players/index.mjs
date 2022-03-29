import arc from '@architect/functions'
import { upsertPlayer } from '@architect/shared/db/players.mjs'
import arcOauth from 'arc-plugin-oauth'
const auth = arcOauth.auth

export const handler = arc.http.async(auth, http)

async function http(req) {
  await upsertPlayer(req.body)

  return {
    location: '/players'
  }
}
