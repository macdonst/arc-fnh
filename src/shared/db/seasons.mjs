import arc from '@architect/functions'
import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('1234567890bcdfghjklmnpqrstvwz', 8) // locase no vowels

const deleteSeason = async function (id) {
  const db = await arc.tables()

  let result = await db.seasons.delete({
    seasonID: id
  })

  return result
}

const upsertSeason = async function (season) {
  const db = await arc.tables()

  if (!season.seasonID) {
    season.seasonID = `season-${nanoid()}`
  }

  let result = await db.seasons.put(season)

  return result
}

const getSeason = async function (id) {
  const db = await arc.tables()

  let season = await db.seasons.get({ seasonID: id })

  return season
}

const getSeasons = async function () {
  const db = await arc.tables()

  let seasons = await db.seasons.scan()

  return seasons.Items
}

export { deleteSeason, getSeason, getSeasons, upsertSeason }
