import { Canvas } from 'terminal-canvas'

import { getinput } from '../utils'

const [line] = getinput(__dirname, './eight.txt', false)
const entries = line.split('').map((s) => parseInt(s, 10))
const h = 6
const w = 25
const total = entries.length / w / h

let layers = []
for (let idx = 0; idx < total; ++idx) layers.push(entries.splice(0, w * 6))

function one() {
  let [idx] = layers
    .map((img, idx) => [idx, img.filter((i) => i === 0).length])
    .sort(([, a], [, b]) => a - b)[0]
  const fewerz = layers[idx]
  const [a, b] = fewerz.reduce(([a, b], x) => [x === 1 ? a + 1 : a, x === 2 ? b + 1 : b], [
    0,
    0,
  ])
  console.log('one:', a * b)
}
function two() {
  const l = w * h
  let img = []
  for (let i = 0; i < l; ++i) {
    let p = 2
    let idx = 0
    while (p === 2 && idx < layers.length) {
      p = layers[idx][i]
      idx++
    }
    img[i] = p
  }
  const canvas = Canvas.create().reset()

  for (let i = 0; i <= img.length; ++i) {
    let color = img[i]
    let x = i % w
    let y = i / w
    canvas
      .moveTo(x, y)
      .background(color ? 'WHITE' : 'BLACK')
      .write(' ')
  }
  canvas.flush()
}

two()
console.log('')
one()
