/**
 * Created by yuexing on 2017/11/16.
 * 常用的加密解密方法
 */
import CryptoJS from "crypto-js";

const AESkey = "doracms_";
const MD5key = "dora";
export default {
	AES: {
		encrypt: (messageOpen) => {//加密
			return CryptoJS.AES.encrypt(messageOpen, AESkey, {
				mode: CryptoJS.mode.CBC,
				padding: CryptoJS.pad.Pkcs7
			}).toString();
		},
		decrypt: (encrypt) => {//解密
			return CryptoJS.AES.decrypt(encrypt, AESkey, {
				mode: CryptoJS.mode.CBC,
				padding: CryptoJS.pad.Pkcs7
			}).toString(CryptoJS.enc.Utf8);
		}
	},
	Base64: {
		stringify: (messageOpen) => {
			let base64Str = new Buffer(messageOpen).toString('base64');
			return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Base64.parse(base64Str));
		}
	},
	SHA: {
		SHA1: (messageOpen) => {
			return CryptoJS.SHA1(messageOpen).toString();
		}
	},
	MD5: (str) => {
		return CryptoJS.MD5(MD5key + str).toString();
	}
};


