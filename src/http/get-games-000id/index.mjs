import arc from '@architect/functions'
import render from '@architect/views/render.mjs'
import { getFulltimePlayers, getSpares } from '@architect/shared/db/players.mjs'
import arcOauth from 'arc-plugin-oauth'
import { getGame } from '@architect/shared/db/games.mjs'
const auth = arcOauth.auth

export const handler = arc.http.async(auth, gameStatus)

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
  console.log(spares)

  return {
    html: render(
      `
    <hockey-page>
      <div>
        <span>${dayOfWeek} ${month} ${date.getDate()} at ${game.facility}</span>
        <hockey-action-buttons direction="row-reverse">
          <hockey-action-button action="/players/add" icon="plus" label="Add" type="link"></hockey-action-button>
        </hockey-action-buttons>
      </div>
      <hockey-table>
        <table>
          <thead>
            <tr><th>Name</th><th>Position</th><th>Actions</th></tr>
          </thead>
          <tbody>
            ${[...skaters, ...goalies]
              .map(
                (player) =>
                  `<tr>
                  <td class="${
                    game?.cancellations.includes(player.email)
                      ? 'strikethrough'
                      : ''
                  }">${player.name}</td>
                  <td class="capitalize">${player.position}</td>
                  <td>
                    <hockey-action-buttons>
                      <hockey-action-button action="/games/${id}" icon="check">
                        <input type="hidden" name="player" value="${
                          player.email
                        }"/>
                        <input type="hidden" name="action" value="attend"/>
                      </hockey-action-button>
                      <hockey-action-button action="/games/${id}" icon="hyphen">
                        <input type="hidden" name="player" value="${
                          player.email
                        }"/>
                        <input type="hidden" name="action" value="skip"/>
                      </hockey-action-button>
                    </hockey-action-buttons>
                  </td>
                </tr>`
              )
              .join('')}
          </tbody>
        </table>
      </hockey-table>
    </hockey-page>
`,
      initialState
    )
  }
}
