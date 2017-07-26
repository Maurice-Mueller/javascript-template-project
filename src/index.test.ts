import { expect } from 'chai'
import assert from 'assert'
import jsdom from 'jsdom'
console.log('jsdom: ' + jsdom)
const { JSDOM } = jsdom //get the constructor
import fs from 'fs' //comes with nodeJS -> FileSystem access
import { suite, test, timeout } from 'mocha-typescript'

@suite
class SimpleTest {

  @test('true equals true')
  trueEqualsTrue() {
    expect(true).to.equal(true)
  }

 @test('simple math')
  simpleMath() {
    expect(1 + 2).to.equal(3)
  }
}

@suite
class ArrayTest {

  @test('should return -1 when the value is not present')
  indexOfTest() {
    assert.equal(-1, [1,2,3].indexOf(4))
  }
}

@suite
class DOMTest {

  @test('should display hello')
  displayHelloTest() {
    const indexFile = fs.readFileSync('./src/index.html', 'utf-8')
    const dom = new JSDOM(indexFile)
    const heading = dom.window.document.getElementsByTagName('h1')[0]
    expect(heading.innerHTML).to.equal('Hello World!')
  }
}

@suite
class AsyncTest {

  @test
  simpleTest(done) {
    fs.readFile('./src/index.html', 'utf-8', () => { //async file read
      expect(true).to.equal(true)
      done() //tell mocha the test is done
    })
  }

  @test(timeout(1000))
  timeoutTest(done) {
    done
  }
}

export {SimpleTest, ArrayTest, DOMTest, AsyncTest}
