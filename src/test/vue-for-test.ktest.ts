import { expect } from 'chai'
import { suite, test} from 'mocha-typescript'

import ClassForTest from '@/Vue-for-test.vue'

@suite
class SimpleTest {

  private clazz: ClassForTest = new ClassForTest()

  @test('test')
  public test4() {
    let a = 0
    a = a + 9
    expect(a).to.equals(9)
    this.clazz = undefined
  }

  //@test('1 - 1')
  public test() {
//    const result: number = this.clazz.sub(1, 1)
//    expect(result).to.equals(0)
  }

  //@test('10 - 1')
  public test2() {
//    const result: number = this.clazz.sub(10, 1)
//    expect(result).to.equals(9)
  }
}

export {SimpleTest}
