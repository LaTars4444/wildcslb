#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
const crypto = require('crypto');

// Usage: node scripts/encrypt.js "plaintext" "passphrase"
const [,, plaintext, passphrase] = process.argv;
if (!plaintext || !passphrase) {
  console.error('Usage: node scripts/encrypt.js "plaintext" "passphrase"');
  process.exit(2);
}

// Derive a 32-byte key from the passphrase using scrypt
const key = crypto.scryptSync(passphrase, 'wildcs_salt', 32);
const iv = crypto.randomBytes(12);
const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
const tag = cipher.getAuthTag();

const payload = Buffer.concat([iv, tag, encrypted]).toString('base64');
console.log(payload);

// To decrypt: use the passphrase and split iv (12), tag (16), rest is ciphertext
