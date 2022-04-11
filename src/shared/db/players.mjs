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
  player.fulltime =
    player.fulltime === 'on' || player.fulltime === 'true' ? 'true' : 'false'

  let result = await db.players.put(player)

  return result
}

const getPlayer = async function (id) {
  const db = await arc.tables()

  let game = await db.players.get({ email: id })

  return game
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

const getPlayerInfo = async function (players = []) {
  return Promise.all(players.map((player) => getPlayer(player)))
}

const getGoalies = async function (cancellations = [], spares = []) {
  const players = await getFulltimePlayers()
  const goalies = players.filter(
    (player) =>
      player.position === 'goalie' && !cancellations.includes(player.email)
  )
  spares.forEach(function (spare) {
    if (spare?.position === 'goalie') {
      goalies.push(spare)
    }
  })
  return goalies
}

const listPlayersNames = function (players = []) {
  return players
    .filter((player) => player !== undefined)
    .map((player) => player?.name)
    .join(', ')
}

export {
  deletePlayer,
  getPlayer,
  getFulltimePlayers,
  getSpares,
  upsertPlayer,
  getPlayerInfo,
  getGoalies,
  listPlayersNames
}
