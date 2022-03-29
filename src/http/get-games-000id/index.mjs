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

  // change this entire thing to one giant form.
  // submit the whole thing in one shot
  //
  // player name with hidden player email input, checkbox to see if they are playing,
  // select box for the spare if they can't make it
  // one save button at the bottom

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
                    <td></td>
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
