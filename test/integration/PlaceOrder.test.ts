import PlaceOrder from "../../src/application/usecase/PlaceOrder";
import CouponRepository from "../../src/domain/repository/CouponRepository";
import ItemRepository from "../../src/domain/repository/ItemRepository";
import OrderRepository from "../../src/domain/repository/OrderRepository";
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory";
import ItemRepositoryMemory from "../../src/infra/repository/memory/ItemRepositoryMemory";
import OrderRepositoryMemory from "../../src/infra/repository/memory/OrderRepositoryMemory";

let itemRepository: ItemRepository
let orderRepository: OrderRepository
let couponRepository: CouponRepository
  
beforeEach(() => {
  itemRepository = new ItemRepositoryMemory();
  orderRepository = new OrderRepositoryMemory()
  couponRepository = new CouponRepositoryMemory();
}) 

test("deve fazer um pedido", async () => {
  const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
  const input = {
    cpf: "839.435-452-10",
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
    date: new Date("2022-12-10"),
    coupon: "VALE20",
  };
  const output = await placeOrder.execute(input);
  expect(output.total).toBe(88);
});

test("deve fazer um pedido com calculo do frete", async () => {
  const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
  const input = {
    cpf: "839.435-452-10",
    orderItems: [
      { idItem: 4, quantity: 1 },
      { idItem: 5, quantity: 1 },
      { idItem: 6, quantity: 3 },
    ],
    date: new Date("2022-12-10")
  };
  const output = await placeOrder.execute(input);
  expect(output.total).toBe(6350);
});
