import arc from '@architect/functions'
import { deleteSeason } from '@architect/shared/db/seasons.mjs'
import arcOauth from 'arc-plugin-oauth'
const auth = arcOauth.auth

export const handler = arc.http.async(auth, http)

async function http(req) {
  const id = req.pathParameters?.id

  await deleteSeason(id)

  return {
    location: '/seasons'
  }
}
