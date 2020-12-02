const input = '156218-652527'

function onlygoingup(n: number) {
  const tmp = [...n.toString()].map((s) => parseInt(s, 10))
  return tmp.reduce((acc, x, idx, arr) => idx === 0 || (acc && x >= arr[idx - 1]), true)
}

function one() {
  const res = []
  for (let i = 156218; i <= 652527; ++i)
    if (onlygoingup(i) && new Set([...i.toString()]).size !== 6) res.push(i)

  console.log('one:', res.length)
}
function two() {
  const res = []
  for (let i = 156218; i <= 652527; ++i)
    if (onlygoingup(i) && new Set([...i.toString()]).size !== 6)
      if (
        Object.values(
          [...i.toString()].reduce<{ [key: string]: number }>(
            (acc, x) => ({ ...acc, [x]: (acc[x] || 0) + 1 }),
            {}
          )
        ).includes(2)
      )
        res.push(i)

  console.log('two:', res.length)
}

one()
two()
