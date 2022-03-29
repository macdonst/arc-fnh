import arc from '@architect/functions'
import { getGame, upsertGame } from '@architect/shared/db/games.mjs'
import arcOauth from 'arc-plugin-oauth'
const auth = arcOauth.auth

export const handler = arc.http.async(auth, http)

async function http(req) {
  const id = req.pathParameters?.id
  const { player, action } = req.body

  const game = await getGame(id)
  game.cancellations = game.cancellations ? game.cancellations : []

  console.log('body', req.body)
  console.log('game', game)

  if (action === 'attend') {
    if (game.cancellations.includes(player)) {
      game.cancellations = game.cancellations.filter((item) => item !== player)
    }
  } else if (action === 'skip') {
    if (!game.cancellations.includes(player)) {
      game.cancellations.push(player)
    } else if (game.cancellations.length === 0) {
      game.cancellations = [player]
    }
  }

  console.log('game2', game)
  // check to see if we need to add remove from the
  // cancellation list

  await upsertGame(game)

  return {
    location: `/games/${id}`
  }
}
