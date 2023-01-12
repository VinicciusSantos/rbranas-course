import StockEntry from "../../../domain/entity/StockEntry";
import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import stockEntryRepository from "../../../domain/repository/StockEntryRepository";
import SaveStockInput from "./SaveStockInput";

export default class SaveStock {
  stockEntryRepository: stockEntryRepository;

  constructor(readonly respositoryFactory: RepositoryFactory) {
    this.stockEntryRepository = respositoryFactory.createStockEntryRepository();
  }

  async execute(input: SaveStockInput): Promise<void> {
    this.stockEntryRepository.save(
      new StockEntry(input.idItem, input.operation, input.quantity, new Date())
    );
  }
}
