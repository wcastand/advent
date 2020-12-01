import { getinput } from '../utils'

const lines = getinput(__dirname, './one.txt')
function one() {
  let res = 0
  for (let i = 0; i < lines.length; ++i) {
    const v = lines[i]
    for (let j = i + 1; j < lines.length; ++j) {
      if (v + lines[j] === 2020) {
        res = v * lines[j]
        break
      }
    }
  }
  console.log('one:', res)
}
function two() {
  let res = 0
  for (let i = 0; i < lines.length; ++i) {
    const v = lines[i]
    for (let j = i + 1; j < lines.length; ++j) {
      for (let k = j + 1; k < lines.length; ++k) {
        if (v + lines[j] + lines[k] === 2020) {
          res = v * lines[j] * lines[k]
          break
        }
      }
    }
  }
  console.log('two:', res)
}

one()
two()
