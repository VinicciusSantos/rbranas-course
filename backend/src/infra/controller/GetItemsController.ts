import GetItems from "../../application/usecase/get_items/GetItems";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";

export default class GetItemsController {
  constructor(readonly respositoryFactory: RepositoryFactory) {}

  public async execute(params: any, body: any) {
    const getItemsUsecase = new GetItems(this.respositoryFactory)
    return getItemsUsecase.execute()
  }
}
