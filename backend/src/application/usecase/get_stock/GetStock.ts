import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import StockCalculator from "../../../domain/service/StockCalculator";

export default class GetStock {
    stockEntryRepository: any;

    constructor (readonly repositoryFactory: RepositoryFactory) {
        this.stockEntryRepository = repositoryFactory.createStockEntryRepository()
    }

    async execute(idItem: number): Promise<number> {
        const stockEntries = await this.stockEntryRepository.getByIdItem(idItem)
        const calculator = new StockCalculator()
        return calculator.calculate(stockEntries)
    }
}