import { getinput } from '../utils'

const entries = getinput(__dirname, './seven.txt', false)

const bags = new Map()
entries.map((entry) => {
  const [bag, contain] = entry.split(' contain ')
  const res = new Map()
  contain.split(',').map((b) => {
    const r = /(\d)(.*)bags?/gim.exec(b.trim())
    if (r) {
      const [, ...b] = r.map((s) => s.trim())
      res.set(b[1], b[0])
    }
  })
  bags.set(bag.replace(/bags?/gim, '').trim(), res)
})

function one() {
  const res = new Set()
  function scan(key: string) {
    for (let [k, v] of bags.entries())
      if (v.has(key)) {
        res.add(k)
        scan(k)
      }
  }
  scan('shiny gold')

  console.log('one:', res.size)
}
function two() {
  let res = 0
  function scan(key: string, times: number) {
    const f = bags.get(key)
    for (let [k, v] of f.entries()) {
      const j = parseInt(v, 10)
      scan(k, times * j)
      res += times * j
    }
  }
  scan('shiny gold', 1)
  console.log('two:', res)
}

one()
two()
