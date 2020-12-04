import { readFileSync } from 'fs'
import { resolve } from 'path'

export function getinput<T = number>(dir: string, src: string): T[]
export function getinput<T = number>(dir: string, src: string, parse: true): T[]
export function getinput<T = number>(dir: string, src: string, parse: true, reg: RegExp): T[]
export function getinput<T = string>(dir: string, src: string, parse: false): T[]
export function getinput<T = string>(dir: string, src: string, parse: false, reg: RegExp): T[]
export function getinput(dir, src, parse = true, reg = /\n/gim) {
  const content = readFileSync(resolve(dir, src), 'utf-8')
  const res: string[] = content.split(reg)
  if (parse) return res.map((s) => parseInt(s, 10))
  return res
}
