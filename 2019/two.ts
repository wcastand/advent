import { getinput, intcode } from '../utils'

const entries = getinput(__dirname, './two.txt', true, /\,/gim)

function one() {
  let v = Array.from(entries)
  v[1] = 12
  v[2] = 2
  const res = intcode(v)
  console.log('one:', res[0])
}
function two() {
  for (let i = 0; i < 100; ++i) {
    for (let j = 0; j < 100; ++j) {
      let v = Array.from(entries)
      v[1] = i
      v[2] = j
      const values = intcode(v)
      if (values[0] === 19690720) {
        console.log('two: ', 100 * i + j)
        break
      }
    }
  }
}

one()
two()
