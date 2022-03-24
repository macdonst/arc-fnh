import arc from '@architect/functions'
import { deletePlayer } from '@architect/shared/db/players.mjs'
import arcOauth from 'arc-plugin-oauth'
const auth = arcOauth.auth

export const handler = arc.http.async(auth, http)

async function http(req) {
  const id = req.pathParameters?.id

  await deletePlayer(id)

  return {
    location: '/players'
  }
}
