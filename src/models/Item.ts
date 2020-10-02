import { observable } from 'mobx';
import { IBankItem, itemImages, ItemType } from '../config/itemConfig';

export class BankItem {
    @observable public count: number;
    public id: string;
    public icon: string;
    public itemType: ItemType;

    constructor(item: IBankItem) {
        this.icon = itemImages[item.id];
        this.id = item.id;
        this.count = item.count;
        this.itemType = item.itemType;
    }

    public incrementValueBy(delta: number) {
        if (this.count + delta < 0) {
            throw Error(`Tried to increment value of item (${this.id}) below 0! (c: ${this.count} + ${delta}`);
        }

        this.count += delta;
    }
}
