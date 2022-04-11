import arc from '@architect/functions'
import { upsertGame } from '@architect/shared/db/games.mjs'
import { upsertPlayer } from '@architect/shared/db/players.mjs'
import arcOauth from 'arc-plugin-oauth'
const auth = arcOauth.auth

export const handler = arc.http.async(auth, http)

async function http(req) {
  const { players, games } = JSON.parse(
    req.body.importdata.split('\r\n').join('')
  )

  for (let i = 0; i < games.length; i++) {
    await upsertGame(games[i])
  }
  for (let i = 0; i < players.length; i++) {
    await upsertPlayer(players[i])
  }

  return {
    location: '/'
  }
}
