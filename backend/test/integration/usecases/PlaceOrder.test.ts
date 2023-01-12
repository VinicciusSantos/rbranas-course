import PlaceOrder from "../../../src/application/usecase/place_order/PlaceOrder";
import OrderRepository from "../../../src/domain/repository/OrderRepository";
import PgPromiseConnectionAdapter from "../../../src/infra/database/PgPromiseConnectionAdapter";
import DatabaseRepositoryFactory from "../../../src/infra/factory/DatabaseRepositoryFactory";
import OrderRepositoryDatabase from "../../../src/infra/repository/database/OrderRepositoryDatabase";

let orderRepository: OrderRepository;
let placeOrder: PlaceOrder;
let connection = new PgPromiseConnectionAdapter();

beforeEach(() => {
  orderRepository = new OrderRepositoryDatabase(connection); 
  const repositoryFactory = new DatabaseRepositoryFactory(connection);
  // const repositoryFactory = new MemoryRepositoryFactory()
  placeOrder = new PlaceOrder(repositoryFactory);
});

afterEach(async () => {
  await orderRepository.clear();
});

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
