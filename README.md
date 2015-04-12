# Ripple.txt Client

Javascript module to fetch and parse ripple.txt files from a given domain

## Installation

````
npm install --save ripple-txt-client
````

## Usage

````
import RippleTxtClient from 'ripple-txt-client'

let client = new RippleTxtClient

````

Fetching and parsing a valid ripple.txt file

````
client.fetch('snapswap.us', (txt) => {

  assert.strictEqual(txt.federation_url[0], 'https://snapswap.us/api/v1/bridge')

  console.log(txt)
})

=> { currencies: [ 'USD' ],
  validation_public_key: [ 'n9LigbVAi4UeTtKGHHTXNcpBXwBPdVKVTjbSkLmgJvTn6qKB8Mqz' ],
  domain: [ 'snapswap.us' ],
  ips: 
   [ 'r.ripple.com 51235',
     '162.243.242.204 51235',
     '23.21.167.100 51235',
     '107.21.116.214 51235' ],
  validators: 
   [ 'n949f75evCHwgyP4fPVgaHqNHxUVN15PsJEZ3B3HnXPcPjcZAoy7    RL1',
     'n9MD5h24qrQqiyBC8aeqqCWvpiBiYQ3jxSr91uiDvmrkyHRdYLUj    RL2',
     'n9L81uNCaPgtUJfaHh89gmdvXKAmSt5Gdsw2g1iPWaPkAHW5Nm4C    RL3',
     'n9KiYM9CgngLvtRCQHZwgC2gjpdaZcCcbt3VboxiNFcKuwFVujzS    RL4',
     'n9LdgEtkmGB9E2h3K4Vp7iGUaKuq23Zr32ehxiU8FWY7xoxbWTSA    RL5',
     'n9LigbVAi4UeTtKGHHTXNcpBXwBPdVKVTjbSkLmgJvTn6qKB8Mqz    SnapSwap' ],
  accounts: [ 'rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q' ],
  hotwallets: 
   [ 'rUQTpMqAF5jhykj4FExVeXakrZpiKF6cQV',
     'ra7JkEzrgeKHdzKgo4EUUVBnxggY4z37kt',
     'rEk9i7G8ac1kUs1mFjtze1qjj9FzGvXAG',
     'rsHq4xRXP3AqKRyyLq49TgNtKJPeQbZ46g' ],
  federation_url: [ 'https://snapswap.us/api/v1/bridge' ],
  manifest_url: [ 'https://api.rippletrade.com/manifest.json' ] }
````

Attempting to fetch a non-existant ripple.txt file

````
client.fetch('google.com').catch(client.NotFoundError, error => {
  console.log(error)
})
````

