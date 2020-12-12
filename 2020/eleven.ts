import { getinput } from '../utils'

// const entries = getinput(__dirname, './eleven.txt', false).map((entry) => entry.split(''))
const entries = [
  'L.LL.LL.LL',
  'LLLLLLL.LL',
  'L.L.L..L..',
  'LLLL.LL.LL',
  'L.LL.LL.LL',
  'L.LLLLL.LL',
  '..L.L.....',
  'LLLLLLLLLL',
  'L.LLLLLL.L',
  'L.LLLLL.LL',
].map((entry) => entry.split(''))

function getadjseats(x: number, y: number, extended: boolean, seats: string[][]) {
  if (extended) {
    // HORIZONTAL
    // LEFT
    const left = []
    for (let i = x + 1; i < seats[y].length; ++i)
      if (seats[y][i] !== '.') {
        left.push(seats[y][i])
        break
      }
    // RIGHT
    const right = []
    for (let i = x - 1; i > -1; --i)
      if (seats[y][i] !== '.') {
        right.push(seats[y][i])
        break
      }
    // VERTICAL
    // DOWN
    const down = []
    for (let i = y + 1; i < seats.length; ++i)
      if (seats[i][x] !== '.') {
        down.push(seats[i][x])
        break
      }
    // UP
    const up = []
    for (let i = y - 1; i > -1; --i)
      if (seats[i][x] !== '.') {
        up.push(seats[i][x])
        break
      }

    // DIAGONAL
    let diags = []
    // UP RIGHT
    let j = 0
    let i = 0
    if (y > 0 && x < seats[j].length - 1) {
      j = y - 1 > 0 ? y - 1 : y
      i = x + 1 < seats[j].length - 1 ? x + 1 : x
      while (true) {
        if (seats[j][i] !== '.') {
          diags.push(seats[j][i])
          break
        }
        if (i === seats[j].length - 1 && j === 0) break
        if (i < seats[j].length - 1) i++
        if (j > 0) j--
      }
    }
    console.log('up right:', diags)
    // UP LEFT
    if (y > 0 && x > 0) {
      j = y - 1 > 0 ? y - 1 : y
      i = x - 1 > 0 ? x - 1 : x
      while (true) {
        if (seats[j][i] !== '.') {
          diags.push(seats[j][i])
          break
        }
        if (i === 0 && j === 0) break
        if (i > 0) i--
        if (j > 0) j--
      }
    }
    console.log('up left:', diags)
    // DOWN RIGHT
    if (y < seats.length - 1 && x < seats[j].length - 1) {
      j = y + 1 < seats.length - 1 ? y + 1 : y
      i = x + 1 < seats[j].length - 1 ? x + 1 : x
      while (true) {
        if (seats[j][i] !== '.') {
          diags.push(seats[j][i])
          break
        }
        if (x === 0 && y === 8) console.log(i, j, seats[j].length, seats.length)
        if (i === seats[j].length - 1 && j === seats.length - 1) break
        if (i < seats[j].length - 1) i++
        if (j < seats.length - 1) j++
      }
    }
    console.log('down right:', diags)
    // DOWN LEFT
    if (y < seats.length - 1 && x > 0) {
      j = y + 1 < seats.length - 1 ? y + 1 : y
      i = x - 1 > 0 ? x - 1 : x
      while (true) {
        if (seats[j][i] !== '.') {
          diags.push(seats[j][i])
          break
        }
        if (i === 0 && j === seats.length - 1) break
        if (i > 0) i--
        if (j < seats.length - 1) j++
      }
    }
    console.log('down left:', diags)

    console.log('left:', left)
    console.log('right:', right)
    console.log('up:', up)
    console.log('down:', down)
    return [...left, ...right, ...up, ...down, ...diags]
  }
  return [
    y > 0 && x > 0 ? seats[y - 1][x - 1] : null,
    y > 0 ? seats[y - 1][x] : null,
    y > 0 && x < seats[y].length - 1 ? seats[y - 1][x + 1] : null,
    x > 0 ? seats[y][x - 1] : null,
    x < seats[y].length - 1 ? seats[y][x + 1] : null,
    y < seats.length - 1 && x > 0 ? seats[y + 1][x - 1] : null,
    y < seats.length - 1 ? seats[y + 1][x] : null,
    y < seats.length - 1 && x < seats[y].length - 1 ? seats[y + 1][x + 1] : null,
  ].filter((x) => x !== null)
}

function print(seats: string[][]) {
  console.log('===============')
  console.log(seats.map((row) => row.join('')).join('\n'))
  console.log('===============')
}

function parse(tolerance: number, extented: boolean, entries: string[][]): string[][] {
  return entries.map((entry, y) =>
    entry.map((seat, x) => {
      const adj = getadjseats(x, y, extented, entries)
      console.log('log:', x, y, seat, adj)
      if (seat === '.') return '.'
      if (seat === 'L' && !adj.includes('#')) return '#'
      if (seat === '#' && adj.filter((x) => x === '#').length >= tolerance) return 'L'
      return seat
    })
  )
}
function seated(tolerance: number, extented: boolean, entries: string[][]) {
  let occupied = 0
  let seats = entries
  print(seats)
  while (true) {
    seats = parse(tolerance, extented, seats)
    print(seats)
    const tmp = seats.flat().reduce((acc, x) => (x === '#' ? acc + 1 : acc), 0)
    if (tmp === occupied) break
    else occupied = tmp
  }
  return occupied
}

function one() {
  const res = seated(4, false, entries)
  console.log('one:', res)
}
function two() {
  // const res = seated(5, true, entries)
  const r = parse(5, true, entries)
  // print(r)
  print(parse(5, true, r))
  console.log('two:', 0)
}

// one()
two()
