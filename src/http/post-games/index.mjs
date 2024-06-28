import arc from '@architect/functions'
import { upsertGame } from '@architect/shared/db/games.mjs'
import { getSeasonWithGame } from '@architect/shared/db/seasons.mjs'
import authenticate from '@architect/shared/auth.mjs'


export const handler = arc.http.async(authenticate, http)

async function http(req) {
  await upsertGame(req.body)
  const season = await getSeasonWithGame(req.body.gamedate)

  return {
    location: `/games?season=${season.seasonID}`
  }
}
