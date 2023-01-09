
import OrderDAO from "../../application/dao/OrderDAO";
import GetOrder from "../../application/query/get_order/GetOrder";

export default class GetOrderController {
    constructor(readonly orderDao: OrderDAO){}

    async execute(params: any, body: any) {
        const getOrders = new GetOrder(this.orderDao)
        const getOrdersOutput = getOrders.execute(params.code)
        return getOrdersOutput
    }
}