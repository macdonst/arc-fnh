import arc from '@architect/functions'

const getGame = async function (id) {
  const db = await arc.tables()

  let game = await db.games.get({ gamedate: id })

  return game
}

const getNextGame = async function () {
  const todaysDate = new Date().toISOString().slice(0, 10)

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
