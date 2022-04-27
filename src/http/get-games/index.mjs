import arc from '@architect/functions'
import render from '@architect/views/render.mjs'
import { getGames, getGamesBySeason } from '@architect/shared/db/games.mjs'
import { getSeason } from '@architect/shared/db/seasons.mjs'
import arcOauth from 'arc-plugin-oauth'
const auth = arcOauth.auth

export const handler = arc.http.async(auth, games)

async function games(req) {
  const { season } = req.query
  const seasonObj = await getSeason(season)
  const games = season ? await getGamesBySeason(season) : await getGames()
  const initialState = { account: req.session?.account }

  return {
    html: render(
      `
  <form method="POST" action="/games/delete">
    <input type="hidden" name="season" value="${season}"/>
    <hockey-page>
      <h1 class="mb-3 fw-medium fs1 c-p1 text1 color-darkest">${
        seasonObj.name
      }</h1>
      <hockey-action-buttons direction="row-reverse">
        <hockey-button icon="delete">Delete</hockey-button>
        <hockey-action-button action="/seasons/add?id=${
          seasonObj.seasonID
        }" icon="write" label="Edit" type="link" variant="default">Edit</hockey-action-button>
        <hockey-action-button action="/games/add" icon="plus" label="Add" type="link" variant="default"></hockey-action-button>
      </hockey-action-buttons>
      <enhance-table>
          <enhance-thead>
            <enhance-tr>
              <enhance-th width="1rem">&nbsp;</enhance-th>
              <enhance-th>Date</enhance-th>
              <enhance-th>Time</enhance-th>
              <enhance-th>Facility</enhance-th>
            </enhance-tr>
          </enhance-thead>
          <enhance-tbody>
            ${games
              .map(
                (game) =>
                  `<enhance-tr>
                  <enhance-td>
                  <input type="checkbox" name="todelete" class="leading5-l pt-3 pb-3 pl-1 pr-1 radius2 shadow-2" value="${game.gamedate}"/>
                </enhance-td>
                <enhance-td><a class="color-blue" href="/games/${game.gamedate}">${game.gamedate}</a></enhance-td>
                    <enhance-td>${game.time}</enhance-td>
                    <enhance-td>${game.facility}</enhance-td>
                  </enhance-tr>`
              )
              .join('')}
          </enhance-tbody>
      </enhance-table>
    </hockey-page>
  </form>
  `,
      initialState
    )
  }
}
