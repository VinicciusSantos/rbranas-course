import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";

export default class OrderRepositoryMemory implements OrderRepository {
    orders: Order[];
    constructor () {
        this.orders = []
    }

    count(): Promise<number> {
        return Promise.resolve(this.orders.length)
    }

    save(order: Order): Promise<void> {
        this.orders.push(order)
        return Promise.resolve()
    }

    clear(): Promise<void> {
        this.orders = []
        return Promise.resolve()
    }
}