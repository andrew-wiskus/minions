import { observable, computed } from 'mobx'
import { ApplicationStore } from './applicationStore'
import { MiningSaveData } from '../models/saveDataModels'
import { getLevelFromEXP, getNextLevelXP } from '../models/levelXpData'
import { ALL_MINING_SPOTS, miningMinionCraftRequirements } from '../config/miningConfig'
import { MiningSpot } from '../models/MiningSpot'

let BASE_MINIONS = 50
export class MiningStore {
    private applicationStore: ApplicationStore
    private taskKey = 'MINING_ORE'

    @observable public miningData: { [key: string]: MiningSpot } = {}
    @observable public minionLevel = 0
    @observable public xp = 0

    @computed
    public get totalMinions() {
        return BASE_MINIONS + this.minionLevel
    }

    @computed
    public get nextMinionCraft() {
        return miningMinionCraftRequirements[this.minionLevel]
    }

    @computed
    public get usedMinions(): number {
        let count = 0

        Object.keys(this.miningData).forEach((key) => {
            count += this.miningData[key].minions
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

    public incMinionToMining(key: string, amount: number) {
        let mining = this.miningData[key]
        if (mining === undefined) {
            throw Error('mining queried but none found')
        }

        let count = mining.minions + amount
        let availableMinions = this.totalMinions - this.usedMinions

        if (amount > availableMinions) {
            alert("you don't have enough minions. craft more")
            return
        }

        if (count >= 0) {
            mining.minions = count
        }
    }

    private onUpdate = (timeDelta: number) => {
        // this.save()
        Object.keys(this.miningData).forEach((key) => {
            let mining = this.miningData[key]

            if (mining.minions > 0) {
                let currentTime = mining.timeElapsed
                currentTime = currentTime + timeDelta
                if (currentTime > mining.getTimePerCycle()) {
                    //check if multiple cycles have happened
                    let cycleCount = Math.floor(currentTime / mining.getTimePerCycle())
                    let xpCount = mining.xpPer * cycleCount

                    this.onMiningCycle(mining.resource_id, xpCount, cycleCount)

                    let leftOver = currentTime % mining.getTimePerCycle()
                    mining.timeElapsed = leftOver
                } else {
                    mining.timeElapsed = currentTime
                }
            }
        })
    }

    private onMiningCycle = (key: string, xpCount: number, cycleCount: number) => {
        // add xp
        // add to bank
        this.xp += xpCount
        this.applicationStore.bankStore.addItemToBank(key, cycleCount)
    }

    private getDataToSave = (): MiningSaveData => {
        let miningData = {}

        Object.keys({ ...this.miningData }).forEach((key) => {
            miningData[key] = this.miningData[key].getSaveData()
        })

        let saveData: MiningSaveData = {
            taskKey: this.taskKey,
            minionLevel: this.minionLevel,
            miningData: miningData,
            xp: this.xp,
        }

        return saveData
    }

    private loadData = (data: MiningSaveData) => {
        Object.keys(data).forEach((key) => {
            if (data[key] !== undefined) {
                // sorry mom, but this is what I get for using classes in javascript
                // I had to serialize the IMining from Mining to save to string, so this turns it back into class
                // also probably a better way.
                // but currently! its working
                if (key === 'miningData') {
                    let miningData = {}
                    Object.keys(data[key]).forEach((k) => {
                        miningData[k] = new MiningSpot(data[key][k])
                    })

                    this[key] = miningData
                } else {
                    this[key] = data[key]
                }
            }
        })
    }

    constructor(applicationStore: ApplicationStore) {
        this.applicationStore = applicationStore
        this.miningData = ALL_MINING_SPOTS
        applicationStore.addUpdateFunction(this.taskKey, this.onUpdate)
        applicationStore.addSaveFunction(this.taskKey, this.getDataToSave)

        let loadedData = applicationStore.loadSaveData(this.taskKey)
        this.loadData(loadedData)
    }
}
