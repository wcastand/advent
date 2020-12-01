import { readFileSync } from 'fs'

export function getinput(src: string) {
  const content = readFileSync(src, 'utf-8')
  return content.split(/\n/gim).map((s) => parseInt(s, 10))
}
