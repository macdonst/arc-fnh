@app
arc-fnh

@http
get /
get /players
post /players
post /players/:id
post /players/:id/delete
get /games
post /games
post /games/:id
post /games/:id/delete

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
