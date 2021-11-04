export class Dish {
  categoryId: number;
  name: string;
  url: string;
  weight: number;
  description: string;
  id: number;
  quantity?: number;
  price: number;

  constructor(
    categoryId: number,
    id: number,
    name: string,
    url: string,
    weight: number,
    description: string,
    quantity = 1,
    price: number
  ) {
    this.categoryId = categoryId;
    this.id = id;
    this.name = name;
    this.url = url;
    this.weight = weight;
    this.description = description;
    this.quantity = quantity;
    this.price = price;
  }
}
