import arc from '@architect/functions'
import {
  getCurrentInvites,
  upsertInvite
} from '@architect/shared/db/invites.mjs'
import {
  getPreferredSpares,
  numberOfSparesNeeded
} from '@architect/shared/db/players.mjs'
import { dateToEnglish, getHostname } from '@architect/shared/utils.mjs'

async function queryPreferredSpares(currentInvites) {
  return (await getPreferredSpares()).filter((spare) => {
    return !currentInvites.find((invite) => {
      return invite.email === spare.email
    })
  })
}

async function findSpares(event) {
  let { game } = event

  const sparesNeeded = await numberOfSparesNeeded(game)

  console.log('sparesNeeded', sparesNeeded)

  if (sparesNeeded.skaters > 0) {
    // convert game time to timestamp
    const gameTime = new Date(`${game.gamedate} ${game.time}:00`).getTime()
    // get all invites sent for the game
    const currentInvites = await getCurrentInvites(gameTime)

    // do we need to invite anyone
    if (currentInvites.length < sparesNeeded.skaters) {
      const invitesNeeded = sparesNeeded.skaters - currentInvites.length
      console.log('invitesNeeded', invitesNeeded)

      const spares = await queryPreferredSpares(currentInvites)

      console.log('spares', spares)

      const englishDate = dateToEnglish(game)

      console.log(game)

      let count = 0
      while (spares.length > 0 && count < invitesNeeded) {
        let spare = spares.pop()
        if (
          !game.declined?.includes(spare.email) &&
          !game.spares?.includes(spare.email)
        ) {
          console.log('inviting', spare.email)
          count++
          const invite = await upsertInvite({
            email: spare.email,
            gameID: game.gamedate,
            expiresAt: gameTime
          })
          // send email at this point
          await arc.events.publish({
            name: 'send-email',
            payload: {
              to: spare.email,
              subject: createSubject({
                ...englishDate,
                facility: game.facility
              }),
              body: createBody({
                spare,
                ...englishDate,
                facility: game.facility,
                inviteID: invite.inviteID
              })
            }
          })
        }
      }
    }
  }

  return
}

function createSubject({ dayOfWeek, month, dayOfMonth, time, facility }) {
  return `Spare ${dayOfWeek} ${month} ${dayOfMonth} ${time} at ${facility}`
}

function createBody({
  spare,
  dayOfWeek,
  month,
  dayOfMonth,
  time,
  facility,
  inviteID
}) {
  const hostname = getHostname()
  let body = `<p>Hey ${spare.name.split(' ')[0]},</p>
<p>I need a spare for our game on ${dayOfWeek} ${month} ${dayOfMonth} at the ${facility} with a start time of ${time}. The spare fee is $15.</p>
<p>Lemme know if you want to play.</p>
<ul>
<li><a href="${hostname}invite/${inviteID}?attend=yes">Yes, I can play!</a></li>
<li><a href="${hostname}invite/${inviteID}?attend=no">No, I can't make it this week.</a></li>
</ul>
<p>Simon Mac Donald<br/>
http://simonmacdonald.com</p>`

  return body
}

export const handler = arc.events.subscribe(findSpares)
