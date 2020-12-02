import { getinput, getValue } from '../utils'

const entries = getinput(__dirname, './two.txt', true, /\,/gim)

function intcode(values: number[], input: number) {
  let v = values
  let output = 0
  let i = 0
  let done = false
  while (!done && i < v.length) {
    const instruction = v[i]
    const op = Math.floor(instruction % 100)
    const mode1 = Math.floor((instruction / 100) % 10)
    const mode2 = Math.floor(instruction / 1000)

    let f = 0,
      s = 0,
      out = 0

    switch (op) {
      case 1:
        f = getValue(mode1, v[i + 1], v)
        s = getValue(mode2, v[i + 2], v)
        out = v[i + 3]
        v[out] = f + s
        i += 4
        break
      case 2:
        f = getValue(mode1, v[i + 1], v)
        s = getValue(mode2, v[i + 2], v)
        out = v[i + 3]
        v[out] = f * s
        i += 4
        break
      case 3:
        out = v[i + 1]
        v[out] = input
        i += 2
        break
      case 4:
        const p = getValue(mode1, v[i + 1], v)
        output = p
        i += 2
        break
      case 5:
        f = getValue(mode1, v[i + 1], v)
        s = getValue(mode2, v[i + 2], v)
        if (f !== 0) i = s
        else i += 3
        break
      case 6:
        f = getValue(mode1, v[i + 1], v)
        s = getValue(mode2, v[i + 2], v)
        if (f === 0) i = s
        else i += 3
        break
      case 7:
        f = getValue(mode1, v[i + 1], v)
        s = getValue(mode2, v[i + 2], v)
        out = v[i + 3]
        v[out] = f < s ? 1 : 0
        i += 4
        break
      case 8:
        f = getValue(mode1, v[i + 1], v)
        s = getValue(mode2, v[i + 2], v)
        out = v[i + 3]
        v[out] = f === s ? 1 : 0
        i += 4
        break
      default:
        if (op !== 99) console.log('unknown', op)
        done = true
        break
    }
  }
  return [output || v[0], v]
}

function one() {
  let v = Array.from(entries)
  v[1] = 12
  v[2] = 2
  const res = intcode(v, 0)[0]
  console.log('one:', res)
}
function two() {
  for (let i = 0; i < 100; ++i) {
    for (let j = 0; j < 100; ++j) {
      let v = Array.from(entries)
      v[1] = i
      v[2] = j
      const values = intcode(v, 0)[1]
      if (values[0] === 19690720) {
        console.log('two: ', 100 * i + j)
        break
      }
    }
  }
}

one()
two()
