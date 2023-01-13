export default class GetItemsOutput {
  items: {
    readonly idItem: number;
    readonly category: string;
    readonly description: string;
    readonly price: number;
  }[] = [];

  public addItem(
    idItem: number,
    category: string,
    description: string,
    price: number
  ) {
    this.items.push({ idItem, category, description, price });
  }
}
