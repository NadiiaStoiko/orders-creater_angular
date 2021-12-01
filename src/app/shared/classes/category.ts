import { Dish } from './dish';

export class Category {
  id: number;
  types: string;
  url: string;
  description: string;
  dishes?: Dish[];

  constructor(id: number, types: string, url: string, description: string) {
    this.id = id;
    this.types = types;
    this.url = url;
    this.description = description;
  }
}
