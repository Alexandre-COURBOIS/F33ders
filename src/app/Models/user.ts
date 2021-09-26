export class User {
  id: number;
  username: string;
  email: string;
  password: string

  constructor(id: number, username: string, email: string, password: string) {

    this.id = id === undefined ? 0 : id;
    this.username = username;
    this.email = email;
    this.password = password;
  }

}
