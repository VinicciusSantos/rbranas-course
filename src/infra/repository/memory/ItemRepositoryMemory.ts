import Item from "../../../domain/entity/Item";
import ItemRepository from "../../../domain/repository/ItemRepository";

export default class ItemRepositoryMemory implements ItemRepository {
    items: Item[]
    constructor () {
        this.items = [
            new Item(1, "Música", "CD", 30),
            new Item(1, "Video", "DVD", 50),
            new Item(1, "vídeo", "VHS", 10)
        ]
    }

    findById(idItem: number): Promise<Item> {
        return
    }
}