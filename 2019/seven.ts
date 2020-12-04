import { getinput } from '../utils'
import { getValue } from './intcode'

function intcode(
  values: number[],
  input: number,
  setting: number,
  index: number = 0,
  out: number = 0
): [number, number, number[], boolean, boolean] {
  let firstInput = true
  let output = out
  let v = Array.from([...values])
  let i = index
  let done = false

  while (!done && i < v.length) {
    const instruction = v[i]
    const op = Math.floor(instruction % 100)
    const mode1 = Math.floor((instruction / 100) % 100)
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
        if (firstInput) {
          firstInput = false
          v[out] = setting
        } else v[out] = input
        i += 2
        break
      case 4:
        const p = getValue(mode1, v[i + 1], v)
        output = p
        return [p, i + 2, v, firstInput, done]
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
  return [output, i, v, firstInput, done]
}

const code = getinput(__dirname, './seven.txt', true, /\,/gim)
type Settings = [number, number, number, number, number]

function run(settings: Settings) {
  const A = intcode(code, 0, settings[0], 0)[0]
  const B = intcode(code, A, settings[1], 0)[0]
  const C = intcode(code, B, settings[2], 0)[0]
  const D = intcode(code, C, settings[3], 0)[0]
  return intcode(code, D, settings[4], 0)[0]
}

function run2(settings: Settings): number {
  let input = 0
  let A = intcode(code, input, settings[0], 0, 0)
  let B = intcode(code, A[0], settings[1], 0, 0)
  let C = intcode(code, B[0], settings[2], 0, 0)
  let D = intcode(code, C[0], settings[3], 0, 0)
  let E = intcode(code, D[0], settings[4], 0, 0)

  while (true) {
    A = intcode(A[2], E[0], E[0], A[1], A[0])
    B = intcode(B[2], A[0], A[0], B[1], B[0])
    C = intcode(C[2], B[0], B[0], C[1], C[0])
    D = intcode(D[2], C[0], C[0], D[1], D[0])
    E = intcode(E[2], D[0], D[0], E[1], E[0])
    if (E[4]) break
  }
  return E[0]
}

function one() {
  const s = [0, 1, 2, 3, 4]
  const tmp = new Map()
  for (let a of s)
    for (let b of s)
      for (let c of s)
        for (let d of s)
          for (let e of s) {
            const settings: Settings = [a, b, c, d, e]
            tmp.set(run(settings), settings)
          }
  const res = [...tmp.entries()].filter(([, v]) => new Set(v).size === 5).map(([k]) => k)
  const max = Math.max(...res)
  console.log('one:', max)
}

function two() {
  const s = [5, 6, 7, 8, 9]
  const tmp = new Set<Settings>()
  for (let a of s)
    for (let b of s)
      for (let c of s)
        for (let d of s)
          for (let e of s) if (new Set([a, b, c, d, e]).size === 5) tmp.add([a, b, c, d, e])

  const res = Array.from(tmp.values()).map((setting) => run2(setting))
  console.log('two:', Math.max(...res))
}

one()
two()
