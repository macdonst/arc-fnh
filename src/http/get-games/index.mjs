import arc from '@architect/functions'
import { getGames } from "@architect/shared/db/games.mjs"
import arcOauth from 'arc-plugin-oauth'
const auth = arcOauth.auth

export const handler = arc.http.async(auth, games)

async function games (req) {
  let games = await getGames()

  console.log(games)

  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8'
    },
    body: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Architect</title>
  <style>
     * { margin: 0; padding: 0; box-sizing: border-box; } body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; } .max-width-320 { max-width: 20rem; } .margin-left-8 { margin-left: 0.5rem; } .margin-bottom-16 { margin-bottom: 1rem; } .margin-bottom-8 { margin-bottom: 0.5rem; } .padding-32 { padding: 2rem; } .color-grey { color: #333; } .color-black-link:hover { color: black; }
  </style>
</head>
<body class="padding-32">
  <div class="max-width-320">
    <table>
      <thead>
        <tr><th>date</th><th>time</th><th>facility</th><th>actions</th></tr>
      </thead>
      <tbody>
        ${games.map(game => `<tr><td>${game.date}</td><td>${game.time}</td><td>${game.facility}</td><td><form method="post" action="/games/${game.date}"><button>update</button></form><form method="post" action="/games/${game.date}/delete"><button>delete</button></form></td></tr>`).join('')}
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
  </div>
</body>
</html>
`
  }
}
