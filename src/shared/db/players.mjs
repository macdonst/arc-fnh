import arc from '@architect/functions'

const deletePlayer = async function (id) {
  const db = await arc.tables()

  let result = await db.players.delete({
    email: id
  })

  return result
}

const upsertPlayer = async function (player) {
  const db = await arc.tables()
  player.fulltime = player.fulltime === 'on' ? 'true' : 'false'

  let result = await db.players.put(player)

  return result
}

const getPlayers = async function (fulltime) {
  const db = await arc.tables()

  let fulltimePlayers = await db.players.query({
    IndexName: 'playersByFulltime',
    KeyConditionExpression: 'fulltime = :fulltime',
    ExpressionAttributeValues: { ':fulltime': fulltime }
  })

  return fulltimePlayers.Items.sort((a, b) => {
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name) {
      return 1
    }
    return 0
  })
}

const getFulltimePlayers = async function () {
  return getPlayers('true')
}

const getSpares = async function () {
  return getPlayers('false')
}

export { deletePlayer, getFulltimePlayers, getSpares, upsertPlayer }
