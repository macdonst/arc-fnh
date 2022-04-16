import arc from '@architect/functions'
import { getNextGame } from '@architect/shared/db/games.mjs'
import {
  getPlayerInfo,
  getFulltimeSkaters,
  getGoalies,
  listPlayersNames
} from '@architect/shared/db/players.mjs'
import render from '@architect/views/render.mjs'
import arcOauth from 'arc-plugin-oauth'
const auth = arcOauth.auth

export const handler = arc.http.async(auth, index)

function sparesNeeded(players, cancellations, spares) {
  const total = players - cancellations + spares - 20
  console.log(`${players} - ${cancellations} + ${spares} - 20`)

  console.log(total)
  return total < 0 ? total * -1 : 0
}

async function index(req) {
  const initialState = { account: req.session?.account }

  const next = await getNextGame()
  // Rare case where we have no next game
  if (!next) {
    return {
      html: render(
        `
          <hockey-page>
            <hockey-content-card>
              <h1 slot="header" class="mb-2 fw-medium fs1 c-p1 text1 color-darkest">No Next Game Scheduled 😢</h1>
            </hockey-content-card>
          </hockey-page>
        `,
        initialState
      )
    }
  }
  const date = new Date(next.gamedate)
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' })
  const month = date.toLocaleDateString('en-US', { month: 'long' })

  const players = await getFulltimeSkaters()
  const cancellations = await getPlayerInfo(next.cancellations)
  const spares = await getPlayerInfo(next.spares)
  const goalies = await getGoalies(next.cancellations, spares)
  const short = sparesNeeded(
    players.length,
    cancellations.length,
    spares.filter((player) => player !== undefined).length
  )

  return {
    html: render(
      `
        <hockey-page>
          <hockey-content-card>
            <h1 slot="header" class="mb-2 fw-medium fs1 c-p1 text1 color-darkest">Next Game</h1>
            <div slot="content">
              <p class="mb1 fs0 fw-book c-p1">
                <a href="/games/${
                  next.gamedate
                }">${dayOfWeek} ${month} ${date.getDate()} at ${next.facility}
                </a>
              </p>
              <p class="mb1 fs0 fw-book c-p1">
                ${short <= 0 ? `Game's Full!` : `Need to find ${short} spares`}
              </p>
              <p class="c-p1">
                <ul class="list-none">
                <li class="mb-3"><span class="font-semibold">Cancellations:</span> ${listPlayersNames(
                  cancellations
                )}</li>
                <li class="mb-3"><span class="font-semibold">Spares:</span> ${listPlayersNames(
                  spares
                )}</li>
                <li class="mb-3"><span class="font-semibold">Goalies:</span> ${listPlayersNames(
                  goalies
                )}</li>
                </ul>
              </p>
            </div>
          </hockey-content-card>
        </hockey-page>
      `,
      initialState
    )
  }
}
