@app
arc-fnh

@static
fingerprint true
folder public

@http
get /
get /components/*

get /players
get /players/add
post /players
post /players/:id/delete
post /players/delete

get /games
get /games/add
get /games/:id
post /games
post /games/:id
post /games/:id/delete
post /games/delete

get /import
post /import

get /invite/:id

get /seasons
get /seasons/add
post /seasons
post /seasons/delete
post /seasons/:id/delete

@events
find-spares
send-email

@scheduled
weekly-reminder cron(0 8 ? * WED *)
weekly-roster cron(0 10 ? * FRI *)

@plugins
arc-plugin-oauth
architect/plugin-lambda-invoker

@oauth
use-mock true
allow-list allow.mjs

@tables
players
  email *String

games
  gamedate *String

seasons
  seasonID *String

invites
  inviteID *String
  expiresAt TTL

@tables-indexes
players
  fulltime *String
  name playersByFulltime

games
  gamedate *String
  name gamesByDate

seasons
  seasonID *String
  name seasonsByID

# invites
#  email *String
#  name invitesByEmail

@aws
# profile default
region us-west-2
architecture arm64
runtime nodejs20.x
