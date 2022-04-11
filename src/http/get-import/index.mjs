import arc from '@architect/functions'
import render from '@architect/views/render.mjs'
import arcOauth from 'arc-plugin-oauth'
const auth = arcOauth.auth

export const handler = arc.http.async(auth, players)

async function players(req) {
  const initialState = { account: req.session?.account }

  return {
    html: render(
      `
    <hockey-page>
      <hockey-form action="/import" name="import2">
      <input name="ack" value="ack"></input>
        <label for="importdata">Data:</label>
        <textarea id="importdata" name="importdata" label="Data" required="true" rows="40" cols="80" form="import2"></textarea>
      </hockey-form>
    </hockey-page>
  `,
      initialState
    )
  }
}
