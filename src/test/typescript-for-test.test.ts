import { expect } from 'chai'
import { suite, test} from 'mocha-typescript'

import {add} from '../main/typescript-for-test'

@suite
class SimpleTest {

  @test('1 + 1')
  public test() {
    const result: number = add(1, 1)
    expect(result).to.equals(2)
  }

  @test('10 + 1')
  public test2() {
    const result: number = add(10, 1)
    expect(result).to.equals(11)
  }
}

export {SimpleTest}
