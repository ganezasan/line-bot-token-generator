const jose = require('node-jose')
const fs = require("fs")
require('dotenv').config()

// private.keyを配置する必要があります
const privateKey = fs.readFileSync('private.key')

const header = {
  alg: "RS256",
  typ: "JWT",
  kid: process.env.LINE_KID
}

const payload = {
  iss: process.env.LINE_CHANNEL_ID,
  sub: process.env.LINE_CHANNEL_ID,
  aud: "https://api.line.me/",
  exp: Math.floor(new Date().getTime() / 1000) + 60 * 30, // 30分間有効
  token_exp: 60 * 60 * 24 * 30
}

jose.JWS.createSign({format: 'compact', fields: header}, JSON.parse(privateKey))
  .update(JSON.stringify(payload))
  .final()
  .then(result => {
    console.log(result);
  })
