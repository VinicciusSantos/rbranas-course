import GetStock from "../../../src/application/usecase/get_stock/GetStock"
import SaveStock from "../../../src/application/usecase/save_stock/SaveStock"
import RepositoryFactory from "../../../src/domain/factory/RepositoryFactory"
import PgPromiseConnectionAdapter from "../../../src/infra/database/PgPromiseConnectionAdapter"
import DatabaseRepositoryFactory from "../../../src/infra/factory/DatabaseRepositoryFactory"

describe('Test get stock', () => {
    let repositoryFactory: RepositoryFactory
    const connection = new PgPromiseConnectionAdapter()
  
    beforeEach(async () => {
      repositoryFactory = new DatabaseRepositoryFactory(connection)
      await repositoryFactory.createStockEntryRepository().clear()
    })
  
    afterEach(async () => {
      await repositoryFactory.createStockEntryRepository().clear()
    })
  
    it('should get stock of an item', async () => {
      const saveStock = new SaveStock(repositoryFactory)
      const saveStockInputa = {
        idItem: 1,
        operation: 'in',
        quantity: 10
      }
      await saveStock.execute(saveStockInputa)
      const saveStockInputb = {
        idItem: 1,
        operation: 'out',
        quantity: 5
      }
      await saveStock.execute(saveStockInputb)
      const getStock = new GetStock(repositoryFactory)
      const total = await getStock.execute(1)
      expect(total).toBe(5)
    })
  })