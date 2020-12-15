import { getinput } from '../utils'

const [x, entries] = getinput(__dirname, './thirteen.txt', false)
// const [x, entries] = ['939', '7,13,x,x,59,x,31,19']

function one() {
  const time = parseInt(x, 10)
  const buses = entries
    .split(',')
    .filter((x) => x !== 'x')
    .map((x) => parseInt(x, 10))
  const hash = new Map()
  buses.forEach((bus) => {
    const start = Math.ceil(time / bus)
    hash.set(bus * start, bus)
  })
  const s = Math.min(...hash.keys())
  console.log('one:', hash.get(s), hash.get(s) * (s - time))
}

function two() {
  const buses: [number, number][] = []
  entries.split(',').forEach((x, idx) => {
    if (x !== 'x') buses.push([idx, parseInt(x, 10)])
  })
  let t = 10000000
  console.log(buses)
  while (true) {
    let i = 0
    for (; i < buses.length; ++i) if ((t + buses[i][0]) % buses[i][1] !== 0) break
    if (i === buses.length) break
    else t++
  }
  console.log('two:', t)
}

// one()
two()
