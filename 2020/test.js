const input = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4, 9].sort((a, b) => a - b)
// const input = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4, 9, 8].sort((a,b) => a - b)

const part1 = () => {
  const adaptors = [0, ...input, input[input.length - 1] + 3]
  const joltsDiffs = [0, 0, 0, 0]
  for (let i = 0; i < adaptors.length - 1; i += 1) {
    joltsDiffs[adaptors[i + 1] - adaptors[i]] += 1
  }
  return joltsDiffs[1] * joltsDiffs[3]
}

const part2 = () => {
  const adaptors = [0, ...input, input[input.length - 1] + 3]

  const paths = []
  for (let i = 0; i < adaptors.length - 1; i += 1) {
    if (adaptors[i + 1] - adaptors[i] === 1) {
      const ind = i
      // don't want to make another recursive function
      while (adaptors[i + 1] - adaptors[i] === 1) {
        i++
      }
      paths.push(i - ind + 1)
    }
  }
  const possibilities = paths.map((v) =>
    Array(v - 1)
      .fill(null)
      .reduce((a, b, i) => a + i, 1)
  )

  return possibilities.reduce((a, v) => a * v, 1)
}

console.log('-> part1', part1())
console.log('-> part2', part2())
