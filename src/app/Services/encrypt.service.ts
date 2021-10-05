import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {PrivateKeyService} from "./private-key.service";

@Injectable({
  providedIn: 'root'
})
export class EncryptService {


  constructor(private privateKey : PrivateKeyService) {
  }

  encode(value: string) {
    return CryptoJS.AES.encrypt(value.trim(), this.privateKey.getPrivateKey().trim()).toString();
  }

  decode(value: string) {
    return CryptoJS.AES.decrypt(value.trim(), this.privateKey.getPrivateKey().trim()).toString(CryptoJS.enc.Utf8);
  }
}
