import arc from '@architect/functions'
import { deleteSeason } from '@architect/shared/db/seasons.mjs'
import authenticate from '@architect/shared/auth.mjs'


export const handler = arc.http.async(authenticate, http)

async function http(req) {
  const id = req.pathParameters?.id

  await deleteSeason(id)

  return {
    location: '/seasons'
  }
}
