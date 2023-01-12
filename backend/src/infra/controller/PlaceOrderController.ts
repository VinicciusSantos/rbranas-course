import PlaceOrder from "../../application/usecase/place_order/PlaceOrder";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";

export default class PlaceOrderController {
  constructor(readonly respositoryFactory: RepositoryFactory) {}

  public async execute(params: any, body: any) {
    const placeorder = new PlaceOrder(this.respositoryFactory);
    const input = body;
    input.date = new Date(input.date);
    return placeorder.execute(input);
  }
}
