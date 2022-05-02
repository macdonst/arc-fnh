import arc from '@architect/functions'
import {
  getCurrentInvites,
  upsertInvite
} from '@architect/shared/db/invites.mjs'
import {
  getPreferredSpares,
  numberOfSparesNeeded
} from '@architect/shared/db/players.mjs'

async function queryPreferredSpares(currentInvites) {
  return (await getPreferredSpares()).filter((spare) => {
    return !currentInvites.find((invite) => {
      return invite.email === spare.email
    })
  })
}

async function findSpares(event) {
  let { game } = event
  console.log(game)

  const sparesNeeded = await numberOfSparesNeeded(game)

  console.log(sparesNeeded)

  if (sparesNeeded.skaters > 0) {
    /*
      1. check if invite has been sent
        - query for invites that are not expired
      2. if not add an invite to db
        - search for preferred spares
        - find one that hasn't been invited
        - add invite to db
      3. send an email
        - send an email invite with info
        - With a link for folks to accept or reject
     */
    // convert game time to timestamp
    const gameTime = new Date(`${game.gamedate} ${game.time}:00`).getTime()
    // get all invites sent for the game
    const currentInvites = await getCurrentInvites(gameTime)

    // do we need to invite anyone
    if (currentInvites.length < sparesNeeded.skaters) {
      const invitesNeeded = sparesNeeded.skaters - currentInvites.length
      console.log(invitesNeeded)

      const spares = await queryPreferredSpares(currentInvites)

      for (let i = 0; i < invitesNeeded; i++) {
        if (spares.length > 0) {
          let spare = spares.pop()
          await upsertInvite({
            email: spare.email,
            expiresAt: gameTime
          })
        }
      }

      console.log(spares)
    }
  }

  return
}

export const handler = arc.events.subscribe(findSpares)
