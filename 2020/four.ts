import { getinput } from '../utils'

const entries = getinput(__dirname, './four.txt', false, /\n\n/gim)
const passports = entries
  .map((entry) => entry.split(/\n/gim).join(' ').split(/\:|\s/gim))
  .map((entry) => {
    let res = new Map()
    for (let i = 0; i < entry.length; i += 2) res.set(entry[i], entry[i + 1])
    return res
  })

enum Fields {
  'byr' = 'byr',
  'iyr' = 'iyr',
  'eyr' = 'eyr',
  'hgt' = 'hgt',
  'hcl' = 'hcl',
  'ecl' = 'ecl',
  'pid' = 'pid',
}
const requiredfields: Fields[] = [
  Fields.byr,
  Fields.iyr,
  Fields.eyr,
  Fields.hgt,
  Fields.hcl,
  Fields.ecl,
  Fields.pid,
]

function valid(field: Fields, value: string): boolean {
  const n = parseInt(value, 10)
  switch (field) {
    case Fields.byr:
      return value.length === 4 && n <= 2002 && n >= 1920
    case Fields.iyr:
      return value.length === 4 && n <= 2020 && n >= 2010
    case Fields.eyr:
      return value.length === 4 && n <= 2030 && n >= 2020
    case Fields.hgt:
      const tmp = parseInt(value.replace(/\D/gim, ''), 10)
      return new RegExp(/^\d*(in|cm)$/g).test(value) && value.includes('cm')
        ? tmp <= 193 && tmp >= 150
        : tmp <= 76 && tmp >= 59
    case Fields.hcl:
      return new RegExp(/^\#([a-f]|[0-9]){6}$/gim).test(value)
    case Fields.ecl:
      return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value)
    case Fields.pid:
      return new RegExp(/^\d{9}$/g).test(value)
    default:
      return false
  }
}

function one() {
  const valid = passports
    .map((passport) => requiredfields.every((field) => passport.has(field)))
    .filter((s) => s)
  console.log('one:', valid.length)
}
function two() {
  const res = passports
    .map((passport) =>
      requiredfields.every((field) => passport.has(field) && valid(field, passport.get(field)))
    )
    .filter((s) => s)
  console.log('two:', res.length)
}

one()
two()
