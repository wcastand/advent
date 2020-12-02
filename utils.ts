import { readFileSync } from 'fs'
import { resolve } from 'path'

export function getinput(dir: string, src: string): number[]
export function getinput(dir: string, src: string, parse: true): number[]
export function getinput(dir: string, src: string, parse: true, reg: RegExp): number[]
export function getinput(dir: string, src: string, parse: false): string[]
export function getinput(dir: string, src: string, parse: false, reg: RegExp): string[]
export function getinput(dir, src, parse = true, reg = /\n/gim) {
  const content = readFileSync(resolve(dir, src), 'utf-8')
  const res: string[] = content.split(reg)
  if (parse) return res.map((s) => parseInt(s, 10))
  return res
}

export function getValue(mode: number, value: number, entries: number[]) {
  return mode === 1 ? value : entries[value]
}

export function intcode(
  values: number[],
  input: number,
  setting: number,
  index: number = 0,
  out: number = 0
): [number, number, number[], boolean, boolean] {
  let firstInput = true
  let output = out
  let v = Array.from([...values])
  let i = index
  let done = false

  while (!done && i < v.length) {
    const instruction = v[i]
    const op = Math.floor(instruction % 100)
    const mode1 = Math.floor((instruction / 100) % 100)
    const mode2 = Math.floor(instruction / 1000)

    let f = 0,
      s = 0,
      out = 0

    switch (op) {
      case 1:
        f = getValue(mode1, v[i + 1], v)
        s = getValue(mode2, v[i + 2], v)
        out = v[i + 3]
        // console.log(op, f, s, out)
        v[out] = f + s
        i += 4
        break
      case 2:
        f = getValue(mode1, v[i + 1], v)
        s = getValue(mode2, v[i + 2], v)
        out = v[i + 3]
        // console.log(op, f, s, out)
        v[out] = f * s
        i += 4
        break
      case 3:
        out = v[i + 1]
        // console.log(op, out, firstInput)
        if (firstInput) {
          firstInput = false
          v[out] = setting
        } else v[out] = input
        i += 2
        break
      case 4:
        const p = getValue(mode1, v[i + 1], v)
        // console.log('out', p)
        output = p
        return [p, i + 2, v, firstInput, done]
      case 5:
        f = getValue(mode1, v[i + 1], v)
        s = getValue(mode2, v[i + 2], v)
        // console.log(op, f, s, out)
        if (f !== 0) i = s
        else i += 3
        break
      case 6:
        f = getValue(mode1, v[i + 1], v)
        s = getValue(mode2, v[i + 2], v)
        // console.log(op, f, s, out)
        if (f === 0) i = s
        else i += 3
        break
      case 7:
        f = getValue(mode1, v[i + 1], v)
        s = getValue(mode2, v[i + 2], v)
        out = v[i + 3]
        // console.log(op, f, s, out)
        v[out] = f < s ? 1 : 0
        i += 4
        break
      case 8:
        f = getValue(mode1, v[i + 1], v)
        s = getValue(mode2, v[i + 2], v)
        out = v[i + 3]
        // console.log(op, f, s, out)
        v[out] = f === s ? 1 : 0
        i += 4
        break
      default:
        if (op !== 99) console.log('unknown', op)
        // console.log('end', output)
        done = true
        break
    }
  }
  return [output, i, v, firstInput, done]
}
