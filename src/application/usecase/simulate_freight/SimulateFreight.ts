import FreightCalculator from "../../../domain/entity/FreightCalculator";
import ItemRepository from "../../../domain/repository/ItemRepository";
import SimulateFreightInput from "./SimulateFreightInput";
import SimulateFreightOutput from "./SimulateFreightOutput";

export default class SimulateFreight {

    constructor (readonly itemRespository: ItemRepository, readonly freightCalculator: FreightCalculator) {
    }

    async execute(input: SimulateFreightInput): Promise<SimulateFreightOutput> {
        let amount = 0;
        for (const inputItem of input.items) {
            const item = await this.itemRespository.findById(inputItem.idItem)
            if (!item) throw new Error("Item not found")
            amount += this.freightCalculator.calculate(item) * inputItem.quantity
        }
        return new SimulateFreightOutput(amount)
    }
}