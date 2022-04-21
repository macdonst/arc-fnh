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

get /games
get /games/add
get /games/:id
post /games
post /games/:id
post /games/:id/delete

get /import
post /import

get /seasons
get /seasons/add
post /seasons
post /seasons/:id/delete

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


@aws
# profile default
region us-west-2
architecture arm64
