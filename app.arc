@app
arc-fnh

@http
get /
get /players
post /players
post /players/:id
post /players/:id/delete

@plugins
arc-plugin-oauth

@oauth
use-mock true

@tables
players
  email *String

@tables-indexes
players
  fulltime *String
  name playersByFulltime

@aws
# profile default
region us-west-2
architecture arm64
