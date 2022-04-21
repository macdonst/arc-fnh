import arc from '@architect/functions'
import { getGame, upsertGame } from '@architect/shared/db/games.mjs'
import arcOauth from 'arc-plugin-oauth'
const auth = arcOauth.auth

export const handler = arc.http.async(auth, http)

async function http(req) {
  const id = req.pathParameters?.id
  const { cancellations = [], spares = [] } = req.body

  const game = await getGame(id)
  game.cancellations = Array.isArray(cancellations)
    ? cancellations
    : [cancellations]
  game.spares = Array.isArray(spares) ? spares : [spares]

  await upsertGame(game)

  await arc.events.publish({
    name: 'find-spares',
    payload: {
      game
    }
  })

  return {
    location: `/games/${id}`
  }
}
