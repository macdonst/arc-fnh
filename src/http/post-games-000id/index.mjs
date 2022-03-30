import arc from '@architect/functions'
import { getGame, upsertGame } from '@architect/shared/db/games.mjs'
import arcOauth from 'arc-plugin-oauth'
const auth = arcOauth.auth

export const handler = arc.http.async(auth, http)

async function http(req) {
  const id = req.pathParameters?.id
  const { cancellations = [], spares = [] } = req.body

  console.log(spares)

  const game = await getGame(id)
  game.cancellations = Array.isArray(cancellations)
    ? cancellations
    : [cancellations]
  game.spares = Array.isArray(spares) ? spares : [spares]

  console.log('game', game)

  await upsertGame(game)

  console.log('game2', game)

  return {
    location: `/games/${id}`
  }
}
