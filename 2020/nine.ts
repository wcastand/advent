import { getinput } from '../utils'

const lines = getinput(__dirname, './nine.txt')
const preamp = 25

function calc(arr: number[], n: number) {
  const hash = new Set()
  let issum = false
  for (let i = 0; i < arr.length; ++i) {
    let temp = n - arr[i]
    if (hash.has(temp)) {
      issum = true
      break
    }
    hash.add(arr[i])
  }
  return issum
}

function sums() {
  const hash = new Map<[number, number], number>()
  for (let i = 0; i < lines.length; ++i) {
    for (let j = i + 1; j < lines.length; ++j) {
      const x = lines.slice(i, j + 1)
      hash.set(
        [i, j],
        x.reduce((acc, d) => acc + d, 0)
      )
    }
  }
  return hash
}

function one() {
  let res = 0
  for (let i = preamp; i < lines.length; ++i) {
    const range = lines.slice(i - preamp, i)
    if (!calc(range, lines[i])) {
      res = lines[i]
      break
    }
  }
  console.log('one:', res)
  return res
}
function two() {
  const n = one()
  const s = sums()
  let res = null
  for (let [k, v] of s.entries())
    if (v === n) {
      res = k
      break
    }
  const range = lines.slice(res[0], res[1])
  const a = Math.min(...range)
  const b = Math.max(...range)
  console.log('two:', a + b)
}

two()
