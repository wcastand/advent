import { getinput } from './utils'

function one() {
  const lines = getinput('./one.txt')
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
  console.log(res)
}
function two() {
  const lines = getinput('./one.txt')
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
  console.log(res)
}

// one()
two()
