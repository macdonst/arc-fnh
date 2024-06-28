import arc from '@architect/functions'
import { getGame } from '@architect/shared/db/games.mjs'
import render from '@architect/views/render.mjs'
import authenticate from '@architect/shared/auth.mjs'


const initialGame = { gamedate: '', time: '', facility: '' }

export const handler = arc.http.async(authenticate, games)

async function games(req) {
  const initialState = { account: req.session?.account }
  const { id = null } = req.query
  const game = id ? await getGame(id) : initialGame

  return {
    html: render(
      `
    <hockey-page>
      <hockey-form action="/games">
        <hockey-input id="gamedate" label="Date" type="date" required="true" value="${game.gamedate}"></hockey-input>
        <hockey-input id="time" label="Time" type="time" required="true" value="${game.time}"></hockey-input>
        <hockey-input id="facility" label="Facility" type="text" required="true" value="${game.facility}"></hockey-input>
      </hockey-form>
    </hockey-page>
  `,
      initialState
    )
  }
}
