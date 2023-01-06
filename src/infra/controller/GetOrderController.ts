import GetOrder from "../../application/usecase/get_order/GetOrder";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";

export default class GetOrderController {
    constructor(readonly repositoryFactory: RepositoryFactory){}

    async execute(params: any, body: any) {
        const getOrders = new GetOrder(this.repositoryFactory)
        const getOrdersOutput = getOrders.execute(params.code)
        return getOrdersOutput
    }
}