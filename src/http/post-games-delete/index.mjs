import arc from '@architect/functions'
import { deleteGame } from '@architect/shared/db/games.mjs'
import arcOauth from 'arc-plugin-oauth'
const auth = arcOauth.auth

export const handler = arc.http.async(auth, http)

async function http(req) {
  const { todelete = [], season } = req.body
  const games = Array.isArray(todelete) ? todelete : [todelete]

  await Promise.all(games.map((game) => deleteGame(game)))

  return {
    location: `/games?season=${season}`
  }
}
