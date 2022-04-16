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

      <hockey-table>
        <table>
          <thead>
            <tr><th>Name</th><th>Start Date</th><th>End Date</th><th>Cost</th><th>Actions</th></tr>
          </thead>
          <tbody>
            ${seasons
              .map(
                (season) =>
                  `<tr>
                  <td><a href="/games?season=${season.seasonID}">${season.name}</a></td>
                  <td>${season.startDate}</td>
                  <td>${season.endDate}</td>
                  <td>${season.cost}</td>
                  <td>
                    <hockey-action-buttons>
                      <hockey-action-button action="/seasons/add?id=${season.seasonID}" icon="write" type="link"></hockey-action-button>
                      <hockey-action-button action="/seasons/${season.seasonID}/delete" icon="delete"></hockey-action-button>
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
