import arc from '@architect/functions'
import { upsertGame } from '@architect/shared/db/games.mjs'
import arcOauth from 'arc-plugin-oauth'
const auth = arcOauth.auth

export const handler = arc.http.async(auth, http)

async function http(req) {
  const id = req.pathParameters?.id
  const game = { ...req.body, date: id }
  console.log(game)

  await upsertGame(game)

  return {
    location: '/games'
  }
}
