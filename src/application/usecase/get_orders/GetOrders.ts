import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import OrderRepository from "../../../domain/repository/OrderRepository";
import GetOrdersOutput from "./GetOrdersOutput";

export default class GetOrders {
    orderRepository: OrderRepository

    constructor(readonly repositoryFactory: RepositoryFactory) {
        this.orderRepository = this.repositoryFactory.createOrderRepository()
    }

    async execute(): Promise<GetOrdersOutput> {
        const orders = await this.orderRepository.findAll();
        const getOrdersOutput = new GetOrdersOutput()
        for (let order of orders) {
            getOrdersOutput.addOrder(order.getCode(), order.getTotal())
        }
        return getOrdersOutput
    }
}