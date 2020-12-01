import { getinput } from '../utils'

const lines = getinput(__dirname, './one.txt')

function one() {
  let res = 0
  for (let i = 0; i < lines.length; ++i) {
    res += Math.floor(lines[i] / 3) - 2
  }
  console.log('one:', res)
}
function two() {
  let res = 0
  for (let i = 0; i < lines.length; ++i) {
    let tmp = Math.floor(lines[i] / 3) - 2
    while (tmp > 0) {
      res += tmp
      tmp = Math.floor(tmp / 3) - 2
    }
  }
  console.log('two:', res)
}

one()
two()
