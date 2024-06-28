import process from 'node:process'

const { ARC_ENV } = process.env
const rpIDs = {
  production: 'er2xpiegaj.execute-api.us-west-2.amazonaws.com',
  staging: 'bb2smqni8c.execute-api.us-west-2.amazonaws.com',
  testing: 'localhost',
}
const rpNames = {
  production: 'Friday Night Hockey',
  staging: 'Friday Night Hockey Staging',
  testing: 'Friday Night Hockey Testing',
}
const rpID = rpIDs[ARC_ENV] || rpIDs.testing
const rpName = rpNames[ARC_ENV] || rpNames.testing
const origin = ARC_ENV === 'testing' ? 'http://localhost:3333' : `https://${rpID}`

export { rpID, rpName, origin }
