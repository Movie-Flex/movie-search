const crypto = require('crypto');
const fs = require('fs').promises;

async function readKeys() {
    try {
        const [privateKey, publicKey] = await Promise.all([
            fs.readFile('privateKey.pem', 'utf8'),
            fs.readFile('publicKey.pem', 'utf8')
        ]);
        return { privateKey, publicKey };
    } catch (err) {
        console.error('Error reading file:', err);
        return { privateKey: null, publicKey: null };
    }
}

function encryptPassword(password, publicKey) {
    const buffer = Buffer.from(password, 'utf-8');
    return crypto.publicEncrypt({
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
    }, buffer).toString('base64');
}

function decryptPassword(encryptedPassword, privateKey) {
    const buffer = Buffer.from(encryptedPassword, 'base64');
    return crypto.privateDecrypt({
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
    }, buffer).toString('utf-8');
}

module.exports = { readKeys, encryptPassword, decryptPassword };
