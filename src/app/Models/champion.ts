export class Champion {
  id: number;
  championId: string;
  key: number;
  name: string;
  resume: string;
  description: string;
  attack: number;
  defense: number;
  magic: number;
  difficulty: number;
  types: [];
  image: [];
  imageUrl: string;
  createdAt: Date;

  constructor(id: number, championId: string, key: number, name: string, resume: string, description: string, attack: number,
              defense: number, magic: number, difficulty: number, types: [], image: [], imageUrl: string, createdAt: Date) {

    this.id           = id;
    this.championId   = championId;
    this.key          = key;
    this.name         = name;
    this.resume       = resume;
    this.description  = description;
    this.attack       = attack;
    this.defense      = defense;
    this.magic        = magic;
    this.difficulty   = difficulty;
    this.types        = types;
    this.image        = image;
    this.imageUrl     = imageUrl;
    this.createdAt    = createdAt;
  }
}
