import arc from '@architect/functions'
import { upsertSeason } from '@architect/shared/db/seasons.mjs'
import arcOauth from 'arc-plugin-oauth'
const auth = arcOauth.auth

export const handler = arc.http.async(auth, http)

async function http(req) {
  await upsertSeason(req.body)

  return {
    location: '/seasons'
  }
}
