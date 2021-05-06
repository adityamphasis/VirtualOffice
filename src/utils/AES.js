// import '../.././shim.js';
import crypto from 'crypto';
import { Buffer } from 'buffer';

const algorithm = 'aes-256-cbc';
const password = '4AE0FcDXwLyy';
const salt = '$!rl@$b!';
const iv = 'e675f725e675f725';
const iterations = 2048;
const keylen = 32;

// Encrypt
export async function encryptData(inputString, iters) {
  try {

    iters = iters ? iters : iterations;

    let cipher = crypto.createCipheriv(algorithm, crypto.pbkdf2Sync(password, salt, iters, keylen, 'sha1'), iv);
    let encrypted = cipher.update(inputString);
    let encryptedText = Buffer.concat([encrypted, cipher.final()]);
    return encryptedText.toString('base64');

  } catch (e) {
    console.log('encryptData error', JSON.stringify(e.message));
    return null;
  }
}


// Decrypt
export async function decryptData(inputString, iters) {

  try {

    iters = iters ? iters : iterations;

    let encryptedText = Buffer(inputString, 'base64');//Buffer.from(text, "base64");
    let decipher = crypto.createDecipheriv(algorithm, crypto.pbkdf2Sync(password, salt, iters, keylen, 'sha1'), iv);
    decipher.setAutoPadding(true);
    let decrypted = decipher.update(encryptedText);
    let decryptedText = Buffer.concat([decrypted, decipher.final()]);

    return JSON.parse(decryptedText.toString());

  } catch (e) {
    console.log('decryptData error', JSON.stringify(e.message));
    return null;
  }

}

export async function rasData(){

  const bytestring = '30 82 01 0a 02 82 01 01 00 ea 0e bd 12 aa d5 42 71 a5 62 88 e1 cd 6b 87 aa 1b ce ed d8 2c 28 13 1b c9 6c ac 5e a7 1f 25 79 5a e8 2c ca d4 fa 30 6b 32 b0 3d 34 55 71 06 86 43 d4 1e 4d b6 23 11 42 38 3c 22 e5 f9 d6 7f 4b 07 b3 45 00 26 85 2a 73 16 99 fe bf 4a 9a e1 b4 79 aa f8 06 42 20 9f a1 2d 47 84 3b 7e c0 61 3a 9f 97 d9 cf 25 62 e4 2f cb 43 b0 2f b2 da a4 62 4c 46 42 e2 23 27 ef d9 20 1b 34 0e 22 70 c7 ec a0 93 eb af 30 1d e5 80 18 80 48 ae fe 0c 25 e6 11 7e 3f b5 c0 d4 f3 0f ae 6a 1e 23 f0 a9 96 1a 4d 1a f2 02 1c 7a 06 32 b5 c3 e3 fe 7f 8d 00 f7 80 36 73 cc 7b 64 f6 4f ae 6a 60 65 aa 33 0d e1 f2 f2 eb f1 32 cf e5 9b d3 9b b2 a4 18 ce ef c7 b1 eb de b5 7f 90 93 b5 02 06 e9 3d eb 1d 43 90 48 6e e6 4d e5 34 90 19 db 2a 29 72 71 3a 88 16 fe 1d 89 55 05 0c bd 9b 15 c9 25 9a 45 cb 99 91 02 03 01 00 01';
  const ara = bytestring.split(' ');


  const der = crypto.publicDecrypt('05 00', ara);

  return JSON.parse(der.toString());

}

