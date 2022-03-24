import arc from '@architect/functions'

const getGames = async function () {
  const db = await arc.tables()

  let games = await db.games.scan()

  return games.Items
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

export { deleteGame, getGames, upsertGame }
