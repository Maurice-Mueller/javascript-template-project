import { expect } from 'chai'
// import { suite, test} from 'mocha-typescript'

// import {ClassForTest} from '@/Vue-for-test.vue'
import ClassForTest from '@/Vue-for-test.vue'


describe('TypeScript WebPack Starter Tests', () => {
    it('A good way to start building an awesome lib is by doing Unit Tests 👌🏽', () => {

        let clazz: ClassForTest = new ClassForTest()
        expect(clazz.sub(9, 7)).to.equals(2)
    })
})
