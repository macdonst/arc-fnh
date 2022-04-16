import arc from '@architect/functions'

const getGame = async function (id) {
  const db = await arc.tables()

  let game = await db.games.get({ gamedate: id })

  return game
}

const getNextGame = async function () {
  const now = new Date(
    new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York'
    })
  )

  // date time in YYYY-MM-DD format
  let todaysDate =
    now.getFullYear() +
    '-' +
    ('0' + (now.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + now.getDate()).slice(-2)

  const db = await arc.tables()

  let games = await db.games.scan({
    FilterExpression: 'gamedate >= :gamedate',
    ExpressionAttributeValues: { ':gamedate': todaysDate }
  })

  return games.Items.sort(
    (a, b) => new Date(a.gamedate) - new Date(b.gamedate)
  )[0]
}

const getGames = async function () {
  const db = await arc.tables()

  let games = await db.games.scan()

  return games.Items.sort((a, b) => new Date(a.gamedate) - new Date(b.gamedate))
}

const upsertGame = async function (game) {
  const db = await arc.tables()

  let result = await db.games.put(game)

  return result
}

const deleteGame = async function (id) {
  const db = await arc.tables()

  let result = await db.games.delete({
    gamedate: id
  })

  return result
}

export { deleteGame, getGame, getGames, getNextGame, upsertGame }
