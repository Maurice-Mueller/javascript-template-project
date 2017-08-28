// import {add} from '../main/typescript-for-test'
import {KeyManager} from '@/key-manager'

describe('key-manager', () => {
    it('generate-keys', () => {
      const keyManager = new KeyManager()
      keyManager.generateKeyPair()
    })
})
