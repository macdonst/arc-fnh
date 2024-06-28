import arc from '@architect/functions'
import { upsertSeason } from '@architect/shared/db/seasons.mjs'
import authenticate from '@architect/shared/auth.mjs'


export const handler = arc.http.async(authenticate, http)

async function http(req) {
  await upsertSeason(req.body)

  return {
    location: '/seasons'
  }
}
