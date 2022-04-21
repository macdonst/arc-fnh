import arc from '@architect/functions'
import { numberOfSparesNeeded } from '@architect/shared/db/players.mjs'

async function findSpares(event) {
  let { game } = event
  console.log(game)

  const sparesNeeded = await numberOfSparesNeeded(game)

  console.log(sparesNeeded)

  return
}

export const handler = arc.events.subscribe(findSpares)
