// import {add} from '../main/typescript-for-test'
import {add} from '@/typescript-for-test'

describe('TypeScript WebPack Starter Tests', () => {
    it('A good way to start building an awesome lib is by doing Unit Tests 👌🏽', () => {
        console.log('hello test: ' + add(9, 9))
        let a = 0
        a = a + 9
        expect(a).to.equals(9)
    })
})
