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
    <hockey-page>
      <hockey-action-buttons direction="row-reverse">
        <hockey-action-button action="/seasons/add" icon="plus" label="Add" type="link" variant="default"></hockey-action-button>
      </hockey-action-buttons>

      <enhance-table>
          <enhance-thead>
            <enhance-tr>
              <enhance-th>Name</enhance-th>
              <enhance-th>Start Date</enhance-th>
              <enhance-th>End Date</enhance-th>
              <enhance-th class="unseen">Cost</enhance-th>
              <enhance-th>Actions</enhance-th>
            </enhance-tr>
          </enhance-thead>
          <enhance-tbody>
            ${seasons
              .map(
                (season) =>
                  `<enhance-tr>
                  <enhance-td><a class="color-blue" href="/games?season=${season.seasonID}">${season.name}</a></enhance-td>
                  <enhance-td>${season.startDate}</enhance-td>
                  <enhance-td>${season.endDate}</enhance-td>
                  <enhance-td class="unseen">${season.cost}</enhance-td>
                  <enhance-td>
                    <hockey-action-buttons>
                      <hockey-action-button action="/seasons/add?id=${season.seasonID}" icon="write" type="link"></hockey-action-button>
                      <hockey-action-button action="/seasons/${season.seasonID}/delete" icon="delete"></hockey-action-button>
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
