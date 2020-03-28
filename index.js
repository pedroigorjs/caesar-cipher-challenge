require('dotenv/config')

const fs = require('fs')
const request = require('request')
const crypto = require('crypto')
const decipher = require('./decipher')

const shasum = crypto.createHash('sha1')

const token = process.env.TOKEN
const url = `https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=${token}`
const urlSolution = `https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=${token}`


request(url)
  .on('data', data => {
    const response = JSON.parse(data)

    const deciphered = decipher(response.cifrado, response['numero_casas'], 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    const sha1 = shasum.update(deciphered).digest('hex')

    response.decifrado = deciphered
    response['resumo_criptografico'] = sha1

    const buffer = Buffer.from(JSON.stringify(response))

    fs.writeFileSync('answer.json', buffer, function(err) {
      if(err) throw err

      return console.log('File created!')
    })
  })

const formData = {
  answer: fs.createReadStream('./answer.json')
}


request.post({
  url: urlSolution,
  formData: formData,
}, (err, res, body) => {
  if(err) throw err

  console.log(body)
})
