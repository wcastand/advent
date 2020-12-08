import { getinput } from '../utils'

const entries = getinput(__dirname, './eight.txt', false)
// const entries = [
//   'nop +0',
//   'acc +1',
//   'jmp +4',
//   'acc +3',
//   'jmp -3',
//   'acc -99',
//   'acc +1',
//   'jmp -4',
//   'acc +6',
// ]
const code = entries.map<[string, number]>((d) => {
  const [op, value] = d.split(' ')
  return [op, parseInt(value, 10)]
})

function run(start: number, code: [string, number][]) {
  let value = start
  let visited = new Set()
  let idx = 0
  let done = false
  while (!visited.has(idx) && !done) {
    if (idx > code.length - 1) {
      done = true
      break
    }
    const [op, v] = code[idx]
    visited.add(idx)
    switch (op) {
      case 'acc':
        value += v
        idx++
        break
      case 'jmp':
        idx += v
        break
      case 'nop':
      default:
        idx++
        break
    }
  }
  return [value, done]
}

function one() {
  const [value] = run(0, code)
  console.log('one:', value)
}
function two() {
  const changer = code.map(([k]) => {
    if (k === 'nop') return -1
    else if (k === 'jmp') return 1
    else return 0
  })
  let res
  for (let i = 0; i < changer.length; ++i) {
    let tmp = [...code]
    tmp[i] = [changer[i] === -1 ? 'jmp' : changer[i] === 1 ? 'nop' : tmp[i][0], tmp[i][1]]
    const v = run(0, tmp)
    if (v[1]) {
      res = v
      break
    }
  }
  console.log('two:', res)
}

// one()
two()
