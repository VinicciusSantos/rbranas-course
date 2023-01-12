import OrderDAO from "../../application/dao/OrderDAO";
import SimulateFreight from "../../application/usecase/simulate_freight/SimulateFreight";
import DefaultFreightCalculator from "../../domain/entity/DefaultFreightCalculator";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import GetOrderController from "../controller/GetOrderController";
import GetOrdersController from "../controller/GetOrdersController";
import PlaceOrderController from "../controller/PlaceOrderController";
import Http from "./Http";

export default class RouteConfig {
  constructor(http: Http, repositoryFactory: RepositoryFactory, orderDao: OrderDAO) {
    http.on("/orders", "post", async function (params: any, body: any) {
      const placeOrderController = new PlaceOrderController(repositoryFactory);
      return placeOrderController.execute(params, body);
    });

    http.on(
      "/simulateFreight",
      "post",
      async function (params: any, body: any) {
        const simulateFreight = new SimulateFreight(
          repositoryFactory.createItemRepository(),
          new DefaultFreightCalculator()
        );
        const input = body;
        return simulateFreight.execute(input);
      }
    );

    http.on("/orders", "get", async function (params: any, body: any) {
      const getOrdersController = new GetOrdersController(orderDao);
      return getOrdersController.execute(params, body);
    });

    http.on("/orders/:code", "get", async function (params: any, body: any) {
      const getOrderController = new GetOrderController(orderDao);
      return getOrderController.execute(params, body);
    });
  }
}
