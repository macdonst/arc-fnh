import arc from '@architect/functions'
import render from '@architect/views/render.mjs'
import { getGames, getGamesBySeason } from '@architect/shared/db/games.mjs'
import arcOauth from 'arc-plugin-oauth'
const auth = arcOauth.auth

export const handler = arc.http.async(auth, games)

async function games(req) {
  const { season } = req.query
  const games = season ? await getGamesBySeason(season) : await getGames()
  const initialState = { account: req.session?.account }

  return {
    html: render(
      `
    <hockey-page>
      <hockey-action-buttons direction="row-reverse">
        <hockey-action-button action="/games/add" icon="plus" label="Add" type="link" variant="default"></hockey-action-button>
      </hockey-action-buttons>
      <enhance-table>
          <enhance-thead>
            <enhance-tr><enhance-th>Date</enhance-th><enhance-th>Time</enhance-th><enhance-th>Facility</enhance-th><enhance-th>Actions</enhance-th></enhance-tr>
          </enhance-thead>
          <enhance-tbody>
            ${games
              .map(
                (game) =>
                  `<enhance-tr>
                    <enhance-td><a href="/games/${game.gamedate}">${game.gamedate}</a></enhance-td>
                    <enhance-td>${game.time}</enhance-td>
                    <enhance-td>${game.facility}</enhance-td>
                    <enhance-td>
                      <hockey-action-buttons>
                        <hockey-action-button action="/games/add?id=${game.gamedate}" icon="write" type="link"></hockey-action-button>
                        <hockey-action-button action="/games/${game.gamedate}/delete" icon="delete"></hockey-action-button>
                      </hockey-action-buttons>
                    </enhance-td>
                  </enhance-tr>`
              )
              .join('')}
          </enhance-tbody>
      </enhance-table>
    </hockey-page>
  `,
      initialState
    )
  }
}
