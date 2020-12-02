import { intcode, getinput } from '../utils'

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
  // console.log(A[0])
  let B = intcode(code, A[0], settings[1], 0, 0)
  // console.log(B[0])
  let C = intcode(code, B[0], settings[2], 0, 0)
  // console.log(C[0])
  let D = intcode(code, C[0], settings[3], 0, 0)
  // console.log(D[0])
  let E = intcode(code, D[0], settings[4], 0, 0)
  // console.log(E[0])

  while (true) {
    // const [output, i, v, first, status] = intcode(m[0], m[1], m[2], m[3], m[4])
    A = intcode(A[2], E[0], E[0], A[1], A[0])
    // console.log(A[0], A[4])
    B = intcode(B[2], A[0], A[0], B[1], B[0])
    // console.log(B[0], B[4])
    C = intcode(C[2], B[0], B[0], C[1], C[0])
    // console.log(C[0], C[4])
    D = intcode(D[2], C[0], C[0], D[1], D[0])
    // console.log(D[0], D[4])
    E = intcode(E[2], D[0], D[0], E[1], E[0])
    // console.log(E[0], E[4])
    if (E[4]) break
  }
  // console.log(A, B, C, D, E)
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
