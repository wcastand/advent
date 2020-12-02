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
