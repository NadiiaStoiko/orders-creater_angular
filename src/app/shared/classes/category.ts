export class Category {
  id: number;
  type: string;
  url: string;
  description: string;

  constructor(id: number, type: string, url: string, description: string) {
    this.id = id;
    this.type = type;
    this.url = url;
    this.description = description;
  }
}
