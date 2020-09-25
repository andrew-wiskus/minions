import { observable } from 'mobx'
import { ApplicationStore } from './applicationStore'
import { BankSaveData } from '../models/saveDataModels'
import { ALL_ITEMS } from '../config/itemConfig'
import { InventoryItem } from '../models/Item'

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
            return
        }

        this.items[itemIndex].incrementValueBy(count)
    }
}
