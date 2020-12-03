import { getinput } from '../utils'

const lines = getinput(__dirname, './three.txt', false)
const width = lines[0].length
const height = lines.length

function one() {
  let x = 0
  let y = 0
  let tree = 0
  let stepx = 3
  let stepy = 1
  while (y < height) {
    const istree = lines[y][x % width] === '#'
    if (istree) tree++
    x += stepx
    y += stepy
  }
  console.log('one:', tree)
}
function two() {
  let tree = [0, 0, 0, 0, 0]
  let stepx = [1, 3, 5, 7, 1]
  let stepy = [1, 1, 1, 1, 2]
  for (let idx in stepx) {
    let x = 0
    let y = 0
    while (y < height) {
      const istree = lines[y][x % width] === '#'
      if (istree) tree[idx] = tree[idx] + 1
      x += stepx[idx]
      y += stepy[idx]
    }
  }
  console.log(
    'two:',
    tree.reduce((acc, x) => acc * x, 1)
  )
}

// one()
two()
