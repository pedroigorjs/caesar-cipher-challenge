const stringSplitter = alphabet => alphabet.toLowerCase().split('')
const arrayIndexer = (indexer, item) => indexer.indexOf(item)

const decipher = (cipherText, shift, alphabet) => {
  const alphabetSplitted = stringSplitter(alphabet)
  const splittedText = stringSplitter(cipherText)
  
  const charsIndex = splittedText.map(char => {
    let index = arrayIndexer(alphabetSplitted, char) - shift
    if(char == ' ') return -1
    if(char == '.') return -2
    return index < 0 ? (alphabetSplitted.length + index) : index
  })
  
  const deciphered = charsIndex.map(index => {
    if(index == -1) return ' '
    if(index == -2) return '.'
    return alphabetSplitted[index]
  }).join('')

  return deciphered
}

module.exports = decipher
