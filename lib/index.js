'use strict'

const tokenize  = require('@datagica/tokenize')()
const maybeDate = require('./maybeDate')

function algorithm ({
    sentence,   // the chunk (ie. the actual piece of text)
    positions,  // global positions of sentences, words, characters
    results     // buffer to collect the results
  }) {

    const lastWordPosition = positions.word

    // create a unique pattern context (to prevent shared ressource conflicts)
    const pattern = /(?:\+\s?(?:[0-9]{1,3})(?:\.|-|\s)?)?(?:\(\d{1,3}\))?(?:\.|-|\s)?(?:\d{1,6})(?:\.|-|\s)?(?:\d{1,6})(?:\.|-|\s)?(?:\d{1,6})(?:\.|-|\s)?(?:\d{1,6})(?:\.|-|\s)?(?:\d{1,6})/gi
    
    // since the app might run for a long time, we always re-compute the current year.
    const minYear = 1930
    const maxYear = new Date().getFullYear() + 5 // yeah, alright, you can set a graduation date in the future
    const maxYear1 = parseInt(`${maxYear}`.slice(0, 3))
    const maxYear2 = parseInt(`${maxYear}`.slice(1, 4))
    
    let match
    while (match = pattern.exec(sentence)) {

      const ngram = match[0].trim()

      if (maybeDate(ngram)) { continue }

      const extension = (ngram.match(/\+/)) ? 'international' : 'national'

      const clean = ngram.replace(/\s+/g, '')

      const num = clean.replace(/\(\d+\)/g, '').replace(/[\.\-]/g, '')

      const digits = num.replace(/[^\d]+/g, '')
      const nb_digits = digits.length

      if (nb_digits < 7 || nb_digits >= 15) { continue }

      const a = Number(digits.slice(0, 4))
      const b = Number(digits.slice(4))

      if (nb_digits === 8 && b > a && minYear < a && b < maxYear) {
        // another red flag! we don't want to catch year rangs such as 2009-2010        
        continue
      } else if (nb_digits === 7 && (minYear < a && a < maxYear) &&
        (     (193 < b && b < maxYear1) 
           || (930 < b && b < 999)
           || (0 < b && b < maxYear2))
        ) {
        // harder red flag: we might have a bad input such as "2009-010" -> "2009010"
        continue
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
