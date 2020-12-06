import { getinput } from '../utils'

const entries = getinput(__dirname, './six.txt', false, /\n\n/gim).map((entry) =>
  entry.split(/\n/gim)
)
function one() {
  const aa = entries.map((entry) => {
    const answers = new Set()
    entry.map((line) => line.split('').map((letter) => answers.add(letter)))
    return answers.size
  })
  console.log(
    'one:',
    aa.reduce((acc, x) => acc + x)
  )
}
function two() {
  const aa = entries.map((entry) => {
    const answers = new Map()
    entry.map((line) => {
      line.split('').map((letter) => answers.set(letter, (answers.get(letter) ?? 0) + 1))
    })
    let res = 0
    for (let i of answers.keys()) if (answers.get(i) === entry.length) res++
    return res
  })
  console.log(
    'two:',
    aa.reduce((acc, x) => acc + x)
  )
}

one()
two()
