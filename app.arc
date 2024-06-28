@app
arc-fnh

@static
fingerprint true
folder public

@http
get /
get /components/*

get /login
get /register
post /login
post /register/options     # HTML for generateRegistrationOptions
post /register/verify      # JSON to verifyRegistrationResponse
post /authenticate/options # HTML for generateAuthenticationOptions
post /authenticate/verify  # JSON to verifyAuthenticationResponse
post /logout

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
architect/plugin-lambda-invoker

@oauth
use-mock true
allow-list allow.mjs

@tables
accounts
  username *String

players
  email *String

games
  gamedate *String

seasons
  seasonID *String

invites
  inviteID *String
  expiresAt TTL

sessions
  _idx *
  ttl ttl

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
