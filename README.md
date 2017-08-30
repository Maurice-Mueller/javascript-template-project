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
* `npm install tweetnacl --save-dev`
* use as in the following
  * ```
    import * as nacl from 'tweetnacl'

    const keyPair: nacl.BoxKeyPair = nacl.box.keyPair()
    ```
* a encoder / decoder is needed for string <-> Uint8Array
  * `npm install text-encoding @types/text-encoding --save-dev`
  * use it like this
    * ```
      import * as nacl from 'tweetnacl'
      import * as Encoding from 'text-encoding'

      const textEncoder = new Encoding.TextEncoder("utf-8")
      const textDecoder = new Encoding.TextDecoder("utf-8")

      const message: string = "test"
      //nonce is 24 byte long (default)
      const nonce: string = "012345678901234567890123" // alternative: nacl.randomBytes(24)

      // PUBLIC KEY AUTHENTICATED
      // ENCRYPT
      let utf8message = textEncoder.encode(message)
      let utf8nonce = textEncoder.encode(nonce)
      const encryptedMessage = nacl.box(utf8message, utf8nonce,
        keyPair1.publicKey, keyPair2.secretKey)

      // DECRYPT
      let decryptedMessage: string = null
      let utf8nonce = this.textEncoder.encode(this.nonce)
      let utf8message = nacl.box.open(encryptedMessage, utf8nonce,
        this.keyPair2.publicKey, this.keyPair1.secretKey)
      if(!utf8message) {
        decryptedMessage = "Geheimer Schlüssel falsch oder Nachricht nicht authentifiziert."
        return
      }
      decryptedMessage = this.textDecoder.decode(utf8message)



      // SYMMETRIC (obviously, use a shared symmetric key that is NOT your secret key)
      // ENCRYPT
      let utf8message = this.textEncoder.encode(message)
      let utf8nonce = nacl.randomBytes(24)
      const encryptedMessage = nacl.secretbox(utf8message, utf8nonce,
        keyPair1.secretKey)

      //DECRYPT
      let utf8message = nacl.secretbox.open(encryptedMessage, utf8nonce,
         keyPair1.secretKey)
      if(!utf8message) {
        message = "Geheimer Schlüssel falsch oder Nachricht nicht authentifiziert."
        done()
      }
      message = this.textDecoder.decode(utf8message)
      ```
