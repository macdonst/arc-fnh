import arc from '@architect/functions'
import render from '@architect/views/render.mjs'
import { getSeasons } from '@architect/shared/db/seasons.mjs'
import arcOauth from 'arc-plugin-oauth'
const auth = arcOauth.auth

export const handler = arc.http.async(auth, players)

async function players(req) {
  const initialState = { account: req.session?.account }
  const seasons = await getSeasons()

  return {
    html: render(
      `
  <form method="POST" action="/seasons/delete">
    <hockey-page>
      <hockey-action-buttons direction="row-reverse">
        <hockey-button icon="delete">Delete</hockey-button>
        <hockey-action-button action="/seasons/add" icon="plus" label="Add" type="link" variant="default"></hockey-action-button>
      </hockey-action-buttons>

      <enhance-table>
          <enhance-thead>
            <enhance-tr>
              <enhance-th>&nbsp;</enhance-th>
              <enhance-th>Name</enhance-th>
              <enhance-th>Start Date</enhance-th>
              <enhance-th>End Date</enhance-th>
              <enhance-th class="unseen">Cost</enhance-th>
            </enhance-tr>
          </enhance-thead>
          <enhance-tbody>
            ${seasons
              .map(
                (season) =>
                  `<enhance-tr>
                    <enhance-td>
                      <input type="checkbox" name="todelete" class="leading5-l pt-3 pb-3 pl-1 pr-1 radius2 shadow-2" value="${season.seasonID}"/>
                    </enhance-td>
                    <enhance-td><a class="color-blue" href="/games?season=${season.seasonID}">${season.name}</a></enhance-td>
                    <enhance-td>${season.startDate}</enhance-td>
                    <enhance-td>${season.endDate}</enhance-td>
                    <enhance-td class="unseen">${season.cost}</enhance-td>
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
