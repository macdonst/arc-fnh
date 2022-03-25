import arc from '@architect/functions'
import render from '@architect/views/render.mjs'
import arcOauth from 'arc-plugin-oauth'
const auth = arcOauth.auth

export const handler = arc.http.async(auth, index)

async function index(req) {
  const initialState = { account: req.session?.account }

  return {
    html: render(
      `
        <hockey-header></hockey-header>
        <p>You are Authenticated</p>
        <form method="post" action="/logout">
          <button type="submit">Logout</button>
        </form>
      `,
      initialState
    )
  }
}
