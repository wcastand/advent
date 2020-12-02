import { intcode, getinput } from '../utils'

const entries = getinput(__dirname, './five.txt', true, /\,/gim)

function one() {
  intcode(entries, 1)
}
function two() {
  intcode(entries, 5)
}

// one()
two()
