// import arc from "@architect/functions"
import { getGames } from "@architect/shared/db/games.mjs"

export async function handler (req) {
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
        ${games.map(game => `<tr><td>${game.date}</td><td>${game.time}</td><td>${game.facility}</td><td><form method="post" action="/players/${game.date}"><button>update</button></form><form method="post" action="/players/${game.date}/delete"><button>delete</button></form></td></tr>`).join('')}
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
  </div>
</body>
</html>
`
  }
}
