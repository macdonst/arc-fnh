import arc from '@architect/functions'

export const handler = arc.http.async(http)

async function http(req) {
    return {
        location: '/',
        session: { }
      }
}
