import arc from '@architect/functions'
import { deleteSeason } from '@architect/shared/db/seasons.mjs'
import arcOauth from 'arc-plugin-oauth'
const auth = arcOauth.auth

export const handler = arc.http.async(auth, http)

async function http(req) {
  const { todelete = [] } = req.body
  const seasons = Array.isArray(todelete) ? todelete : [todelete]

  await Promise.all(seasons.map((season) => deleteSeason(season)))

  return {
    location: '/seasons'
  }
}
