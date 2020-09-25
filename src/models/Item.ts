import { observable } from 'mobx'
import { itemImages } from '../config/itemConfig'

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
