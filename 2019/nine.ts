import { getinput } from '../utils'

const code = getinput(__dirname, './five.txt', true, /\,/gim)

enum Operations {
  ADD = 1,
  MUT = 2,
  IN = 3,
  OUT = 4,
  JIT = 5,
  JIF = 6,
  LES = 7,
  EQ = 8,
  EXIT = 99,
}

enum Mode {
  POSITION = 0,
  IMMEDIATE = 1,
}

function createMachine(code: number[]) {
  let i = 0
  let output = []
  let halted = false
  let v = Array.from([...code])

  function getValue(mode: Mode, index: number) {
    switch (mode) {
      case Mode.POSITION:
        return v[index]
      case Mode.IMMEDIATE:
        return index
    }
  }
  const run = (input: number) => {
    while (!halted) {
      const instruction = v[i]
      const op: Operations = Math.floor(instruction % 100)
      const mode1: Mode = Math.floor((instruction / 100) % 100)
      const mode2: Mode = Math.floor(instruction / 1000)
      switch (op) {
        case Operations.ADD:
          v[v[i + 3]] = getValue(mode1, v[i + 1]) + getValue(mode2, v[i + 2])
          i += 4
          break
        case Operations.MUT:
          v[v[i + 3]] = getValue(mode1, v[i + 1]) * getValue(mode2, v[i + 2])
          i += 4
          break
        case Operations.IN:
          v[v[i + 1]] = input
          i += 2
          break
        case Operations.OUT:
          let out = getValue(mode1, v[i + 1])
          output.push(out)
          i += 2
          return
        case Operations.JIT:
          i = getValue(mode1, v[i + 1]) !== 0 ? getValue(mode2, v[i + 2]) : i + 3
          break
        case Operations.JIF:
          i = getValue(mode1, v[i + 1]) === 0 ? getValue(mode2, v[i + 2]) : i + 3
          break
        case Operations.LES:
          v[v[i + 3]] = getValue(mode1, v[i + 1]) < getValue(mode2, v[i + 2]) ? 1 : 0
          i += 4
          break
        case Operations.EQ:
          v[v[i + 3]] = getValue(mode1, v[i + 1]) === getValue(mode2, v[i + 2]) ? 1 : 0
          i += 4
          break
        default:
          if (op !== Operations.EXIT) console.log('Unknown command:', op)
          halted = true
          return
      }
    }
  }
  return { v: () => v, output: () => output, halted: () => halted, run }
}

function one() {
  let A = createMachine(code)
  while (!A.halted()) {
    // console.log(A.halted, A.output)
    A.run(1)
  }
  console.log('one:', A.output())
}
function two() {
  console.log('two:', 0)
}

one()
// two()
