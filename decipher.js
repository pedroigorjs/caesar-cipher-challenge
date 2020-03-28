const cipher = (cipherText, shift, alphabet) => {
  const alphabetSplitted = alphabet.toLowerCase().split('')

  const splittedText = cipherText.toLowerCase().split('')
  
  const charsIndex = splittedText.map(char => {
    let index = alphabetSplitted.indexOf(char) - shift
    if(char == ' ') return -1
    if(char == '.') return -2
    return index < 0 ? (alphabetSplitted.length + index) : index
  })
  
  const ciphed = charsIndex.map(index => {
    if(index == -1) return ' '
    if(index == -2) return '.'
    return alphabetSplitted[index]
  }).join('')

  return ciphed
}

module.exports = cipher