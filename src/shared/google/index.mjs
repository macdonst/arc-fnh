import { OAuth2Client } from 'google-auth-library'

const authenticate = async function ({
  clientId,
  clientSecret,
  refresh_token
}) {
  const oauth2Client = new OAuth2Client(
    clientId,
    clientSecret,
    'https://developers.google.com/oauthplayground'
  )

  oauth2Client.setCredentials({ refresh_token })

  const { Authorization } = await oauth2Client.getRequestHeaders()
  const accessToken =
    Authorization?.split(' ')[0] === 'Bearer'
      ? Authorization.split(' ')[1]
      : null

  return { accessToken, oauth2Client }
}

export { authenticate }
