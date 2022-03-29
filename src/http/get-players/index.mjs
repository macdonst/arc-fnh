import arc from '@architect/functions'
import render from '@architect/views/render.mjs'
import { getFulltimePlayers, getSpares } from '@architect/shared/db/players.mjs'
import arcOauth from 'arc-plugin-oauth'
const auth = arcOauth.auth

export const handler = arc.http.async(auth, players)

async function players(req) {
  const { type = 'fulltime' } = req.query
  const players =
    type === 'fulltime' ? await getFulltimePlayers() : await getSpares()
  const initialState = { account: req.session?.account }

  return {
    html: render(
      `
    <hockey-page>
      <hockey-action-buttons direction="row-reverse">
        <hockey-action-button action="/players/add" icon="plus" label="Add" type="link"></hockey-action-button>
      </hockey-action-buttons>

      <hockey-table>
        <table>
          <thead>
            <tr><th>Name</th><th>Email</th><th>Phone</th><th>Position</th><th>Actions</th></tr>
          </thead>
          <tbody>
            ${players
              .map(
                (player) =>
                  `<tr>
                  <td><a href="/players/add?id=${player.email}">${player.name}</a></td>
                  <td>${player.email}</td>
                  <td>${player.phone}</td>
                  <td class="capitalize">${player.position}</td>
                  <td>
                    <hockey-action-buttons>
                      <hockey-action-button action="/players/add?id=${player.email}" icon="write" type="link"></hockey-action-button>
                      <hockey-action-button action="/players/${player.email}/delete" icon="delete"></hockey-action-button>
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
