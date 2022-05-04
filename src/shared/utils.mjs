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

function dateToEnglish(game) {
  const date = new Date(game.gamedate)
  return {
    dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'long' }),
    month: date.toLocaleDateString('en-US', { month: 'long' }),
    dayOfMonth: date.getDate(),
    time: convertTo12Hour(game.time)
  }
}

function getHostname() {
  if (
    process.env.ARC_ENV === 'production' ||
    process.env.NODE_ENV === 'production'
  ) {
    return 'https://er2xpiegaj.execute-api.us-west-2.amazonaws.com/'
  }
  if (process.env.ARC_ENV === 'staging' || process.env.NODE_ENV === 'staging') {
    return 'https://bb2smqni8c.execute-api.us-west-2.amazonaws.com/'
  }
  return 'http://localhost:3333/'
}

export { convertTo12Hour, dateToEnglish, getHostname }
