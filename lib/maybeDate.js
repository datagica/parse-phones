'use strict'
/**
 things like "2015-10-06" look suspiciously more like a date rather than a
 phone number.

note that we kind of check the semantics:
for instance 2016-12-34 will not be considered a date

> lookLikeDate("2016-20-12") --> true
> lookLikeDate("2016-40-12") --> false
> lookLikeDate("2016-4-12") --> true
> lookLikeDate("2016-4-33") --> false
*/
const year  = `(?:19|20)\\d\\d`
const month = `(?:0?[1-9]|1[0-2])`
const day   = `(?:0?[1-9]|[12][0-9]|3[01])`

const pattern = new RegExp(`^(?:` +
  `${year}-${day}-${month}|` +
  `${year}-${month}-${day}|` +
  `${month}-${day}-${year}|` +
  `${day}-${month}-${year}` + ')$'
)

function maybeDate(input)  {
    return !!input.match(pattern)
}

module.exports = maybeDate
