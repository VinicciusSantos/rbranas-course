import Coupon from "./Coupon";
import Cpf from "./Cpf";
import DefaultFreightCalculator from "./DefaultFreightCalculator";
import FreightCalculator from "./FreightCalculator";
import Item from "./Item";
import OrderItem from "./OrderItem";

export default class Order {
  cpf: Cpf;
  orderItems: OrderItem[];
  coupon: Coupon | undefined;
  private freight: number;

  constructor(
    cpf: string,
    readonly date: Date = new Date(),
    readonly freightCalculator: FreightCalculator = new DefaultFreightCalculator()
  ) {
    this.cpf = new Cpf(cpf);
    this.orderItems = [];
    this.freight = 0;
  }

  public getTotal(): number {
    let total = 0;
    for (const orderItem of this.orderItems) total += orderItem.getTotal();
    if (this.coupon) {
      total -= this.coupon.calculateDiscount(total);
    }
    total += this.getFreight()
    return total;
  }

  public addItem(item: Item, quantity: number) {
    const freight = this.freightCalculator.calculate(item);
    this.freight += freight * quantity;
    this.orderItems.push(new OrderItem(item.idItem, item.price, quantity));
  }

  public addCoupon(coupon: Coupon) {
    if (coupon.isExpired(this.date)) return;
    this.coupon = coupon;
  }

  public getFreight(): number {
    return this.freight;
  }
}
