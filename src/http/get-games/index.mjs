import arc from '@architect/functions'
import render from '@architect/views/render.mjs'
import { getGames } from '@architect/shared/db/games.mjs'
import arcOauth from 'arc-plugin-oauth'
const auth = arcOauth.auth

export const handler = arc.http.async(auth, games)

async function games(req) {
  const games = await getGames()
  const initialState = { account: req.session?.account }

  return {
    html: render(
      `
    <hockey-page>
    <hockey-table>
      <table>
        <thead>
          <tr><th>Date</th><th>Time</th><th>Facility</th><th>Actions</th></tr>
        </thead>
        <tbody>
          ${games
            .map(
              (game) =>
                `<tr>
                  <td>${game.date}</td>
                  <td>${game.time}</td>
                  <td>${game.facility}</td>
                  <td>
                    <hockey-action-buttons>
                      <hockey-action-button action="/games/${game.date}" label="write"></hockey-action-button>
                      <hockey-action-button action="/games/${game.date}/delete" label="delete"></hockey-action-button>
                    </hockey-action-buttons>
                  </td>
                </tr>`
            )
            .join('')}
        </tbody>
      <table>
    </hockey-table>

    <form action="/games" method="post">
      <label for=name>date</label>
      <input type=text name=date required>
      <br/>
      <label for=name>time</label>
      <input type=text name=time required>
      <br/>
      <label for=name>facility</label>
      <input type=text name=facility required>
      <br/>

      <button>save</button>
    </form>
    </hockey-page>
  `,
      initialState
    )
  }
}
