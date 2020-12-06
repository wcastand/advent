import { getinput } from '../utils'

const lines = getinput(__dirname, './five.txt', false)

function one() {
  const IDs = lines.map((line) => {
    return parseInt(
      line
        .split('')
        .map((s) => (s === 'F' || s === 'L' ? '0' : '1'))
        .join(''),
      2
    )
  })
  console.log('one:', Math.max(...IDs))
}
function two() {
  const IDs = lines.map((line) => {
    return parseInt(
      line
        .split('')
        .map((s) => (s === 'F' || s === 'L' ? '0' : '1'))
        .join(''),
      2
    )
  })
  const sorted = [...IDs].sort()
  const res = sorted.find((d) => !sorted.includes(d + 1)) + 1
  console.log('two:', res)
}

one()
two()
