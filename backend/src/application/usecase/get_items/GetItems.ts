import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import ItemRepository from "../../../domain/repository/ItemRepository";
import GetItemsOutput from "./GetItemsOutput";

export default class GetItems {
  itemRepository: ItemRepository;

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.itemRepository = this.repositoryFactory.createItemRepository();
  }

  async execute(): Promise<GetItemsOutput> {
    const itemsData = await this.itemRepository.getAll();
    let getItemsOutput = new GetItemsOutput();
    for (let itemData of itemsData) {
      getItemsOutput.addItem(
        itemData.idItem,
        itemData.category,
        itemData.description,
        itemData.price
      );
    }
    return getItemsOutput;
  }
}
