

import CryptoJS from 'crypto-js'

export function encryptAES(message: string, secretKey: string) {
    const encryptedMessage = CryptoJS.AES.encrypt(message, secretKey);
    return encryptedMessage.toString();
}


export function decryptAES(encryptedMessage: string, secretKey: string) {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, secretKey);
    const decryptedMessage = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedMessage;
}

const keySecret = "a6d699663asdada6d699663e41823175ed0a0c31948203e41823175ed0a0c31948203";
       
// Función para encriptar
export function fuctionRef(msj:string) { 
    const msjEcr = encryptAES(msj, keySecret)
   
    return msjEcr.toString();
}

export function DesfuctionRef(msj:string) { 
    const msjEcr = decryptAES(msj, keySecret)
   
    return msjEcr.toString();
}