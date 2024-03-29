import StockEntry from "../../../domain/entity/StockEntry"
import StockEntryRepository from "../../../domain/repository/StockEntryRepository"
import Connection from "../../database/Connection"

export default class StockEntryRepositoryDatabase implements StockEntryRepository {
  constructor(readonly connection: Connection) {}

  async getByIdItem(idItem: number): Promise<StockEntry[]> {
    const stockEntriesData = await this.connection.query('select * from public.stock_entry where id_item = $1', [idItem]) 
    const stockEntries: StockEntry[] = []
    for(const stockEntryData of stockEntriesData) {  
      stockEntries.push(new StockEntry(
        stockEntryData.id_item, 
        stockEntryData.operation, 
        stockEntryData.quantity, 
        stockEntryData.date
      ))
    }
    return stockEntries
  } 
   
  async save(stockEntry: StockEntry): Promise<void> {
    await this.connection.query(
      `insert into public.stock_entry (id_item, operation, quantity, date) 
      values ($1, $2, $3, $4)`, 
      [stockEntry.idItem, stockEntry.operation, stockEntry.quantity, stockEntry.date]
    )
  }

  async clear(): Promise<void> {
    await this.connection.query('delete from public.stock_entry', [])
  }
}