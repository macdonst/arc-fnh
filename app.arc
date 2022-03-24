@app
arc-fnh

@static
fingerprint true
folder public

@http
get /
get /components/*
get /players
post /players
post /players/:id
post /players/:id/delete
get /games
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
  date *String

@tables-indexes
players
  fulltime *String
  name playersByFulltime


@aws
# profile default
region us-west-2
architecture arm64
