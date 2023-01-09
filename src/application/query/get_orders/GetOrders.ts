import OrderDAO from "../../dao/OrderDAO";
import GetOrdersOutput from "./GetOrdersOutput";

export default class GetOrders {

    constructor (readonly orderDAO: OrderDAO) {}

    public async execute(): Promise<GetOrdersOutput> {
        const ordersData = await this.orderDAO.findAll()
        const getOrderOutput = new GetOrdersOutput()
        for (const orderData of ordersData) {
            getOrderOutput.addOrder(orderData.code, orderData.total)
        }
        return getOrderOutput 
    }
}