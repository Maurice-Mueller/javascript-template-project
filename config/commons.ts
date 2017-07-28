import * as open from 'open'
import * as path from 'path'

declare var __dirname

export function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

export default {resolve, open}
