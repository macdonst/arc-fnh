import arc from '@architect/functions'
import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('1234567890bcdfghjklmnpqrstvwz', 8) // locase no vowels

const deleteInvite = async function (id) {
  const db = await arc.tables()

  let result = await db.invites.delete({
    inviteID: id
  })

  return result
}

const upsertInvite = async function (invite) {
  const db = await arc.tables()

  if (!invite.inviteID) {
    invite.inviteID = `invite-${nanoid()}`
  }

  let result = await db.invites.put(invite)

  return result
}

const getInvite = async function (id) {
  const db = await arc.tables()

  let invite = await db.invites.get({ inviteID: id })

  return invite
}

const getInviteByEmail = async function (email) {
  const db = await arc.tables()

  let invite = await db.invites.get({ email: email })

  return invite
}

const getCurrentInvites = async function ({ gamedate, time }) {
  const db = await arc.tables()

  const gameTime = new Date(`${gamedate} ${time}:00`).getTime()

  let invites = await db.invites.scan({
    FilterExpression: 'expiresAt <= :gamedate',
    ExpressionAttributeValues: {
      ':gamedate': gameTime
    }
  })

  return invites.Items
}

const getInvites = async function () {
  const db = await arc.tables()

  let invites = await db.invites.scan()

  return invites.Items
}

export {
  deleteInvite,
  getCurrentInvites,
  getInvite,
  getInviteByEmail,
  getInvites,
  upsertInvite
}
