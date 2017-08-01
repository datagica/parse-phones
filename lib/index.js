'use strict'

const tokenize  = require('@datagica/tokenize')()

function algorithm ({
    sentence,   // the chunk (ie. the actual piece of text)
    positions,  // global positions of sentences, words, characters
    results     // buffer to collect the results
  }) {
    const lastWordPosition = positions.word
    let match
    const pattern = /(?:\+\s?(?:[0-9]{1,3})(?:\.|-|\s)?)?(?:\(\d{1,3}\))?(?:\.|-|\s)?(?:\d{1,6})(?:\.|-|\s)?(?:\d{1,6})(?:\.|-|\s)?(?:\d{1,6})(?:\.|-|\s)?(?:\d{1,6})(?:\.|-|\s)?(?:\d{1,6})/gi

    while (match = pattern.exec(sentence)) {

      const ngram = match[0].trim()

      const extension = (ngram.match(/\+/)) ? 'international' : 'national'

      const clean = ngram.replace(/\s+/g, '')

      const num = clean.replace(/\(\d+\)/g, '').replace(/[\.\-]/g, '')

      const digits = num.replace(/[^\d]+/g, '')
      const nb_digits = digits.length

      if (nb_digits < 7 || nb_digits >= 15) { continue }

      const maxYear = new Date().getFullYear() + 3 // yeah, alright, you can set a graduation date in the future

      if (nb_digits === 8) {
        const a = Number(digits.slice(0, 4))
        const b = Number(digits.slice(4))

        // suspiciously looks like a date range..
        if (b > a && 1970 < a && a < maxYear && 1970 < b && b < maxYear) {
          continue
        }
      }

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
