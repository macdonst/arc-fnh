import arc from '@architect/functions'
import arcOauth from 'arc-plugin-oauth'
const auth = arcOauth.auth
const checkAuth = arcOauth.checkAuth

export const handler = arc.http.async(auth, index)

async function index (req) {
  const authenticated = checkAuth(req)
  console.log(authenticated)
  console.log(req.session)
  return {
    html: `
    <html>
      <head>
      </head>
      <body>
        <p> You are Authenticated </p>
        <form method="post" action="/logout" >
          <button type="submit">Logout</button>
        </form>
      </body>
    </html>
    `
  }

  /*
  if(authenticated) {
    return {
      html: ` <p> You are Authenticated <form method="post" action="/logout"><button type="submit">logout</button></form></p>
      <p>${JSON.stringify(req.session)}</p>
      <p>Match Property: ${process.env.ARC_OAUTH_MATCH_PROPERTY}</p>`
    }
  } else{
    return {
      html: ` <p> You are a Guest <form method="get" action="/login"><button type="submit">login</button></form> </p>
      <p>${JSON.stringify(req.session)}</p>
      <p>Match Property: ${process.env.ARC_OAUTH_MATCH_PROPERTY}</p>`
    }
  }
  */
}
