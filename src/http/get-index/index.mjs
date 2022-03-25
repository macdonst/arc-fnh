import arc from '@architect/functions'
import render from '@architect/views/render.mjs'
import arcOauth from 'arc-plugin-oauth'
const auth = arcOauth.auth
const checkAuth = arcOauth.checkAuth

export const handler = arc.http.async(auth, index)

async function index(req) {
  const authenticated = checkAuth(req) ? true : false

  return {
    html: render(`
        <hockey-header auth="${authenticated}"></hockey-header>
        <p>You are Authenticated</p>
        <form method="post" action="/logout">
          <button type="submit">Logout</button>
        </form>
      `)
  }
}
