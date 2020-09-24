import { observable } from 'mobx'
import {
    itemImages,
    MAGIC_LOG,
    MAHOGANY_LOG,
    MAPLE_LOG,
    OAK_LOG,
    STICK,
    TEAK_LOG,
    WILLOW_LOG,
    YEW_LOG,
} from '../images/itemImages'

export class ApplicationStore {
    @observable public bankStore = new BankStore()
}

export class InventoryItem {
    public count: number
    public id: string
    public icon: string

    constructor(item: Item, count: number) {
        this.count = count
        this.id = item.id
        this.icon = item.icon
    }
}

class Item {
    public id: string
    public icon: string

    constructor(id) {
        this.icon = itemImages[id]
        this.id = id
    }
}

const ALL_ITEMS = {
    STICK: new Item(STICK),
    OAK_LOG: new Item(OAK_LOG),
    WILLOW_LOG: new Item(WILLOW_LOG),
    TEAK_LOG: new Item(TEAK_LOG),
    MAGIC_LOG: new Item(MAGIC_LOG),
    MAPLE_LOG: new Item(MAPLE_LOG),
    MAHOGANY_LOG: new Item(MAHOGANY_LOG),
    YEW_LOG: new Item(YEW_LOG),
}

class BankStore {
    @observable public items: { [key: string]: InventoryItem } = {}

    constructor() {
        // get items from save data
        // this.addItemToBank(OAK_LOG, 10)
        // this.addItemToBank(STICK, 10)
        // this.addItemToBank(WILLOW_LOG, 10)
        // this.addItemToBank(TEAK_LOG, 10)
        // this.addItemToBank(MAGIC_LOG, 12)
        // this.addItemToBank(MAPLE_LOG, 10)
        // this.addItemToBank(MAHOGANY_LOG, 10)
    }

    public addItemToBank = (itemId: string, count: number) => {
        let item = ALL_ITEMS[itemId]
        if (item == undefined) {
            throw Error('undefined item was querieed')
        }

        if (this.items[itemId] == undefined) {
            this.items[itemId] = new InventoryItem(item, count)
        } else {
            this.items[itemId].count += count
        }
    }
}
