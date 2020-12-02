import { getinput } from '../utils'

const entries = getinput(__dirname, './six.txt', false)
const nodes = new Set()
const edges = new Map()
for (let entry of entries) {
  const [A, B] = entry.split(')')
  nodes.add(A)
  nodes.add(B)
  edges.set(B, A)
}

function one() {
  let orbits = 0
  for (let node of nodes) {
    if (node !== 'COM') {
      let next = node
      while (next !== 'COM') {
        orbits++
        next = edges.get(next)
      }
    }
  }

  console.log('one:', orbits)
}

function two() {
  const start = edges.get('YOU')
  const end = edges.get('SAN')

  const distances = new Map()
  const edistances = new Map()

  let node = edges.get(start)
  distances.set(node, 1)
  getDistance(node, distances)

  node = edges.get(end)
  edistances.set(node, 1)
  getDistance(node, edistances)

  function getDistance(n, d) {
    while (n !== 'COM') {
      const child = edges.get(n)
      const f = d.get(n) + 1
      d.set(child, f)
      n = child
    }
  }

  const intersect = [...edistances.keys()].filter((node) => distances.has(node))[0]
  console.log('two:', distances.get(intersect) + edistances.get(intersect))
}

one()
two()
