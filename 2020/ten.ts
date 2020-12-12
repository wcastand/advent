import { getinput } from '../utils'

// const lines = getinput(__dirname, './ten.txt')
// const lines = [
//   28,
//   33,
//   18,
//   42,
//   31,
//   14,
//   46,
//   20,
//   48,
//   47,
//   24,
//   23,
//   49,
//   45,
//   19,
//   38,
//   39,
//   11,
//   1,
//   32,
//   25,
//   35,
//   8,
//   17,
//   7,
//   9,
//   4,
//   2,
//   34,
//   10,
//   3,
// ]
const lines = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4, 9]
const device = Math.max(...lines) + 3
function one() {
  const sorted = [...lines, device].sort((a, b) => a - b)
  const outlets = new Map()
  let current = 0

  for (let d of sorted) {
    const n = d - current
    outlets.set(n, (outlets.get(n) || 0) + 1)
    current = d
  }
  console.log('one:', outlets.get(1) * outlets.get(3))
}
function two() {
  const sorted = [...lines, device].sort((a, b) => a - b)
  console.log(sorted.join(','))
  const hash = new Map()
  let curr = 0
  let idx = -1
  while (idx < sorted.length) {
    const l = []
    let d = idx + 1
    while (sorted[d] < curr + 4) {
      l.push(sorted[d])
      d++
    }
    hash.set(curr, l)
    idx++
    curr = sorted[idx]
  }
  console.log(hash)
  console.log('two:', 0)
}

// one()
// two()

const numbers = [...lines].sort((a, b) => a - b)
let adapters = { 0: true } // add the wall adapter as well
let max = numbers[0]
for (let i = 0; i < numbers.length; i++) {
  adapters[numbers[i]] = true
  max = Math.max(max, numbers[i])
}

// dictionary mapping adapter to number of paths to finish
let paths = { [max]: 1 }

// helper
const get = (index, offset) => (paths[index + offset] ? paths[index + offset] : 0)

for (let i = max - 1; i >= 0; i--) {
  if (adapters[i]) {
    // sum all possible paths for an index
    paths[i] = [1, 2, 3].map((jump) => get(i, jump)).reduce((a, b) => a + b)
  }
}

console.log(paths[0])
/*
[16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4, 9, 8] => 29
[16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4, 9] => 16
[16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4] => 8
*/
