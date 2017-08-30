# libsodium

* based on branch Vue.js with TypeScript
<!-- * `npm install node-gyp -g`
* `npm install sodium --save-dev`
  * https://github.com/paixaop/node-sodium -->
* `npm install js-nacl --save-dev`
* add to `config/webpack/webpack.test.conf.ts`
  * ```
    node: {
      fs: 'empty'
    }
    ```
* add `libsodium.d.ts`
  * `declare module 'js-nacl'`
* key-manager.ts
  * ```
    import * as nacl_factory from 'js-nacl'

    export class KeyManager {

     private nacl: any

     constructor() {
       nacl_factory.instantiate((nacl: any) => {
         this.nacl = nacl
         console.log('key manager instantiated')
       })
     }

     public generateKeyPair(): void  {
       const sender = this.nacl.crypto_box_keypair()
       const receiver = this.nacl.crypto_box_keypair()
       console.log('sender: ' + JSON.stringify(sender))
       console.log('receiver: ' + JSON.stringify(receiver))

       const message = this.nacl.encode_utf8('Hello libsodium!')
       const nonce = this.nacl.crypto_box_random_nonce()
       const encryptedMessage = this.nacl.crypto_box(message, nonce, receiver.boxPk, sender.boxSk)
       console.log('encryptedMessage: ' + encryptedMessage)

       const decodedMessage = this.nacl.crypto_box_open(encryptedMessage, nonce, sender.boxPk, receiver.boxSk)
       console.log('decodedMessage: ' + decodedMessage)
       console.log('decodedMessage (utf8): ' + this.nacl.decode_utf8(decodedMessage))
     }
    }
    ```

== ALTERNATIVE
* `npm install tweetnacl`
* use as in the following
  * ```
    import * as nacl from 'tweetnacl'

    const keyPair: nacl.BoxKeyPair = nacl.box.keyPair()
    ```
