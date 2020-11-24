# REST

Examples of using public APIs.

## More APIs

- https://github.com/marmelab/awesome-rest
- https://github.com/dspinellis/awesome-rest-apis
- https://github.com/public-apis/public-apis

## Web client

JavaScript API client running in a webpage https://pirfalt.github.io/rest-hh/.

## Command line client

cURL API client. API exploration.

### https://opentdb.com/api_config.php

```sh
curl "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=boolean" > response.json
jq '.' < response.json
```

### https://foodish-api.herokuapp.com/

```sh
curl "https://foodish-api.herokuapp.com/api/" > response.json
jq '.' < response.json

curl "https://foodish-api.herokuapp.com/api/images/idly" > response.json
jq '.' < response.json

curl $(jq '.image' -r) > img.jpg < response.json

code img.jpg
```

### https://xkcd.com/json.html

```sh
curl "https://xkcd.com/info.0.json" > response.json
jq '.' < response.json

curl "https://xkcd.com/614/info.0.json" > response.json
jq '.' < response.json

curl $(jq '.img' -r < response.json) > img.jpg
```

### https://www.tronalddump.io/

```sh
curl "https://www.tronalddump.io/random/quote" > response.json
jq '.' < response.json
```

### https://covid19api.com/

```sh
curl --location "https://api.covid19api.com/" > response.json
jq '.' < response.json

curl --location "https://api.covid19api.com/summary" > response.json
jq '.' < response.json
jsonui response.json

curl --location "https://api.covid19api.com/countries" > response.json
jq '.' < response.json


curl --location "https://api.covid19api.com/dayone/country/sweden" > response_dayone.json
jq '.' < response_dayone.json| tail -n 30
jsonui < response_dayone.json


curl --location "https://api.covid19api.com/total/country/sweden" > response_total.json
jq '.' < response_total.json | tail -n 30
jsonui < response_total.json

```

### https://jobs.github.com/api

```sh
curl -H "Accept: application/json" "https://jobs.github.com/positions?location=uk&search=java&full_time=true" > response.json
jq '.' < response.json
```

### https://developers.giphy.com/docs/api/

```sh
# Public beta key
#  https://giphy.api-docs.io/1.0/welcome/access-and-api-keys
YOUR_API_KEY='dc6zaTOxFJmzC'

# Random
curl  "https://api.giphy.com/v1/gifs/random?limit=5&rating=pg&api_key=$YOUR_API_KEY" > response.json
jq '.' < response.json

curl $(jq '.data.image_url' -r < response.json) > img.gif

# Open
code img.gif

# Gossling
curl "https://api.giphy.com/v1/gifs/search?rating=pg&limit=1&q=ryan+gossling&api_key=$YOUR_API_KEY" > response.json
jq '.' < response.json

curl $(jq '.data[0].images.original.url' -r < response.json) > img.gif

# Magic
curl "https://api.giphy.com/v1/gifs/search?rating=pg&limit=1&offset=1&q=magic&api_key=$YOUR_API_KEY" > response.json
jq '.' < response.json

curl $(jq '.data[0].images.original.url' -r < response.json) > img.gif
```

### https://${DEPLOYMENT}.ngrok.io/

Questions

```sh
DEPLOYMENT='342729fbd16e'

# GET list
curl "https://${DEPLOYMENT}.ngrok.io/" > response.json
jq '.' < response.json

# GET Specific
curl "https://${DEPLOYMENT}.ngrok.io/0" > response.json
jq '.' < response.json

# POST
curl -X POST "https://${DEPLOYMENT}.ngrok.io/" -H 'content-type: application/json' -d '{ "question": "how does this work?" }' > response.json
jq '.' < response.json

curl "https://${DEPLOYMENT}.ngrok.io/1" > response.json
jq '.' < response.json

# PUT
curl -X PUT "https://${DEPLOYMENT}.ngrok.io/0" -H 'content-type: application/json' -d '{ "question": "changed" }' > response.json
jq '.' < response.json

curl -X PUT "https://${DEPLOYMENT}.ngrok.io/300" -H 'content-type: application/json' -d '{ "hello": true }' > response.json
jq '.' < response.json

# DELETE
curl "https://${DEPLOYMENT}.ngrok.io/0" > response.json
jq '.' < response.json

curl -X DELETE "https://${DEPLOYMENT}.ngrok.io/0" -H 'content-type: application/json' > response.json
jq '.' < response.json

curl "https://${DEPLOYMENT}.ngrok.io/300" > response.json
jq '.' < response.json

```
