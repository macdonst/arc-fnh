import arc from '@architect/functions'
import render from '@architect/views/render.mjs'
import { getPlayer } from '@architect/shared/db/players.mjs'
import { getGame, upsertGame } from '@architect/shared/db/games.mjs'
import { deleteInvite, getInvite } from '@architect/shared/db/invites.mjs'
import { dateToEnglish } from '@architect/shared/utils.mjs'

export const handler = arc.http.async(inviteStatus)

async function inviteStatus(req) {
  const { attend = 'no' } = req.query
  const id = req.pathParameters?.id
  const invite = await getInvite(id)
  if (!invite) {
    return {
      html: render(`
      <hockey-message>
        <h1 slot="message">Sorry, that invite has expired.</h1>
      </hockey-message>`)
    }
  }

  const player = await getPlayer(invite.email)
  const game = await getGame(invite.gameID)

  if (attend === 'yes') {
    if (game.spares.length === 0) {
      game.spares.push(invite.email)
    } else {
      let idx = game.spares.indexOf('none')
      game.spares[idx] = invite.email
    }
  } else {
    if (game.declined) {
      game.declined.push(invite.email)
    } else {
      game.declined = [invite.email]
    }
  }
  await upsertGame(game)
  await deleteInvite(id)

  const message = await createResponse(attend, player, game)

  return {
    html: render(`
    <hockey-message>
      <h1 slot="message">${message}</h1>
    </hockey-message>`)
  }
}

async function createResponse(attend, player, game) {
  const firstName = player.name.split(' ')[0]
  const { dayOfWeek, time } = dateToEnglish(game)

  return attend === 'yes'
    ? `Great ${firstName}, see you ${dayOfWeek} at ${time}.`
    : `No problem ${firstName}, maybe next time.`
}
