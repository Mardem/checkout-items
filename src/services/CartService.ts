import { Cart } from './interfaces/iCart';
import { LocalStorage } from 'quasar';
import { ProductType } from 'src/types/product';
export default class CartService implements Cart {
  itemsKey = 'itemsCart';

  /**
   * Insert a item on localStorage
   * @param item
   */
  add(item: ProductType, quantity: number): { status: boolean } {
    const cart = LocalStorage.getItem(this.itemsKey) as ProductType[];
    item.quantity = 1;
    cart == null
      ? LocalStorage.set(this.itemsKey, [item])
      : this.updateItem(item, quantity);

    return { status: true };
  }

  clear() {
    LocalStorage.remove(this.itemsKey);
    return true;
  }

  /**
   * Get all items from cart
   */
  get() {
    return LocalStorage.getItem(this.itemsKey);
  }

  /**
   * This function update a item on localStorage finded by ID
   * @param item
   * @param quantity
   */
  updateItem(item: ProductType, quantity: number) {
    const items = LocalStorage.getItem(this.itemsKey) as ProductType[];
    let newItem = true;

    items.forEach((val, index) => {
      if (val._id == item._id) {
        items[index].quantity = quantity;
        newItem = false;

        if (items[index].quantity == 0) {
          items.splice(index, 1);
        }
      }
    });
    if (newItem) items.push(item);
    LocalStorage.set(this.itemsKey, items);
  }
}
