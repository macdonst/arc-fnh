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
    const currentInvites = await getCurrentInvites(game)

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
<p>I need a spare for our game on ${dayOfWeek} ${month} ${dayOfMonth} at the ${facility} with a start time of ${time}. The spare fee is $20.</p>
<p>Lemme know if you want to play.</p>
<p>${createEmailButton(
    'Yes, I can play!',
    `${hostname}invite/${inviteID}?attend=yes`,
    `rgb(16, 113, 84)`
  )}</p>
<p>${createEmailButton(
    `No, I can't make it this week.`,
    `${hostname}invite/${inviteID}?attend=no`,
    `rgb(187, 18, 26)`
  )}</p>
<p>Simon Mac Donald<br/>
http://simonmacdonald.com</p>`

  return body
}

function createEmailButton(text, url, color = '#1F7F4C') {
  return `<table border="0" cellspacing="0" cellpadding="0" width="290px">
  <tr>
      <td align="center" style="border-radius: 5px; background-color: ${color};">
          <a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-weight: bold; text-decoration: none;border-radius: 5px; padding: 12px 18px; border: 1px solid ${color}; display: inline-block;">${text}</a>
      </td>
  </tr>
</table>`
}

export const handler = arc.events.subscribe(findSpares)
