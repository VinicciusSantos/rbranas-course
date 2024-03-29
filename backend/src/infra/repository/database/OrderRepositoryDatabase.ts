import Coupon from "../../../domain/entity/Coupon";
import DefaultFreightCalculator from "../../../domain/entity/DefaultFreightCalculator";
import Item from "../../../domain/entity/Item";
import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";
import Connection from "../../database/Connection";

export default class OrderRepositoryDatabase implements OrderRepository {
  constructor(readonly connection: Connection) {}

  async save(order: Order): Promise<void> {
    const [orderData] = await this.connection.query(
      `insert into public.order 
            (code, cpf, issue_date, freight, sequence, coupon, total)
            values ($1, $2, $3, $4, $5, $6, $7) returning *`,
      [
        order.getCode(),
        order.getCpf(),
        order.date,
        order.getFreight(),
        order.sequence,
        order.getCouponCode(),
        order.getTotal(),
      ]
    );
    for (const orderItem of order.getOrderItems()) {
      await this.connection.query(
        `insert into public.order_item
              (id_item, id_order, price, quantity)
              values ($1, $2, $3, $4)`,
        [
          orderItem.idItem,
          orderData.id_order,
          orderItem.price,
          orderItem.quantity,
        ]
      );
    }
  }

  async get(code: string): Promise<Order> {
    const [orderDate] = await this.connection.query('select * from public.order where code = $1', [code])
    if(!orderDate) throw new Error('Order not found')
    const order = new Order(orderDate.cpf, orderDate.issue_date, new DefaultFreightCalculator(), orderDate.sequence)
    const orderItemsData = await this.connection.query('select * from public.order_item where id_order = $1', [orderDate.id_order])
    for(const orderItemData of orderItemsData) {
      const [itemData] = await this.connection.query('select * from public.item where id_item = $1', [orderItemData.id_item])
      const item = new Item(
        itemData.id_item, 
        itemData.category, 
        itemData.description, 
        orderItemData.price,
        itemData.width, 
        itemData.height, 
        itemData.length, 
        itemData.weight)
      order.addItem(item, orderItemData.quantity)
    }
    if(orderDate.coupon) {
      const [couponDate] = await this.connection.query('select * from public.coupon where code = $1', [orderDate.coupon])
      const coupon = new Coupon(couponDate.code, couponDate.percentage, couponDate.expire_date)
      order.addCoupon(coupon) 
    }
    return order
  }

  async findAll(): Promise<Order[]> {
    let orders: Order[] = []
    const ordersData = await this.connection.query("select * from public.order")
    for (const orderData of ordersData) {
      const order = await this.get(orderData.code)
      orders.push(order)
    }
    return orders
  }

  async count(): Promise<number> {
    const [orderData] = await this.connection.query(
      "SELECT count(*)::int as count from public.order"
    );
    return orderData.count;
  }

  async clear(): Promise<void> {
    await this.connection.query("delete from public.order", []);
    await this.connection.query("delete from public.order_item", []);
    return Promise.resolve()
  }
}
