import arc from '@architect/functions'
import { getNextGame } from '@architect/shared/db/games.mjs'
import { getPlayer, getFulltimePlayers } from '@architect/shared/db/players.mjs'
import render from '@architect/views/render.mjs'
import arcOauth from 'arc-plugin-oauth'
const auth = arcOauth.auth

export const handler = arc.http.async(auth, index)

async function getPlayerInfo(players = []) {
  return Promise.all(players.map((player) => getPlayer(player)))
}

async function getGoalies(cancellations = [], spares = []) {
  const players = await getFulltimePlayers()
  const goalies = players.filter(
    (player) =>
      player.position === 'goalie' && !cancellations.includes(player.email)
  )
  spares.forEach(function (spare) {
    if (spare?.position === 'goalie') {
      goalies.push(spare)
    }
  })
  return goalies
}

function listPlayers(players = []) {
  console.log(players)
  return players
    .filter((player) => player !== undefined)
    .map((player) => player?.name)
    .join(', ')
}

async function index(req) {
  const initialState = { account: req.session?.account }

  const next = await getNextGame()
  const date = new Date(next.gamedate)
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' })
  const month = date.toLocaleDateString('en-US', { month: 'long' })

  const cancellations = await getPlayerInfo(next.cancellations)
  const spares = await getPlayerInfo(next.spares)
  const goalies = await getGoalies(next.cancellations, spares)

  return {
    html: render(
      `
        <hockey-page>
          <div class="flex flex-row p2 radius1 border2 border-dark bg-lighter">
            <h1 class="fz2 mr0 whitespace-nowrap">🏒</h1>
            <div>
              <h1 class="mb-2 fw-medium fs1 c-p1 text1 color-darkest">Next Game</h1>
              <p class="mb1 fs0 fw-book c-p1">
                <a href="/games/${
                  next.gamedate
                }">${dayOfWeek} ${month} ${date.getDate()} at ${next.facility}
                </a>
              </p>
              <p class="c-p1">
                <ul class="list-none">
                <li class="mb-3"><span class="font-semibold">Cancellations:</span> ${listPlayers(
                  cancellations
                )}</li>
                <li class="mb-3"><span class="font-semibold">Spares:</span> ${listPlayers(
                  spares
                )}</li>
                <li class="mb-3"><span class="font-semibold">Goalies:</span> ${listPlayers(
                  goalies
                )}</li>
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
