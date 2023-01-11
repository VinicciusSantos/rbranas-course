import Order from "../../../domain/entity/Order";
import PlaceOrderInput from "./PlaceOrderInput";
import PlaceOrderOutput from "./PlaceOrderOutput";
import DefaultFreightCalculator from "../../../domain/entity/DefaultFreightCalculator";
import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import ItemRepository from "../../../domain/repository/ItemRepository";
import CouponRepository from "../../../domain/repository/CouponRepository";
import OrderRepository from "../../../domain/repository/OrderRepository";
import StockEntry from "../../../domain/entity/StockEntry";
import stockEntryRepository from "../../../domain/repository/StockEntryRepository";

export default class PlaceOrder { 
  itemRepository: ItemRepository;
  couponRepository: CouponRepository;
  orderRepository: OrderRepository;
  stockEntryRepository: stockEntryRepository;

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.itemRepository = repositoryFactory.createItemRepository()
    this.couponRepository = repositoryFactory.createCouponRepository()
    this.orderRepository = repositoryFactory.createOrderRepository()
    this.stockEntryRepository = repositoryFactory.createStockEntryRepository()
  }

  async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
    const sequence = await this.orderRepository.count() +1
    const order = new Order(input.cpf, input.date, new DefaultFreightCalculator(), sequence);
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.findById(orderItem.idItem);
      if (!item) throw new Error("Item not found");
      order.addItem(item, orderItem.quantity);
    }
    if (input.coupon) {
      const coupon = await this.couponRepository.findByCode(input.coupon)
      if (coupon) order.addCoupon(coupon)
    }
    await this.orderRepository.save(order)

    for (const orderItem of input.orderItems) {
      this.stockEntryRepository.save(new StockEntry(orderItem.idItem, "out", orderItem.quantity, order.date))
    }

    const total = order.getTotal();
    const output = new PlaceOrderOutput(order.getCode(), total);
    return output;
  }
}
