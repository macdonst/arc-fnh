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
post /players/:id
post /players/:id/delete
get /games
get /games/add
post /games
post /games/:id
post /games/:id/delete
get /props

@plugins
arc-plugin-oauth

@oauth
use-mock true
allow-list allow.mjs

@tables
players
  email *String

games
  gamedate *String

@tables-indexes
players
  fulltime *String
  name playersByFulltime

games
  gamedate *String
  name gamesByDate


@aws
# profile default
region us-west-2
architecture arm64
