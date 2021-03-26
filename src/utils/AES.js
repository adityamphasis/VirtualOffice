import '../.././shim.js';
import crypto from 'crypto';
import { Buffer } from 'buffer';

const algorithm = 'aes-256-cbc';
const password = '4AE0FcDXwLyy';
const salt = '$!rl@$b!';
const iv = 'e675f725e675f725';
const iterations = 2048;
const keylen = 32;

// Encrypt
export async function encryptData(inputString) {
  try {

    let cipher = crypto.createCipheriv(algorithm, crypto.pbkdf2Sync(password, salt, iterations, keylen, 'sha1'), iv);
    let encrypted = cipher.update(inputString);
    let encryptedText = Buffer.concat([encrypted, cipher.final()]);
    return encryptedText.toString('base64');

  } catch (e) {
    console.log('encryptData error', JSON.stringify(e.message));
    return null;
  }
}


// Decrypt
export async function decryptData(inputString) {

  try {

    let encryptedText = Buffer(inputString, 'base64');//Buffer.from(text, "base64");
    let decipher = crypto.createDecipheriv(algorithm, crypto.pbkdf2Sync(password, salt, iterations, keylen, 'sha1'), iv);
    decipher.setAutoPadding(true);
    let decrypted = decipher.update(encryptedText);
    let decryptedText = Buffer.concat([decrypted, decipher.final()]);

    return JSON.parse(decryptedText.toString());

  } catch (e) {
    console.log('decryptData error', JSON.stringify(e.message));
    return null;
  }

}
