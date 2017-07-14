#!/bin/bash

sed -i "s^__API_ENDPOINT__^$API_ENDPOINT^g" /app/src/js/config.js
sed -i "s^__API_DOCS__^$API_DOCS^g" /app/src/js/config.js
sed -i "s^__GEOCODER_SEARCH__^$GEOCODER_SEARCH^g" /app/src/js/config.js
sed -i "s^__GEOCODER_KEY__^$GEOCODER_KEY^g" /app/src/js/config.js
sed -i "s^__MAP_URL__^$MAP_URL^g" /app/src/js/config.js

cd /app
npm start
