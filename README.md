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
})
````

Attempting to fetch a non-existant ripple.txt file

````
client.fetch('google.com').catch(client.NotFoundError, error => {
  console.log(error)
})
````

