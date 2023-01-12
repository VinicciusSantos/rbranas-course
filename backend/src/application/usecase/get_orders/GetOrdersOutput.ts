export default class GetOrdersOutput {
  orders: { code: string, total: number }[] = [];

  addOrder(code: string, total: number) {
    this.orders.push({ code, total })
  }
}
