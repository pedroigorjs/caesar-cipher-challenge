const stringSplitter = alphabet => alphabet.toLowerCase().split('')
const arrayIndexer = (indexer, item) => indexer.indexOf(item)
const mod = (num, mod) => ((num % mod) + mod) % mod
const swapping = (length, index, offset) => mod((index - offset), length)

const decipher = (cipherText, offset, alphabet) => {
  const alphabetSplitted = stringSplitter(alphabet)
  const splittedText = stringSplitter(cipherText)
  
  let deciphered = ''

  splittedText.map(char => {
    if(alphabetSplitted.includes(char)) {
      const charIndex = arrayIndexer(alphabetSplitted, char)
      const alphabetChar = alphabetSplitted[swapping(alphabetSplitted.length, charIndex, offset)]
      deciphered = deciphered.concat(alphabetChar)
    } else {
      deciphered = deciphered.concat(char)
    }    
  })

  return deciphered
}

module.exports = decipher
