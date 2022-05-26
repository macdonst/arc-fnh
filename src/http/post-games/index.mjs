import arc from '@architect/functions'
import { upsertGame } from '@architect/shared/db/games.mjs'
import { getSeasonWithGame } from '@architect/shared/db/seasons.mjs'
import arcOauth from 'arc-plugin-oauth'
const auth = arcOauth.auth

export const handler = arc.http.async(auth, http)

async function http(req) {
  await upsertGame(req.body)
  const season = await getSeasonWithGame(req.body.gamedate)

  return {
    location: `/games?season=${season.seasonID}`
  }
}
