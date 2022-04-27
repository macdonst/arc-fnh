import arc from '@architect/functions'
import render from '@architect/views/render.mjs'
import { getFulltimePlayers, getSpares } from '@architect/shared/db/players.mjs'
import arcOauth from 'arc-plugin-oauth'
import { getGame } from '@architect/shared/db/games.mjs'
const auth = arcOauth.auth

export const handler = arc.http.async(auth, gameStatus)

function createSelectBox(spares, currentSpare) {
  return `<select name="spares" class="leading5-l pt-3 pb-3 pl-1 pr2  radius2 shadow-2">
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
      <h1 class="mb-3 fw-medium fs1 c-p1 text1 color-darkest">${dayOfWeek} ${month} ${date.getDate()} at ${
        game.facility
      }</h1>
      <form form method="post" action="/games/${id}">
        <hockey-action-buttons direction="row-reverse">
          <hockey-button icon="save">Save</hockey-button>
          <hockey-action-button action="/games/add?id=${id}" icon="write" label="Edit" type="link" variant="default" >Edit</hockey-action-button>
        </hockey-action-buttons>
        <enhance-table>
            <enhance-thead>
              <enhance-tr><enhance-th>Name</enhance-th><enhance-th class="unseen">Position</enhance-th><enhance-th>Away</enhance-th><enhance-th>Spare</enhance-th></enhance-tr>
            </enhance-thead>
            <enhance-tbody>
              ${[...skaters, ...goalies]
                .map(function (player) {
                  const cancelled = game.cancellations?.includes(player.email)
                  const spare = cancelled ? game.spares?.shift() : ''
                  return `<enhance-tr>
                    <enhance-td class="${cancelled ? 'strikethrough' : ''}">
                      ${player.name}
                    </enhance-td>
                    <enhance-td class="capitalize unseen">
                      ${player.position}
                    </enhance-td>
                    <enhance-td>
                      <input type="checkbox" name="cancellations" class="leading5-l pt-3 pb-3 pl-1 pr-1 radius2 shadow-2" value="${
                        player.email
                      }" ${cancelled ? 'checked' : ''}/>
                    </enhance-td>
                    <enhance-td>
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
                    </enhance-td>
                  </enhance-tr>`
                })
                .join('')}
            </enhance-tbody>
          </enhance-table>
      <form>

    </hockey-page>
`,
      initialState
    )
  }
}
