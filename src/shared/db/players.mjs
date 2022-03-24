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

  let result = await db.players.put({
    email: player.email,
    name: player.name,
    phone: player.phone,
    fulltime: player.fulltime === 'on' ? 'true' : 'false'
  })

  return result
}

const getPlayers = async function (fulltime) {
  const db = await arc.tables()

  let fulltimePlayers = await db.players.query({
    IndexName: 'playersByFulltime',
    KeyConditionExpression: 'fulltime = :fulltime',
    ExpressionAttributeValues: { ':fulltime': fulltime }
  })

  return fulltimePlayers.Items
}

const getFulltimePlayers = async function () {
  return getPlayers('true')
}

const getSpares = async function () {
  return getPlayers('false')
}

export { deletePlayer, getFulltimePlayers, getSpares, upsertPlayer }
