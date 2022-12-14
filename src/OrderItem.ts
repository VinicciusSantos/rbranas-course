export default class OrderItem {
  constructor(
    readonly idItem: number,
    readonly price: number,
    readonly quantity: number
  ) {}

  public getTotal() {
    return this.quantity * this.price
  }
}
