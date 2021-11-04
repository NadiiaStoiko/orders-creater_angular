import { Pipe, PipeTransform } from '@angular/core';
import { Dish } from '../classes/dish';

@Pipe({
  name: 'filtration',
})
// export class FiltrationPipe implements PipeTransform {
//   transform(dishes: Dish[], type: string): Dish[] {
//     return dishes.filter((dish) => {
//       return dish.category == type;
//     });
//   }
// }
export class FiltrationPipe implements PipeTransform {
  transform(dishes: Dish[], id: number): Dish[] {
    if (dishes === undefined) {
      return [];
    }
    return dishes.filter((dish) => {
      return dish.categoryId == id;
    });
  }
}
