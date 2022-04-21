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
        <hockey-action-button action="/players/add" icon="plus" label="Add" type="link" variant="default"></hockey-action-button>
      </hockey-action-buttons>

      <enhance-table>
          <enhance-thead>
            <enhance-tr><enhance-th>Name</enhance-th><enhance-th class="unseen">Email</enhance-th><enhance-th class="unseen">Phone</enhance-th><enhance-th>Position</enhance-th><enhance-th>Actions</enhance-th></enhance-tr>
          </enhance-thead>
          <enhance-tbody>
            ${players
              .map(
                (player) =>
                  `<enhance-tr>
                  <enhance-td><a href="/players/add?id=${player.email}">${
                    player.name
                  } ${
                    player.preferred === 'true'
                      ? `<hockey-icon icon="star" style="width: 1rem; height: 1rem; display: inline;"></hockey-icon>`
                      : ''
                  }</a></enhance-td>
                  <enhance-td class="unseen">${player.email}</enhance-td>
                  <enhance-td class="unseen">${player.phone}</enhance-td>
                  <enhance-td class="capitalize">${player.position}</enhance-td>
                  <enhance-td>
                    <hockey-action-buttons>
                      <hockey-action-button action="/players/add?id=${
                        player.email
                      }" icon="write" type="link"></hockey-action-button>
                      <hockey-action-button action="/players/${
                        player.email
                      }/delete" icon="delete"></hockey-action-button>
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
