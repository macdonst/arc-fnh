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

export { convertTo12Hour, dateToEnglish }
