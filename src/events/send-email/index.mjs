import arc from '@architect/functions'
import { authenticate } from '@architect/shared/google/index.mjs'
import nodemailer from 'nodemailer'

export const handler = arc.events.subscribe(sendEmail)

async function sendEmail({ to, subject, body }) {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const refresh_token = process.env.GOOGLE_REFRESH_TOKEN
  const mailUser = process.env.MAIL_USER

  const { accessToken } = await authenticate({
    clientId,
    clientSecret,
    refresh_token
  })
  console.log('got access token', accessToken)

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
  console.log('created nodemailer')

  const sendResponse = await smtpTransport.sendMail({
    from: mailUser,
    to: process.env.ARC_ENV === 'production' ? to : mailUser,
    subject: subject,
    html: body,
    generateTextFromHTML: true
  })
  console.log('sent', sendResponse)
  await smtpTransport.close()
}
