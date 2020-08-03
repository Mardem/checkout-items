export interface Cart {
  add(item: object, quantity: number): { status: boolean };
  get(): any;
}
