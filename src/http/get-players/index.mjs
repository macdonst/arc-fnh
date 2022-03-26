import arc from '@architect/functions'
import render from '@architect/views/render.mjs'
import { getFulltimePlayers } from '@architect/shared/db/players.mjs'
import arcOauth from 'arc-plugin-oauth'
const auth = arcOauth.auth

export const handler = arc.http.async(auth, players)

async function players(req) {
  const fulltimePlayers = await getFulltimePlayers()
  const initialState = { account: req.session?.account }

  return {
    html: render(
      `
    <hockey-page>

    <hockey-table>
      <table>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Phone</th><th>Fulltime</th><th>Actions</th></tr>
        </thead>
        <tbody>
          ${fulltimePlayers
            .map(
              (player) =>
                `<tr>
                <td>${player.name}</td>
                <td>${player.email}</td>
                <td>${player.phone}</td>
                <td>${player.fulltime}</td>
                <td>
                  <hockey-action-buttons>
                    <hockey-action-button action="/players/${player.email}" label="write"></hockey-action-button>
                    <hockey-action-button action="/players/${player.email}/delete" label="delete"></hockey-action-button>
                  </hockey-action-buttons>
                </td>
              </tr>`
            )
            .join('')}
        </tbody>
      </table>
    </hockey-table>

    <form action="/players" method="post">
      <label for=name>name</label>
      <input type=text name=name required>
      <br/>
      <label for=name>email</label>
      <input type=text name=email required>
      <br/>
      <label for=name>phone</label>
      <input type=text name=phone required>
      <br/>
      <label for=name>fulltime</label>
      <input type="checkbox"name="fulltime">
      <br/>

      <button>save</button>
    </form>
    </hockey-page>
`,
      initialState
    )
  }
}
