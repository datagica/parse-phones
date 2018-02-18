'use strict'

const tokenize  = require('@datagica/tokenize')()
const maybeDateStr = require('./maybeDateStr')
const maybeDateNum = require('./maybeDateNum')

function algorithm ({
    sentence,   // the chunk (ie. the actual piece of text)
    positions,  // global positions of sentences, words, characters
    results     // buffer to collect the results
  }) {

    const lastWordPosition = positions.word

    // create a unique pattern context (to prevent shared ressource conflicts)
    const pattern = /(?:\+\s?(?:[0-9]{1,3})(?:\.|-|\s)?)?(?:\(\d{1,3}\))?(?:\.|-|\s)?(?:\d{1,6})(?:\.|-|\s)?(?:\d{1,6})(?:\.|-|\s)?(?:\d{1,6})(?:\.|-|\s)?(?:\d{1,6})(?:\.|-|\s)?(?:\d{1,6})/gi

    let match
    while (match = pattern.exec(sentence)) {

      const ngram = match[0].trim()

      if (maybeDateStr(ngram)) { continue }

      const extension = (ngram.match(/\+/)) ? 'international' : 'national'

      const clean = ngram.replace(/\s+/g, '')

      const num = clean.replace(/\(\d+\)/g, '').replace(/[\.\-]/g, '')

      const digits = num.replace(/[^\d]+/g, '')
 
      if (digits.length < 7 || digits.length >= 15) { continue }

      if (maybeDateNum(digits)) { continue }

      const entity = {
        id: `phone-${num}`,
        label: {
          en: `${clean}`,
        },
        phone: clean,
        numeric: num,
        extension: extension,
        keywords: {
          en: [
            'phone',
            'cellphone',
            'cell phone',
            'phone number',
            'number'
          ],
          fr: [
            'numéro',
            'téléphone',
            'numéro de téléphone',
            'portable',
            'numéro de portable'
          ]
        }
      }

      const nbWords = sentence.slice(0, pattern.lastIndex)
                              .split(/[ \r\n]/g)
                              .length

      results.push({
        ngram: ngram,
        value: entity,
        score: 1,
        position: {
          sentence: positions.sentence,
          word    : lastWordPosition    + nbWords,
          begin   : positions.character + pattern.lastIndex,
          end     : positions.character + pattern.lastIndex + ngram.length
        }
      })
    }
}
function parsePhones(input) {
  return Promise.resolve(tokenize(input, algorithm, []))
}

module.exports = parsePhones.default = parsePhones
