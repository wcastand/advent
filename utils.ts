import { readFileSync } from 'fs'
import { resolve } from 'path'

export function getinput(dir: string, src: string) {
  const content = readFileSync(resolve(dir, src), 'utf-8')
  return content.split(/\n/gim).map((s) => parseInt(s, 10))
}
