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
    <table>
      <thead>
        <tr><th>date</th><th>time</th><th>facility</th><th>actions</th></tr>
      </thead>
      <tbody>
        ${games
          .map(
            (game) =>
              `<tr><td>${game.date}</td><td>${game.time}</td><td>${game.facility}</td><td><form method="post" action="/games/${game.date}"><button>update</button></form><form method="post" action="/games/${game.date}/delete"><button>delete</button></form></td></tr>`
          )
          .join('')}
      </tbody>
    <table>
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
