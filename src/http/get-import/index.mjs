import arc from '@architect/functions'
import render from '@architect/views/render.mjs'
import authenticate from '@architect/shared/auth.mjs'


export const handler = arc.http.async(authenticate, players)

async function players(req) {
  const initialState = { account: req.session?.account }

  return {
    html: render(
      `
    <hockey-page>
      <hockey-form action="/import" name="import2">
        <label for="importdata">Data:</label>
        <textarea id="importdata" name="importdata" label="Data" required="true" rows="40" cols="80" form="import2"></textarea>
      </hockey-form>
    </hockey-page>
  `,
      initialState
    )
  }
}
