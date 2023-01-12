import Coupon from "./Coupon";
import Cpf from "./Cpf";
import DefaultFreightCalculator from "./DefaultFreightCalculator";
import FreightCalculator from "./FreightCalculator";
import Item from "./Item";
import OrderCode from "./OrderCode";
import OrderItem from "./OrderItem";

export default class Order {
  private cpf: Cpf;
  private code: OrderCode;
  private orderItems: OrderItem[];
  coupon: Coupon | undefined;
  private freight: number;
 
  constructor(
    cpf: string,
    readonly date: Date = new Date(),
    readonly freightCalculator: FreightCalculator = new DefaultFreightCalculator(),
    readonly sequence: number = 1
  ) {
    this.cpf = new Cpf(cpf);
    this.orderItems = [];
    this.freight = 0;
    this.code = new OrderCode(date, sequence);
  }

  public getCpf(): Cpf { return this.cpf }

  public getOrderItems(): OrderItem[] { return this.orderItems }

  public getCouponCode(): string | undefined { return this.coupon?.code }

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

  public getCode(): string {
    return this.code.value
  }
}
