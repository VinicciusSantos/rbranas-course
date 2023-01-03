import PlaceOrder from "../../src/application/usecase/place_order/PlaceOrder";
import CouponRepository from "../../src/domain/repository/CouponRepository";
import ItemRepository from "../../src/domain/repository/ItemRepository";
import OrderRepository from "../../src/domain/repository/OrderRepository";
import PgPromiseConnectionAdapter from "../../src/infra/database/PgPromiseConnectionAdapter";
import CouponRepositoryDatabase from "../../src/infra/repository/database/CouponRepositoryDatabase";
import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepositoryDatabase";
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase";

let itemRepository: ItemRepository;
let orderRepository: OrderRepository;
let couponRepository: CouponRepository;
let placeOrder: PlaceOrder;
let connection = new PgPromiseConnectionAdapter()

beforeEach(() => {
  itemRepository = new ItemRepositoryDatabase(connection);
  orderRepository = new OrderRepositoryDatabase(connection);
  couponRepository = new CouponRepositoryDatabase(connection);

  placeOrder = new PlaceOrder(
    itemRepository,
    orderRepository,
    couponRepository
  );
});

afterEach(async () => {
  await orderRepository.clear()
})

test("deve fazer um pedido", async () => {
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
  expect(output.total).toBe(138);
});

test("deve fazer um pedido com calculo do frete", async () => {
  const input = {
    cpf: "839.435-452-10",
    orderItems: [
      { idItem: 4, quantity: 1 },
      { idItem: 5, quantity: 1 },
      { idItem: 6, quantity: 3 },
    ],
    date: new Date("2022-12-10"),
  };
  const output = await placeOrder.execute(input);
  expect(output.total).toBe(6350);
});

test("deve fazer um pedido com código", async () => {
  const input = {
    cpf: "839.435-452-10",
    orderItems: [
      { idItem: 4, quantity: 1 },
      { idItem: 5, quantity: 1 },
      { idItem: 6, quantity: 3 },
    ],
    date: new Date("2022-12-10"),
  };
  const output = await placeOrder.execute(input);
  expect(output.code).toBe("202200000001");
});
