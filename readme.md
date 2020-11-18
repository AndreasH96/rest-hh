# REST

https://github.com/marmelab/awesome-rest
https://github.com/dspinellis/awesome-rest-apis
https://github.com/public-apis/public-apis

## https://opentdb.com/api_config.php

```sh
res=$(curl "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=boolean") && \
echo "$res" | jq '.'
```

## https://foodish-api.herokuapp.com/

```sh
res=$(curl "https://foodish-api.herokuapp.com/api/") && \
echo "$res" | jq '.'

res=$(curl "https://foodish-api.herokuapp.com/api/images/idly") && \
echo "$res" | jq '.'

curl $(echo "$res" | jq '.image' -r) > img.jpg

code img.jpg
```

## https://xkcd.com/json.html

```sh
res=$(curl "https://xkcd.com/info.0.json") && \
echo "$res" | jq '.'

res=$(curl "https://xkcd.com/614/info.0.json") && \
echo "$res" | jq '.'

curl $(echo "$res" | jq '.img' -r) > img.jpg
```

## https://www.tronalddump.io/

```sh
res=$(curl "https://www.tronalddump.io/random/quote") && \
echo "$res" | jq '.'
```

## https://covid19api.com/

```sh
res=$(curl --location "https://api.covid19api.com/") && \
echo "$res" | jq '.'

res=$(curl --location "https://api.covid19api.com/summary") && \
echo "$res" | jq '.'
echo "$res" | jsonui

res=$(curl --location "https://api.covid19api.com/countries") && \
echo "$res" | jq '.'


resdayone=$(curl --location "https://api.covid19api.com/dayone/country/sweden") && \
echo "$resdayone" | jq '.'| tail -n 30
echo "$resdayone" | jsonui


restotal=$(curl --location "https://api.covid19api.com/total/country/sweden") && \
echo "$restotal" | jq '.' | tail -n 30
echo "$restotal" | jsonui

```

## https://jobs.github.com/api

```sh
res=$(curl -H "Accept: application/json" "https://jobs.github.com/positions?location=uk&search=java&full_time=true") && \
echo "$res" | jq '.'
```

## https://developers.giphy.com/docs/api/

```sh
# Public beta key
#  https://giphy.api-docs.io/1.0/welcome/access-and-api-keys
YOUR_API_KEY='dc6zaTOxFJmzC'

# Random
res=$(curl  "https://api.giphy.com/v1/gifs/random?limit=5&rating=pg&api_key=$YOUR_API_KEY") && \
echo "$res" | jq '.'

curl $(echo "$res" | jq '.data.image_url' -r) > img.gif

# Open
code img.gif

# Gossling
res=$(curl "https://api.giphy.com/v1/gifs/search?rating=pg&limit=1&q=ryan+gossling&api_key=$YOUR_API_KEY") && \
echo "$res" | jq '.'

curl $(echo "$res" | jq '.data[0].images.original.url' -r) > img.gif

# Magic
res=$(curl "https://api.giphy.com/v1/gifs/search?rating=pg&limit=1&offset=1&q=magic&api_key=$YOUR_API_KEY") && \
echo "$res" | jq '.'

curl $(echo "$res" | jq '.data[0].images.original.url' -r) > img.gif
```
