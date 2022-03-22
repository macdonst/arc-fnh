@app
arc-fnh

@http
get /

@plugins
arc-plugin-oauth

@oauth
use-mock true

@aws
# profile default
region us-west-2
architecture arm64
