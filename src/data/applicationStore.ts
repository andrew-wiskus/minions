import { computed, observable } from 'mobx'
import moment from 'moment'
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
import { ISaveData } from './saveDataStore'
import { ALL_TREES, minionCraftRequirements, Tree } from './woodcuttingData'
import { getLevelFromEXP, getNextLevelXP } from './_level_xp'

export class ApplicationStore {
    @observable public bankStore: BankStore = new BankStore(this)
    @observable public woodcuttingStore: WoodCuttingStore = new WoodCuttingStore(this)
    private updateFunctions: { [taskKey: string]: (timeDelta: number) => void } = {}

    private lastUpdatedTime = 0

    public addUpdateFunction = (key: string, updateFunc: (timeDelta: number) => void) => {
        this.updateFunctions[key] = updateFunc
    }

    private loopOnRender = () => {
        const timeStamp = moment().valueOf()
        let fps = Math.floor(1000 / 60)

        if (this.lastUpdatedTime + fps < timeStamp) {
            this.runUpdateLoop(timeStamp - this.lastUpdatedTime)
            this.lastUpdatedTime = timeStamp
        }

        requestAnimationFrame(this.loopOnRender)
    }

    private runUpdateLoop = (timeDelta: number) => {
        Object.keys(this.updateFunctions).forEach((key) => {
            this.updateFunctions[key](timeDelta)
        })
    }

    constructor() {
        this.saveData()
        this.loopOnRender()
    }

    private saveData = () => {
        var saveData: ISaveData = { testing: 123 }
        var encoded = btoa(JSON.stringify(saveData))

        localStorage.setItem('saveData', encoded)
    }

    private loadData = () => {
        let encodedData = ''
        var data = JSON.parse(atob(encodedData)) as ISaveData
        console.log('data!: ' + data.testing)
    }
}

export abstract class AGatherSkill {
    public abstract level: number
    public abstract xp: number
    public abstract minionLevel: number
}

let BASE_MINIONS = 50
export class WoodCuttingStore {
    private applicationStore: ApplicationStore

    @observable public treeData: { [key: string]: Tree } = {}
    @observable public minionLevel = 0
    @observable public xp = 2000

    @computed
    public get totalMinions() {
        return BASE_MINIONS + this.minionLevel
    }

    @computed
    public get nextMinionCraft() {
        return minionCraftRequirements[this.minionLevel]
    }

    @computed
    public get usedMinions(): number {
        let count = 0

        Object.keys(this.treeData).forEach((key) => {
            count += this.treeData[key].minions
        })

        return count
    }

    @computed
    public get level(): number {
        return getLevelFromEXP(this.xp)
    }

    @computed get nextLevelXp(): number {
        return getNextLevelXP(this.level)
    }

    public craftMinion = () => {
        let recipie = this.nextMinionCraft
        var canBuy = 1

        Object.keys(recipie).forEach((key) => {
            let item = this.applicationStore.bankStore.getItem(key)
            if (item.count < recipie[key]) {
                canBuy = 0
            }
        })

        if (canBuy === 0) {
            alert('you dont have enough resources!')
            return
        }

        Object.keys(recipie).forEach((key) => {
            this.applicationStore.bankStore.addItemToBank(key, recipie[key] * -1)
        })

        this.minionLevel += 1
        // save.
    }

    public incMinionToTree(key: string, amount: number) {
        let tree = this.treeData[key]
        if (tree === undefined) {
            throw Error('tree queried but none found')
        }

        let count = tree.minions + amount
        let availableMinions = this.totalMinions - this.usedMinions

        if (amount > availableMinions) {
            alert("you don't have enough minions. craft more")
            return
        }

        if (count >= 0) {
            tree.minions = count
        }
    }

    private onUpdate = (timeDelta: number) => {
        // this.save()
        Object.keys(this.treeData).forEach((key) => {
            let tree = this.treeData[key]

            if (tree.minions > 0) {
                let currentTime = tree.timeElapsed
                currentTime = currentTime + timeDelta
                if (currentTime > tree.getTimePerCycle()) {
                    //check if multiple cycles have happened
                    let cycleCount = Math.floor(currentTime / tree.getTimePerCycle())
                    let xpCount = tree.xpPer * cycleCount

                    this.onTreeCycle(tree.resource_id, xpCount, cycleCount)

                    let leftOver = currentTime % tree.getTimePerCycle()
                    tree.timeElapsed = leftOver
                } else {
                    tree.timeElapsed = currentTime
                }
            }
        })
    }

    private onTreeCycle = (key: string, xpCount: number, cycleCount: number) => {
        // add xp
        // add to bank
        this.xp += xpCount
        this.applicationStore.bankStore.addItemToBank(key, cycleCount)
    }

    constructor(applicationStore: ApplicationStore) {
        // get save state from last tree data
        // super()
        this.applicationStore = applicationStore
        this.treeData = ALL_TREES
        applicationStore.addUpdateFunction('WOOD_CUTTIING', this.onUpdate)
    }
}

export class InventoryItem {
    @observable public count: number
    public id: string
    public icon: string

    constructor(id) {
        this.icon = itemImages[id]
        this.id = id
        this.count = 0
    }

    public incrementValueBy(delta: number) {
        if (this.count + delta < 0) {
            throw Error(`Tried to increment value of item (${this.id}) below 0! (c: ${this.count} + ${delta}`)
        }

        this.count += delta
    }
}

const ALL_ITEMS = [
    new InventoryItem(STICK),
    new InventoryItem(OAK_LOG),
    new InventoryItem(WILLOW_LOG),
    new InventoryItem(TEAK_LOG),
    new InventoryItem(MAGIC_LOG),
    new InventoryItem(MAPLE_LOG),
    new InventoryItem(MAHOGANY_LOG),
    new InventoryItem(YEW_LOG),
]

class BankStore {
    @observable private _items: InventoryItem[] = [...ALL_ITEMS]
    private applicationStore: ApplicationStore

    @computed public get items() {
        // return this._items.filter((x) => x.count !==0)
        return this._items
    }

    constructor(applicationStore: ApplicationStore) {
        this.applicationStore = applicationStore
    }

    public getItem = (key: string) => {
        let item = this._items.find((x) => x.id === key)

        if (item === undefined) {
            throw Error('undefined item was querried')
        }

        return item
    }

    public addItemToBank = (itemId: string, count: number) => {
        let itemIndex = this._items.findIndex((x) => x.id === itemId)

        if (itemIndex === -1) {
            throw Error('undefined item was querieed')
        }

        this._items[itemIndex].incrementValueBy(count)
    }
}
