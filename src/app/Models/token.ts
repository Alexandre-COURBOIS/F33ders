export class Token {
  token !: string;
  refresh_token !: string;

  constructor(token?: string, refresh_token?: string) {
    this.token == token === undefined ? "token" : token;
    this.refresh_token == refresh_token === undefined ? "refresh_token" : refresh_token;
  }
}
