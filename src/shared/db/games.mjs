import arc from '@architect/functions'

const getGame = async function (id) {
  const db = await arc.tables()

  let game = await db.games.get({ date: id })

  return game
}

const getGames = async function () {
  const db = await arc.tables()

  let games = await db.games.scan()

  return games.Items.sort((a, b) => new Date(a.date) - new Date(b.date))
}

const upsertGame = async function (game) {
  const db = await arc.tables()

  let result = await db.games.put(game)

  return result
}

const deleteGame = async function (id) {
  const db = await arc.tables()

  let result = await db.games.delete({
    date: id
  })

  return result
}

export { deleteGame, getGame, getGames, upsertGame }
