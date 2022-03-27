import arc from '@architect/functions'
import render from '@architect/views/render.mjs'
import arcOauth from 'arc-plugin-oauth'
const auth = arcOauth.auth

export const handler = arc.http.async(auth, games)

async function games(req) {
  const initialState = { account: req.session?.account }

  return {
    html: render(
      `
    <hockey-page>
      <hockey-form action="/players">
        <hockey-input id="name" label="Name" type="text" required="true"></hockey-input>
        <hockey-input id="email" label="Email" type="email" required="true"></hockey-input>
        <hockey-input id="phone" label="Phone" type="tel" required="true"></hockey-input>
        <hockey-select id="position" label="Position" required="true"></hockey-select>
        <hockey-input id="fulltime" label="Fulltime" type="checkbox" required="false"></hockey-input>
      </hockey-form>
    </hockey-page>
  `,
      initialState
    )
  }
}
