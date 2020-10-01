import { observable } from 'mobx';
import { ApplicationStore } from './applicationStore';
import { BankSaveData } from '../models/saveDataModels';
import {
    ALL_ITEMS,
    ARBUCK_SEED,
    AVACADO_SEED,
    AVANTOE_SEED,
    BAR_BERRY_SEED,
    BLOODWEED_SEED,
    CABBAGE_SEED,
    CADANTINE_SEED,
    CADAVA_BERRY_SEED,
    CORN_SEED,
    DWARF_WEED_SEED,
    DWELL_BERRY_SEED,
    FELLSTALK_SEED,
    GUAM_SEED,
    HARRALANDER_SEED,
    IRIT_SEED,
    JANGER_BERRY_SEED,
    KWUARM_SEED,
    LANTADYME_SEED,
    LYCHEE_SEED,
    MANGO_SEED,
    MARRENTILL_SEED,
    ONION_SEED,
    POTATO_SEED,
    RANARR_SEED,
    RED_BERRY_SEED,
    SNAPDRAGON_SEED,
    STRAWBERRY_SEED,
    TARROMIN_SEED,
    TOADFLAX_SEED,
    TOMATO_SEED,
    TORSTOL_SEED,
    WATERMELON_SEED,
    WERGALI_SEED,
    WHITE_BERRY_SEED,
} from '../config/itemConfig';
import { InventoryItem } from '../models/Item';

export class BankStore {
    @observable public items: InventoryItem[] = [];
    private applicationStore: ApplicationStore;
    private taskKey = 'BANK_INVENTORY';

    private loadData = (data: BankSaveData) => {
        if (data.items === undefined) {
            return;
        }

        this.items = data.items.map((x) => new InventoryItem(x.id, x.count));
    };

    private saveData = () => {
        let items = [];
        let copy = [...this.items];
        copy.forEach((x) => {
            items.push({
                id: x.id,
                count: x.count,
            });
        });

        return {
            taskKey: this.taskKey,
            items: items,
        };
    };

    constructor(applicationStore: ApplicationStore) {
        this.applicationStore = applicationStore;
        this.applicationStore.addSaveFunction(this.taskKey, this.saveData);
        let data = this.applicationStore.loadSaveData(this.taskKey);
        this.loadData(data);

        this.addItemToBank(POTATO_SEED, 10);
        this.addItemToBank(ONION_SEED, 10);
        this.addItemToBank(CABBAGE_SEED, 10);
        this.addItemToBank(TOMATO_SEED, 10);
        this.addItemToBank(CORN_SEED, 10);
        this.addItemToBank(STRAWBERRY_SEED, 10);
        this.addItemToBank(WATERMELON_SEED, 10);
        this.addItemToBank(RED_BERRY_SEED, 10);
        this.addItemToBank(CADAVA_BERRY_SEED, 10);
        this.addItemToBank(DWELL_BERRY_SEED, 10);
        this.addItemToBank(JANGER_BERRY_SEED, 10);
        this.addItemToBank(WHITE_BERRY_SEED, 10);
        this.addItemToBank(BAR_BERRY_SEED, 10);
        this.addItemToBank(AVACADO_SEED, 10);
        this.addItemToBank(MANGO_SEED, 10);
        this.addItemToBank(LYCHEE_SEED, 10);
        this.addItemToBank(GUAM_SEED, 10);
        this.addItemToBank(MARRENTILL_SEED, 10);
        this.addItemToBank(TARROMIN_SEED, 10);
        this.addItemToBank(HARRALANDER_SEED, 10);
        this.addItemToBank(RANARR_SEED, 10);
        this.addItemToBank(TOADFLAX_SEED, 10);
        this.addItemToBank(IRIT_SEED, 10);
        this.addItemToBank(WERGALI_SEED, 10);
        this.addItemToBank(AVANTOE_SEED, 10);
        this.addItemToBank(KWUARM_SEED, 10);
        this.addItemToBank(BLOODWEED_SEED, 10);
        this.addItemToBank(SNAPDRAGON_SEED, 10);
        this.addItemToBank(CADANTINE_SEED, 10);
        this.addItemToBank(LANTADYME_SEED, 10);
        this.addItemToBank(ARBUCK_SEED, 10);
        this.addItemToBank(DWARF_WEED_SEED, 10);
        this.addItemToBank(TORSTOL_SEED, 10);
        this.addItemToBank(FELLSTALK_SEED, 10);
    }

    public getItem = (key: string) => {
        let item = this.items.find((x) => x.id === key);

        if (item === undefined) {
            let empty_item = ALL_ITEMS[key];

            if (empty_item === undefined) {
                throw Error('undefined item was querried');
            }

            return empty_item;
        }

        return item;
    };

    public addItemToBank = (itemId: string, count: number) => {
        let itemIndex = this.items.findIndex((x) => x.id === itemId);

        if (itemIndex === -1) {
            let empty_item = ALL_ITEMS[itemId] as InventoryItem;
            if (empty_item === undefined) {
                throw Error('undefined item was querieed');
            }
            empty_item.incrementValueBy(count);
            this.items.push(empty_item);
            return;
        }

        this.items[itemIndex].incrementValueBy(count);
    };
}
