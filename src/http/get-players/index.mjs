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
    <table>
      <thead>
        <tr><th>name</th><th>email</th><th>phone</th><th>fulltime</th><th>actions</th></tr>
      </thead>
      <tbody>
        ${fulltimePlayers
          .map(
            (player) =>
              `<tr><td>${player.name}</td><td>${player.email}</td><td>${player.phone}</td><td>${player.fulltime}</td><td><form method="post" action="/players/${player.email}"><button>update</button></form><form method="post" action="/players/${player.email}/delete"><button>delete</button></form></td></tr>`
          )
          .join('')}
      </tbody>
    <table>
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
