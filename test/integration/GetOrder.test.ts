import GetOrder from "../../src/application/usecase/get_order/GetOrder";
import PlaceOrder from "../../src/application/usecase/place_order/PlaceOrder";
import OrderRepository from "../../src/domain/repository/OrderRepository";
import PgPromiseConnectionAdapter from "../../src/infra/database/PgPromiseConnectionAdapter";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";

let placeOrder: PlaceOrder;
let orderRepository: OrderRepository;
let getOrder: GetOrder;

let connection = new PgPromiseConnectionAdapter();

beforeEach(async () => {
  const repositoryFactory = new DatabaseRepositoryFactory(connection);
  orderRepository = repositoryFactory.createOrderRepository()
  placeOrder = new PlaceOrder(repositoryFactory);
  getOrder = new GetOrder(repositoryFactory);
});

test("deve obter um pedido pelo código", async () => {
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
  const placeOrderOutput = await placeOrder.execute(input);
  const getOrderOutput = await getOrder.execute(placeOrderOutput.code);
  expect(getOrderOutput.total).toBe(138);
});

afterEach(async () => {
    await orderRepository.clear();
})