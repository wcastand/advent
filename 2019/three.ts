import { readFileSync } from 'fs'
import { resolve } from 'path'

const [input1, input2] = readFileSync(resolve(__dirname, 'three.txt'), 'utf8').split(/\n/gim)
const c1 = input1.split(/\,/gim)
const c2 = input2.split(/\,/gim)

function wire(circuit: string[]) {
  const res = []
  for (let i = 0; i < circuit.length; ++i) {
    const [op, ...v] = circuit[i]
    const value = parseInt(v.join(''), 10)
    const [[posx, posy]] = (res.length ? res : [[0, 0]]).slice(-1)
    switch (op) {
      case 'L':
        for (let j = 1; j <= value; ++j) res.push([posx - j, posy])
        break
      case 'R':
        for (let j = 1; j <= value; ++j) res.push([posx + j, posy])
        break
      case 'D':
        for (let j = 1; j <= value; ++j) res.push([posx, posy + j])
        break
      case 'U':
        for (let j = 1; j <= value; ++j) res.push([posx, posy - j])
        break
    }
  }
  return res
}

function intersect(a: [number, number][], b: [number, number][], isUnion: boolean = true) {
  return a.filter(((set) => (a) => isUnion === set.has(`${a[0]},${a[1]}`))(new Set(b.map((b) => `${b[0]},${b[1]}`))))
}

function one() {
  const [, ...wire1] = wire(c1)
  const [, ...wire2] = wire(c2)
  const int = intersect(wire1, wire2)
  const res = Math.min(...int.map(([x, y]) => Math.abs(x) + Math.abs(y)))
  console.log('one:', res)
}
function two() {
  const wire1 = wire(c1)
  const wire2 = wire(c2)
  const int = intersect(wire1, wire2)
  const steps = []
  for (let [x, y] of int) {
    const idx1 = wire1.findIndex(([x1, y1]) => x1 === x && y1 === y)
    const idx2 = wire2.findIndex(([x2, y2]) => x2 === x && y2 === y)
    steps.push(idx1 + idx2 + 2)
  }
  const res = Math.min(...steps)
  console.log('two:', res)
}

one()
two()
