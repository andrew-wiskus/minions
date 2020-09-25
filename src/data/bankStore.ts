import { observable } from 'mobx'
import {
    itemImages,
    STICK,
    OAK_LOG,
    WILLOW_LOG,
    TEAK_LOG,
    MAGIC_LOG,
    MAPLE_LOG,
    MAHOGANY_LOG,
    YEW_LOG,
} from '../images/itemImages'
import { ApplicationStore } from './applicationStore'
import { BankSaveData } from './saveDataModels'

export class InventoryItem {
    @observable public count: number
    public id: string
    public icon: string

    constructor(id, count) {
        this.icon = itemImages[id]
        this.id = id
        this.count = count
    }

    public incrementValueBy(delta: number) {
        if (this.count + delta < 0) {
            throw Error(`Tried to increment value of item (${this.id}) below 0! (c: ${this.count} + ${delta}`)
        }

        this.count += delta
    }
}

export const ALL_ITEMS = {
    [STICK]: new InventoryItem(STICK, 0),
    [OAK_LOG]: new InventoryItem(OAK_LOG, 0),
    [WILLOW_LOG]: new InventoryItem(WILLOW_LOG, 0),
    [TEAK_LOG]: new InventoryItem(TEAK_LOG, 0),
    [MAGIC_LOG]: new InventoryItem(MAGIC_LOG, 0),
    [MAPLE_LOG]: new InventoryItem(MAPLE_LOG, 0),
    [MAHOGANY_LOG]: new InventoryItem(MAHOGANY_LOG, 0),
    [YEW_LOG]: new InventoryItem(YEW_LOG, 0),
}

export class BankStore {
    @observable public items: InventoryItem[] = []
    private applicationStore: ApplicationStore
    private taskKey = 'BANK_INVENTORY'

    private loadData = (data: BankSaveData) => {
        if (data.items === undefined) {
            return
        }

        this.items = data.items.map((x) => new InventoryItem(x.id, x.count))
    }

    private saveData = () => {
        let items = []
        let copy = [...this.items]
        copy.forEach((x) => {
            items.push({
                id: x.id,
                count: x.count,
            })
        })

        return {
            taskKey: this.taskKey,
            items: items,
        }
    }

    constructor(applicationStore: ApplicationStore) {
        this.applicationStore = applicationStore
        this.applicationStore.addSaveFunction(this.taskKey, this.saveData)
        let data = this.applicationStore.loadSaveData(this.taskKey)
        this.loadData(data)
    }

    public getItem = (key: string) => {
        let item = this.items.find((x) => x.id === key)

        if (item === undefined) {
            let empty_item = ALL_ITEMS[key]

            if (empty_item === undefined) {
                throw Error('undefined item was querried')
            }

            return empty_item
        }

        return item
    }

    public addItemToBank = (itemId: string, count: number) => {
        let itemIndex = this.items.findIndex((x) => x.id === itemId)

        if (itemIndex === -1) {
            let empty_item = ALL_ITEMS[itemId] as InventoryItem
            if (empty_item === undefined) {
                throw Error('undefined item was querieed')
            }
            empty_item.incrementValueBy(count)
            this.items.push(empty_item)
        }

        this.items[itemIndex].incrementValueBy(count)
    }
}
