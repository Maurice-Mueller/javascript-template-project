import {expect} from 'chai'
import assert from 'assert'
import jsdom from 'jsdom'
const { JSDOM } = jsdom; //get the constructor

import fs from 'fs' //comes with nodeJS -> FileSystem access

describe('simple test', () => {
  it('true equals true', () => {
    expect(true).to.equal(true)
  }),
  it('simple math', () => {
    expect(1+2).to.equal(3)
  })
})

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4))
    })
  })
})

describe('DOM index.html', () => {
  it('should display hello', () => {
    const indexFile = fs.readFileSync('./src/index.html', 'utf-8')
    const dom = new JSDOM(indexFile)
    const heading = dom.window.document.getElementsByTagName('h1')[0]
    expect(heading.innerHTML).to.equal('Hello World!')
  })
})

describe('some async test', () => {
  it('simple test', (done) => { //callback for calling when test is done
    fs.readFile('./src/index.html', 'utf-8', file => { //async file read
      expect(true).to.equal(true)
      done() //tell mocha the test is done
    })
  })
})
