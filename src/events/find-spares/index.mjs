import arc from '@architect/functions'
import {
  getCurrentInvites,
  upsertInvite
} from '@architect/shared/db/invites.mjs'
import {
  getPreferredSpares,
  numberOfSparesNeeded
} from '@architect/shared/db/players.mjs'
import { authenticate } from '@architect/shared/google/index.mjs'
import nodemailer from 'nodemailer'
import { dateToEnglish } from '@architect/shared/utils.mjs'

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

      const englishDate = dateToEnglish(game)

      for (let i = 0; i < invitesNeeded; i++) {
        if (spares.length > 0) {
          let spare = spares.pop()
          await upsertInvite({
            email: spare.email,
            expiresAt: gameTime
          })
          // send email at this point
          await sendEmail({
            to: spare.email,
            subject: createSubject({
              ...englishDate,
              facility: game.facility
            }),
            body: createBody({
              spare,
              ...englishDate,
              facility: game.facility
            })
          })
        }
      }

      console.log(spares)
    }
  }

  return
}

function createSubject({ dayOfWeek, month, dayOfMonth, time, facility }) {
  return `Spare ${dayOfWeek} ${month} ${dayOfMonth} ${time} at ${facility}`
}

function createBody({ spare, dayOfWeek, month, dayOfMonth, time, facility }) {
  let body = `<p>Hey ${spare.name.split(' ')[0]},</p>
<p>I need a spare for our game on ${dayOfWeek} ${month} ${dayOfMonth} at the ${facility} with a start time of ${time}. The spare fee is $15.</p>
<p>Lemme know if you want to play.</p>
<p>Simon Mac Donald<br/>
http://simonmacdonald.com</p>`

  return body
}

async function sendEmail({ to = '', subject = '', body = '' }) {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const refresh_token = process.env.GOOGLE_REFRESH_TOKEN
  const mailUser = process.env.MAIL_USER

  const { accessToken } = await authenticate({
    clientId,
    clientSecret,
    refresh_token
  })

  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: mailUser,
      clientId,
      clientSecret,
      refreshToken: refresh_token,
      accessToken: accessToken
    }
  })

  const sendResponse = await smtpTransport.sendMail({
    from: mailUser,
    to: process.env.ARC_ENV === 'production' ? to : mailUser,
    subject: subject,
    html: body,
    generateTextFromHTML: true
  })
  await smtpTransport.close()
  console.log(sendResponse)
}

export const handler = arc.events.subscribe(findSpares)
