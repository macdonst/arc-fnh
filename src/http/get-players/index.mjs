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
    <form method="POST" action="/players/delete">
      <hockey-page>
        <hockey-action-buttons direction="row-reverse">
          <hockey-button icon="delete">Delete</hockey-button>
          <hockey-action-button action="/players/add" icon="plus" label="Add" type="link" variant="default"></hockey-action-button>
        </hockey-action-buttons>

        <enhance-table>
            <enhance-thead>
              <enhance-tr><enhance-th width="1rem">&nbsp;</enhance-th><enhance-th>Name</enhance-th><enhance-th class="unseen">Email</enhance-th><enhance-th class="unseen">Phone</enhance-th><enhance-th>Position</enhance-th></enhance-tr>
            </enhance-thead>
            <enhance-tbody>
              ${players
                .map(
                  (player) =>
                    `<enhance-tr>
                    <enhance-td>
                      <input type="checkbox" name="todelete" class="leading5-l pt-3 pb-3 pl-1 pr-1 radius2 shadow-2" value="${
                        player.email
                      }"/>
                    </enhance-td>
                    <enhance-td><a class="color-blue" href="/players/add?id=${
                      player.email
                    }">${player.name} ${
                      player.preferred === 'true'
                        ? `<hockey-icon icon="star" style="width: 1rem; height: 1rem; display: inline;"></hockey-icon>`
                        : ''
                    }</a></enhance-td>
                    <enhance-td class="unseen">${player.email}</enhance-td>
                    <enhance-td class="unseen">${player.phone}</enhance-td>
                    <enhance-td class="capitalize">${
                      player.position
                    }</enhance-td>
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
