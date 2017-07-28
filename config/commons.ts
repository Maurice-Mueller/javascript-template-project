import * as open from 'open'
import * as path from 'path'

declare var __dirname: any

export function resolve(dir: any) {
  return path.join(__dirname, '..', dir)
}

export default {resolve, open}
