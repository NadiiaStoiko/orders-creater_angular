export class Category {
  id: number;
  types: string;
  url: string;
  description: string;

  constructor(id: number, types: string, url: string, description: string) {
    this.id = id;
    this.types = types;
    this.url = url;
    this.description = description;
  }
}
