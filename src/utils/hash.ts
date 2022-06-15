import CryptoJS from 'crypto-js'

export const md5 = (Message: string) => CryptoJS.MD5(Message).toString()
