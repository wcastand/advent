import { getinput } from '../utils'

const lines = getinput(__dirname, './two.txt', false)

function count(letter: string, str: string) {
  return [...str].filter((s) => s === letter).length
}
function one() {
  let res = 0
  for (let line of lines) {
    const [prefix, pwd] = line.split(':').map((s) => s.trim())
    const [range, letter] = prefix.split(' ')
    const [min, max] = range.split('-').map((s) => parseInt(s, 10))
    const occ = count(letter, pwd)
    if (occ <= max && occ >= min) res++
  }
  console.log('one:', res)
}
function two() {
  let res = 0
  for (let line of lines) {
    const [prefix, pwd] = line.split(':').map((s) => s.trim())
    const [range, letter] = prefix.split(' ')
    const [min, max] = range.split('-').map((s) => parseInt(s, 10))
    if ((pwd[min - 1] === letter) !== (pwd[max - 1] === letter)) res++
  }
  console.log('two:', res)
}

one()
two()
