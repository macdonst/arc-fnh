import arc from '@architect/functions'
import render from '@architect/views/render.mjs'
import {
  getFulltimePlayers,
  getPlayerInfo,
  getPlayer,
  getSpares
} from '@architect/shared/db/players.mjs'
import arcOauth from 'arc-plugin-oauth'
import { getGame } from '@architect/shared/db/games.mjs'
import { getCurrentInvites } from '@architect/shared/db/invites.mjs'
import { dateToEnglish } from '@architect/shared/utils.mjs'

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
  const { dayOfWeek, month, dayOfMonth } = dateToEnglish(game)

  const players = await getFulltimePlayers()
  const skaters = players.filter((player) => player.position !== 'goalie')
  const goalies = players.filter((player) => player.position === 'goalie')
  const spares = await getSpares()
  const spareSkaters = spares.filter((player) => player.position !== 'goalie')
  const spareGoalies = spares.filter((player) => player.position === 'goalie')
  const cancellations = await getPlayerInfo(game.cancellations)
  const declined = await getPlayerInfo(game.declined)
  const invites = await getCurrentInvites(game)
  const invited = await Promise.all(
    invites.map((invite) => getPlayer(invite.email))
  )

  return {
    html: render(
      `
    <hockey-page>
      <h1 class="mb-3 fw-medium fs1 c-p1 text1 color-darkest">${dayOfWeek} ${month} ${dayOfMonth} at ${
        game.facility
      }</h1>
      <form form method="post" action="/games/${id}">
        <hockey-action-buttons direction="row-reverse">
          <hockey-button icon="save">Save</hockey-button>
          <hockey-action-button action="/games/add?id=${id}" icon="write" label="Edit" type="link" variant="default">Edit</hockey-action-button>
        </hockey-action-buttons>
        <div class="grid row-auto col-2 gap-1">
          <div>
          <h2 class="mb-3 fw-medium font-bold c-p1 text0 color-darkest">Players</h2>
            <enhance-table>
                <enhance-thead>
                  <enhance-tr><enhance-th>Name</enhance-th><enhance-th class="unseen">Pos</enhance-th><enhance-th>Away</enhance-th></enhance-tr>
                </enhance-thead>
                <enhance-tbody>
                  ${[...skaters, ...goalies]
                    .map(function (player) {
                      const cancelled = game.cancellations?.includes(
                        player.email
                      )
                      return `<enhance-tr>
                        <enhance-td class="${cancelled ? 'strikethrough' : ''}">
                          ${player.name}
                        </enhance-td>
                        <enhance-td class="capitalize unseen">
                          ${player.position[0]}
                        </enhance-td>
                        <enhance-td>
                          <input type="checkbox" name="cancellations" class="leading5-l pt-3 pb-3 pl-1 pr-1 radius2 shadow-2" value="${
                            player.email
                          }" ${cancelled ? 'checked' : ''}/>
                        </enhance-td>
                      </enhance-tr>`
                    })
                    .join('')}
                </enhance-tbody>
              </enhance-table>
            </div>
            <div>
              <h2 class="mb-3 fw-medium font-bold c-p1 text0 color-darkest">Spares</h2>
              <enhance-table class="mb0">
                <enhance-thead>
                  <enhance-tr><enhance-th width="80%">Name</enhance-th><enhance-th class="unseen">Pos</enhance-th></enhance-tr>
                </enhance-thead>
                <enhance-tbody>
                  ${
                    cancellations.length > 0
                      ? cancellations
                          .map((cancellation) => {
                            const spare = game.spares?.shift() || ''
                            return `<enhance-tr>
                    <enhance-td>
                      ${
                        cancellation.position !== 'goalie'
                          ? createSelectBox(spareSkaters, spare)
                          : createSelectBox(spareGoalies, spare)
                      }
                    </enhance-td>
                    <enhance-td class="capitalize unseen">${
                      cancellation.position[0]
                    }</enhance-td>
                  </enhance-tr>`
                          })
                          .join('')
                      : '<enhance-tr><enhance-td>No Cancellations</enhance-td></enhance-tr>'
                  }
                </enhance-tbody>
              </enhance-table>
              <h2 class="mb-3 fw-medium font-bold c-p1 text0 color-darkest">Invitations</h2>
              <enhance-table class="mb0">
                <enhance-thead>
                  <enhance-tr><enhance-th width="80%">Name</enhance-th><enhance-th class="unseen">Pos</enhance-th></enhance-tr>
                </enhance-thead>
                <enhance-tbody>
                ${
                  invited.length > 0
                    ? invited
                        .map((player) => {
                          return `<enhance-tr>
                  <enhance-td>
                    ${player.name}
                  </enhance-td>
                  <enhance-td class="capitalize unseen">${player.position[0]}</enhance-td>
                </enhance-tr>`
                        })
                        .join('')
                    : '<enhance-tr><enhance-td>No Invites</enhance-td></enhance-tr>'
                }
                </enhance-tbody>
              </enhance-table>
              <h2 class="mb-3 fw-medium font-bold c-p1 text0 color-darkest">Declined</h2>
              <enhance-table class="mb0">
                <enhance-thead>
                  <enhance-tr><enhance-th width="80%">Name</enhance-th><enhance-th class="unseen">Pos</enhance-th></enhance-tr>
                </enhance-thead>
                <enhance-tbody>
                ${
                  declined.length > 0
                    ? declined
                        .map((player) => {
                          return `<enhance-tr>
                  <enhance-td>
                    ${player.name}
                  </enhance-td>
                  <enhance-td class="capitalize unseen">${player.position[0]}</enhance-td>
                </enhance-tr>`
                        })
                        .join('')
                    : '<enhance-tr><enhance-td>Nobody Declined</enhance-td></enhance-tr>'
                }
                </enhance-tbody>
              </enhance-table>
            </div>
            </div>
        <form>

    </hockey-page>
`,
      initialState
    )
  }
}
