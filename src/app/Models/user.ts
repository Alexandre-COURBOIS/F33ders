export class User {
  id: number;
  username: string;
  userpseudo: string;
  email: string;
  password: string;
  token: string;
  resetToken: string;
  resetTokenAt: Date;
  role: [];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date

  constructor(id: number, username: string,userpseudo: string, email: string, password: string, token: string, resetToken: string, resetTokenAt: Date, role: [], isActive: boolean, createdAt: Date, updatedAt: Date) {

    this.id = id;
    this.username = username;
    this.userpseudo = userpseudo;
    this.email = email;
    this.password = password;
    this.token = token;
    this.resetToken = resetToken;
    this.resetTokenAt = resetTokenAt;
    this.role = role;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

}
