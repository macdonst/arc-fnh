import { authenticate } from '@architect/shared/google/index.mjs'
import { sheets as api } from '@googleapis/sheets'
import { getNextGame } from '@architect/shared/db/games.mjs'
import {
  getFulltimeSkaters,
  getPlayerInfo
} from '@architect/shared/db/players.mjs'

export async function handler() {
  if (process.env.ARC_ENV === 'staging') {
    return
  }

  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const refresh_token = process.env.GOOGLE_REFRESH_TOKEN

  const { oauth2Client } = await authenticate({
    clientId,
    clientSecret,
    refresh_token
  })

  const game = await getNextGame()
  const cancellations = game.cancellations
    ? await getPlayerInfo(game.cancellations)
    : []
  let players = await getFulltimeSkaters()
  cancellations.forEach(
    (item) =>
      (players = players.filter((player) => player.email !== item.email))
  )
  const spares = game.spares ? await getPlayerInfo(game.spares) : []
  const playing = [...players, ...spares]

  const resource = {
    properties: {
      title: `Roster for ${game.gamedate}`
    }
  }
  const sheets = api({ version: 'v4', auth: oauth2Client })
  const response = await createSpreadsheet(resource, sheets)
  const spreadsheetId = response.data.spreadsheetId
  const appendResult = await appendValues(spreadsheetId, playing, sheets)
  console.log(appendResult)
  const formattingResult = await conditionalFormatting(spreadsheetId, sheets)
  console.log(formattingResult)

  return
}

async function createSpreadsheet(resource, sheets) {
  return sheets.spreadsheets.create({
    resource,
    fields: 'spreadsheetId'
  })
}

async function appendValues(spreadsheetId, players, sheets) {
  const valueInputOption = 'USER_ENTERED'
  const range = 'Sheet1!A1'

  let resource = {
    values: players.map((player, i) => {
      if (i !== 0) {
        return ['', '', '', player.name]
      } else {
        return ['White', 'Dark', '', player.name]
      }
    })
  }

  return sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption,
    resource
  })
}

async function conditionalFormatting(spreadsheetId, sheets) {
  const requests = [
    {
      updateBorders: {
        range: {
          sheetId: 0,
          startRowIndex: 0,
          endRowIndex: 11,
          startColumnIndex: 0,
          endColumnIndex: 2
        },
        top: {
          style: 'SOLID',
          width: 1
        },
        bottom: {
          style: 'SOLID',
          width: 1
        },
        left: {
          style: 'SOLID',
          width: 1
        },
        right: {
          style: 'SOLID',
          width: 1
        },
        innerHorizontal: {
          style: 'SOLID',
          width: 1
        },
        innerVertical: {
          style: 'SOLID',
          width: 1
        }
      }
    },
    {
      repeatCell: {
        range: {
          sheetId: 0,
          startRowIndex: 0,
          endRowIndex: 1,
          startColumnIndex: 0,
          endColumnIndex: 2
        },
        cell: {
          userEnteredFormat: {
            backgroundColor: {
              red: 0.0,
              green: 0.0,
              blue: 0.0
            },
            horizontalAlignment: 'CENTER',
            textFormat: {
              foregroundColor: {
                red: 1.0,
                green: 1.0,
                blue: 1.0
              },
              fontSize: 24,
              bold: true
            }
          }
        },
        fields:
          'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)'
      }
    }
  ]
  return sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    resource: {
      requests
    }
  })
}
