import GetOrders from "../../src/application/usecase/get_orders/GetOrders";
import PlaceOrder from "../../src/application/usecase/place_order/PlaceOrder";
import OrderRepository from "../../src/domain/repository/OrderRepository";
import PgPromiseConnectionAdapter from "../../src/infra/database/PgPromiseConnectionAdapter";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase";

let orderRepository: OrderRepository;
let placeOrder: PlaceOrder;
let getOrders: GetOrders;

let connection = new PgPromiseConnectionAdapter();

beforeEach(async () => {
  orderRepository = new OrderRepositoryDatabase(connection); 
  const repositoryFactory = new DatabaseRepositoryFactory(connection);
  placeOrder = new PlaceOrder(repositoryFactory);
  getOrders = new GetOrders(repositoryFactory)
});

test("deve obter todos os pedidos", async () => {
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
  await placeOrder.execute(input);
  const getOrderOutput = await getOrders.execute()
  expect(getOrderOutput.orders).toHaveLength(1)
});

afterEach(async () => {
  await orderRepository.clear();
})
