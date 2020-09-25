import { observable, computed } from 'mobx'
import { minionCraftRequirements, ALL_TREES } from '../config/woodCutting'
import { Tree } from '../models/Tree'
import { ApplicationStore } from './applicationStore'
import { WoodCuttingSaveData } from '../models/saveDataModels'
import { getLevelFromEXP, getNextLevelXP } from '../models/levelXpData'

let BASE_MINIONS = 50
export class WoodCuttingStore {
    private applicationStore: ApplicationStore
    private taskKey = 'WOOD_CUT'

    @observable public treeData: { [key: string]: Tree } = {}
    @observable public minionLevel = 0
    @observable public xp = 0

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

    @computed get levelCompletePercent(): number {
        let prevXP = getNextLevelXP(this.level - 1)
        let nextXP = getNextLevelXP(this.level)

        let amountMoved = this.xp - prevXP
        let amountNeeded = nextXP - prevXP
        let percent = amountMoved / amountNeeded

        return percent * 100
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

    private getDataForSave = () => {
        let treeData = {}

        Object.keys({ ...this.treeData }).forEach((key) => {
            treeData[key] = this.treeData[key].getSaveData()
        })

        let saveData: WoodCuttingSaveData = {
            taskKey: this.taskKey,
            minionLevel: this.minionLevel,
            treeData: treeData,
            xp: this.xp,
        }

        return saveData
    }

    private loadData = (data: WoodCuttingSaveData) => {
        Object.keys(data).forEach((key) => {
            if (data[key] !== undefined) {
                // sorry mom, but this is what I get for using classes in javascript
                // I had to serialize the ITree from Tree to save to string, so this turns it back into class
                // also probably a better way.
                // but currently! its working
                if (key === 'treeData') {
                    let treeData = {}
                    Object.keys(data[key]).forEach((k) => {
                        treeData[k] = new Tree(data[key][k])
                    })

                    this[key] = treeData
                } else {
                    this[key] = data[key]
                }
            }
        })
    }

    constructor(applicationStore: ApplicationStore) {
        this.applicationStore = applicationStore
        this.treeData = ALL_TREES
        applicationStore.addUpdateFunction(this.taskKey, this.onUpdate)
        applicationStore.addSaveFunction(this.taskKey, this.getDataForSave)

        let loadedData = applicationStore.loadSaveData(this.taskKey)
        this.loadData(loadedData)
    }
}
