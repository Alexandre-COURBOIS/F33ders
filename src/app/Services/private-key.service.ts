import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrivateKeyService {

  constructor() { }


  privateKey = "080595030995310817";

  getPrivateKey() {
    return this.privateKey;
  }
}
