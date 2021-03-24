// var CryptoJS = require("crypto-js");
// import CryptoJS from "react-native-crypto-js";
// import Buffer from 'buffer';

// import CryptoJS from "crypto-js";
// import * as CryptoJS from 'crypto-js'

// import React, { PropTypes } from 'react'
// import { NativeModules } from 'react-native';
// var Aes = NativeModules.Aes;

const algorithm = 'aes-256-cbc';
const password = '4AE0FcDXwLyy';
const salt = '$!rl@$b!';
const iv = 'e675f725e675f725';

// var crypto = require('crypto');

// import crypto from 'crypto';
// import crypto from 'crypto-browserify';

import '../.././shim.js';
import crypto from 'crypto';
import { Buffer } from 'buffer';

// Encrypt
export async function encryptData(inputString) {
  const ciphertext = CryptoJS.AES.encrypt(inputString, 'secret key 123').toString();
  return ciphertext;
}


// Decrypt
export async function decryptData(inputString) {

  try {

    let encryptedText = Buffer(inputString, 'base64');//Buffer.from(text, "base64");
    let decipher = crypto.createDecipheriv(algorithm, crypto.pbkdf2Sync(password, salt, 65536, 256 / 8, 'sha1'), iv);
    decipher.setAutoPadding(true);
    let decrypted = decipher.update(encryptedText);
    let decryptedText = Buffer.concat([decrypted, decipher.final()]);

    return decryptedText.toString();


  } catch (e) {
    console.log('decryptData error', JSON.stringify(e.message));
    return null;
  }

}

const generateKey = (password, salt, cost, length) => Aes.pbkdf2(password, salt, cost, length)

const decryptChiper = (encryptedData, key) => Aes.decrypt(encryptedData.cipher, key, encryptedData.iv)

const encryptChiper = (text, key) => {
  return Aes.randomKey(16).then(iv => {
    return Aes.encrypt(text, key, iv).then(cipher => ({
      cipher,
      iv,
    }))
  })
}