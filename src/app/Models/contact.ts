export class Contact {
  id: number;
  name: string;
  surname: string;
  email: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: number, name: string, surname: string, email: string, message: string, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.message = message;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

}
