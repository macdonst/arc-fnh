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
      <hockey-form action="/games">
        <hockey-input id="date" label="Date" type="date" required="true"></hockey-input>
        <hockey-input id="time" label="Time" type="time" required="true"></hockey-input>
        <hockey-input id="facility" label="Facility" type="text" required="true"></hockey-input>
      </hockey-form>
    </hockey-page>
  `,
      initialState
    )
  }
}
