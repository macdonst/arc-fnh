import arc from '@architect/functions'
import { getNextGame } from '@architect/shared/db/games.mjs'
import { getPlayer } from '@architect/shared/db/players.mjs'
import render from '@architect/views/render.mjs'
import arcOauth from 'arc-plugin-oauth'
const auth = arcOauth.auth

export const handler = arc.http.async(auth, index)

async function getCancellations(cancellations = []) {
  return Promise.all(cancellations.map((player) => getPlayer(player)))
}

async function index(req) {
  const initialState = { account: req.session?.account }

  const next = await getNextGame()
  console.log(next)
  const date = new Date(next.gamedate)
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' })
  const month = date.toLocaleDateString('en-US', { month: 'long' })

  const cancellations = await getCancellations(next.cancellations)
  // const goalies = await getGoalies(next.cancellations)

  return {
    html: render(
      `
        <hockey-page>
          <div class="flex flex-row p2 bg-gradient color-white radius1">
            <h1 class="fz2 mr0 whitespace-nowrap">🏒</h1>
            <div>
              <h1 class="mb-3 fw-medium fs1 c-p1 text1">Next Game</h1>
              <p class="mb1 fs0 fw-book c-p1"><a href="/games/${
                next.gamedate
              }">${dayOfWeek} ${month} ${date.getDate()} at ${
        next.facility
      }</a></p>
              <p class="c-p1">
                <ul>
                <li>Cancellations: ${cancellations
                  .map((player) => player.name)
                  .join(', ')}</li>
                <li>Spares:</li>
                <li>Goalies:</li>
                </ul>
              </p>
            </div>
          </div>
        </hockey-page>
      `,
      initialState
    )
  }
}
