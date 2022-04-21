import nodemailer from 'nodemailer'
import { authenticate } from '@architect/shared/google/index.mjs'
import { getNextGame } from '@architect/shared/db/games.mjs'
import {
  getGoalies,
  getPlayerInfo,
  getFulltimePlayers,
  listPlayersNames
} from '@architect/shared/db/players.mjs'
import { getSeasonWithGame } from '@architect/shared/db/seasons.mjs'

function convertTo12Hour(timestring) {
  return new Date('1970-01-01T' + timestring + 'Z').toLocaleTimeString(
    'en-US',
    {
      timeZone: 'UTC',
      hour12: true,
      hour: 'numeric',
      minute: 'numeric'
    }
  )
}

async function createSubject(next) {
  const date = new Date(next.gamedate)
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' })
  const month = date.toLocaleDateString('en-US', { month: 'long' })
  const timeString12hr = convertTo12Hour(next.time)
  const season = await getSeasonWithGame(next.gamedate)

  return `${
    season.name
  }: ${dayOfWeek} ${month} ${date.getDate()} ${timeString12hr} at ${
    next.facility
  }`
}

function generateBody({ game, cancellations, goalies, spares }) {
  let body = `<p>Hey all,</p>
<p>Our game is at the ${game.facility} with a start time of ${convertTo12Hour(
    game.time
  )}.</p>
<p>Lemme know if you can't make it.</p>
<p><b>Cancellations:</b> ${cancellations}<br/>
<b>Spares:</b> ${spares}<br/>
<b>Goalies:</b> ${goalies}</p>
<p>Simon Mac Donald<br/>
http://simonmacdonald.com</p>`

  return body
}

export async function handler() {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const refresh_token = process.env.GOOGLE_REFRESH_TOKEN
  const mailUser = process.env.MAIL_USER

  const next = await getNextGame()

  // If no more games don't send an email
  if (!next) {
    return
  }

  const fulltime = await getFulltimePlayers()
  const cancellations = await getPlayerInfo(next.cancellations)
  const spares = await getPlayerInfo(next.spares)
  const goalies = await getGoalies(next.cancellations, spares)

  const subject = await createSubject(next)

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

  const to = fulltime.map((player) => player.email).join(', ')
  const cc = next.spares?.filter((spare) => spare !== 'none').join(', ') || ''

  const sendResponse = await smtpTransport.sendMail({
    from: mailUser,
    to: process.env.ARC_ENV === 'production' ? to : mailUser,
    cc: process.env.ARC_ENV === 'production' ? cc : '',
    subject: subject,
    html: generateBody({
      game: next,
      cancellations: listPlayersNames(cancellations),
      spares: listPlayersNames(spares),
      goalies: listPlayersNames(goalies)
    }),
    generateTextFromHTML: true
  })
  await smtpTransport.close()

  console.log(sendResponse)

  return
}
