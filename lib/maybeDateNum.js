
/**
 *  most countries now have > 7 or 8 digits phone number
 * for those who don't, it is problematic because these
 * numbers might look like a date when badly formatted 
 * in a PDF file.. so we try to check if they are date
 */

function maybeDateNum (digits) {

  const a = Number(digits.slice(0, 4))
  const b = Number(digits.slice(4))

  // since the app might run for a long time, we always re-compute the current year.
  const minYear = 1930
  const maxYear = new Date().getFullYear() + 5 // yeah, alright, you can set a graduation date in the future
  const maxYear1 = parseInt(`${maxYear}`.slice(0, 3))
  const maxYear2 = parseInt(`${maxYear}`.slice(1, 4))
      
  if (digits.length === 8 && (minYear < a && a < maxYear) && (minYear < b && b < maxYear)) {
    // another red flag! we don't want to catch year rangs such as 2009-2010        
    return true
  } else if (digits.length === 7 && (minYear < a && a < maxYear) &&
    (     (193 < b && b < maxYear1) 
       || (930 < b && b < 999)
       || (0 < b && b < maxYear2))
    ) {
    // harder red flag: we might have a bad input such as "2009-010" -> "2009010"
    return true
  }
  return false
}
    
module.exports = maybeDateNum