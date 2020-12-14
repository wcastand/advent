import { getinput } from '../utils'

const entries = getinput(__dirname, './twelve.txt', false)
// const entries = ['F10', 'N3', 'F7', 'R90', 'F11']

enum Instructions {
  EAST = 'E',
  WEST = 'W',
  NORTH = 'N',
  SOUTH = 'S',
  LEFT = 'L',
  RIGHT = 'R',
  FORWARD = 'F',
}

enum Direction {
  EAST = 0,
  SOUTH = 1,
  WEST = 2,
  NORTH = 3,
}

function one() {
  let x = 0,
    y = 0,
    direction = Direction.EAST
  for (let [op, value] of entries.map<[string, number]>((entry) => [
    entry.substr(0, 1),
    parseInt(entry.substr(1), 10),
  ])) {
    switch (op) {
      case Instructions.EAST:
        x += value
        break
      case Instructions.WEST:
        x -= value
        break
      case Instructions.NORTH:
        y += value
        break
      case Instructions.SOUTH:
        y -= value
        break
      case Instructions.LEFT:
        direction = (direction - value / 90 + 4) % 4
        break
      case Instructions.RIGHT:
        direction = (direction + value / 90) % 4
        break
      case Instructions.FORWARD:
        if (direction === Direction.EAST) x += value
        if (direction === Direction.WEST) x -= value
        if (direction === Direction.NORTH) y += value
        if (direction === Direction.SOUTH) y -= value
        break
    }
  }
  console.log('one:', Math.abs(x) + Math.abs(y))
}

function two() {
  let waypoint = [10, -1]
  let ship = [0, 0]
  for (let [op, value] of entries.map<[string, number]>((entry) => [
    entry.substr(0, 1),
    parseInt(entry.substr(1), 10),
  ])) {
    switch (op) {
      case Instructions.EAST:
        waypoint = [waypoint[0] + value, waypoint[1]]
        break
      case Instructions.WEST:
        waypoint = [waypoint[0] - value, waypoint[1]]
        break
      case Instructions.NORTH:
        waypoint = [waypoint[0], waypoint[1] - value]
        break
      case Instructions.SOUTH:
        waypoint = [waypoint[0], waypoint[1] + value]
        break
      case Instructions.LEFT:
        waypoint = [
          waypoint[0] * Math.cos((-1 * value * Math.PI) / 180) -
            waypoint[1] * Math.sin((-1 * value * Math.PI) / 180),
          waypoint[1] * Math.cos((-1 * value * Math.PI) / 180) +
            waypoint[0] * Math.sin((-1 * value * Math.PI) / 180),
        ]
        break
      case Instructions.RIGHT:
        waypoint = [
          waypoint[0] * Math.cos((value * Math.PI) / 180) -
            waypoint[1] * Math.sin((value * Math.PI) / 180),
          waypoint[1] * Math.cos((value * Math.PI) / 180) +
            waypoint[0] * Math.sin((value * Math.PI) / 180),
        ]
        break
      case Instructions.FORWARD:
        ship = [ship[0] + waypoint[0] * value, ship[1] + waypoint[1] * value]
        break
    }
  }
  console.log('two:', Math.ceil(Math.abs(ship[0]) + Math.abs(ship[1])))
}

one()
two()
