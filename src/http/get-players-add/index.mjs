import arc from '@architect/functions'
import { getPlayer } from '@architect/shared/db/players.mjs'
import render from '@architect/views/render.mjs'
import arcOauth from 'arc-plugin-oauth'
const auth = arcOauth.auth

const initialPlayer = {
  name: '',
  email: '',
  phone: '',
  position: '',
  fulltime: ''
}

export const handler = arc.http.async(auth, games)

async function games(req) {
  const initialState = { account: req.session?.account }
  const { id = null } = req.query
  const player = id ? await getPlayer(id) : initialPlayer

  return {
    html: render(
      `
    <hockey-page>
      <hockey-form action="/players">
        <hockey-input id="name" label="Name" type="text" required="true" value="${player.name}"></hockey-input>
        <hockey-input id="email" label="Email" type="email" required="true" value="${player.email}"></hockey-input>
        <hockey-input id="phone" label="Phone" type="tel" required="true" value="${player.phone}"></hockey-input>
        <hockey-select id="position" label="Position" required="true" value="${player.position}"></hockey-select>
        <hockey-input id="fulltime" label="Fulltime" type="checkbox" required="false" value="${player.fulltime}"></hockey-input>
      </hockey-form>
    </hockey-page>
  `,
      initialState
    )
  }
}
