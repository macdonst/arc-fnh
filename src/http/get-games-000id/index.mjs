import arc from '@architect/functions'
import render from '@architect/views/render.mjs'
import { getFulltimePlayers, getSpares } from '@architect/shared/db/players.mjs'
import arcOauth from 'arc-plugin-oauth'
import { getGame } from '@architect/shared/db/games.mjs'
const auth = arcOauth.auth

export const handler = arc.http.async(auth, gameStatus)

function createSelectBox(spares, currentSpare) {
  return `<select name="spares">
      <option value="none" ${
        currentSpare === 'none' ? 'selected' : ''
      }>No Spare</option>
      ${spares
        .map(
          (spare) =>
            `<option value="${spare.email}" ${
              currentSpare === spare.email ? 'selected' : ''
            }>${spare.name}</option>`
        )
        .join('')}
    </select>
  `
}

async function gameStatus(req) {
  const initialState = { account: req.session?.account }
  const id = req.pathParameters?.id
  const game = await getGame(id)
  const date = new Date(game.gamedate)
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' })
  const month = date.toLocaleDateString('en-US', { month: 'long' })

  const players = await getFulltimePlayers()
  const skaters = players.filter((player) => player.position !== 'goalie')
  const goalies = players.filter((player) => player.position === 'goalie')
  const spares = await getSpares()
  const spareSkaters = spares.filter((player) => player.position !== 'goalie')
  const spareGoalies = spares.filter((player) => player.position === 'goalie')

  return {
    html: render(
      `
    <hockey-page>
      <div>
        <span>${dayOfWeek} ${month} ${date.getDate()} at ${game.facility}</span>
      </div>
      <form form method="post" action="/games/${id}">
        <hockey-table>
          <table>
            <thead>
              <tr><th>Name</th><th>Position</th><th>Away</th><th>Spare</th></tr>
            </thead>
            <tbody>
              ${[...skaters, ...goalies]
                .map(function (player) {
                  const cancelled = game.cancellations?.includes(player.email)
                  const spare = cancelled ? game.spares?.shift() : ''
                  return `<tr>
                    <td class="${cancelled ? 'strikethrough' : ''}">
                      ${player.name}
                    </td>
                    <td class="capitalize">
                      ${player.position}
                    </td>
                    <td>
                      <input type="checkbox" name="cancellations" value="${
                        player.email
                      }" ${cancelled ? 'checked' : ''}/>
                    </td>
                    <td>
                      ${
                        cancelled && player.position !== 'goalie'
                          ? createSelectBox(spareSkaters, spare)
                          : ''
                      }
                      ${
                        cancelled && player.position === 'goalie'
                          ? createSelectBox(spareGoalies, spare)
                          : ''
                      }
                    </td>
                  </tr>`
                })
                .join('')}
            </tbody>
          </table>
          <hockey-save-button></hockey-save-button>
        </hockey-table>
      <form>

    </hockey-page>
`,
      initialState
    )
  }
}
