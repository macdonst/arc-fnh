import arc from '@architect/functions'
import { deleteSeason } from '@architect/shared/db/seasons.mjs'
import authenticate from '@architect/shared/auth.mjs'


export const handler = arc.http.async(authenticate, http)

async function http(req) {
  const { todelete = [] } = req.body
  const seasons = Array.isArray(todelete) ? todelete : [todelete]

  await Promise.all(seasons.map((season) => deleteSeason(season)))

  return {
    location: '/seasons'
  }
}
