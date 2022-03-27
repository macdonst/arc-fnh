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
      <hockey-action-buttons direction="row-reverse">
        <hockey-action-button action="/games/add" icon="plus" label="Add" type="link"></hockey-action-button>
      </hockey-action-buttons>
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
                    <td><a href="/games/add?id=${game.date}">${game.date}</a></td>
                    <td>${game.time}</td>
                    <td>${game.facility}</td>
                    <td>
                      <hockey-action-buttons>
                        <hockey-action-button action="/games/${game.date}/delete" icon="delete"></hockey-action-button>
                      </hockey-action-buttons>
                    </td>
                  </tr>`
              )
              .join('')}
          </tbody>
        <table>
      </hockey-table>
    </hockey-page>
  `,
      initialState
    )
  }
}
