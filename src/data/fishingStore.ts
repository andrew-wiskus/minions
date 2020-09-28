import { computed, observable } from "mobx"
import { ALL_FISHING_SPOTS } from "../config/fishingConfig"
import { FishingSpot } from "../models/FishingSpot"
import { getLevelFromEXP, getNextLevelXP } from "../models/levelXpData"
import { FishingSaveData } from "../models/saveDataModels"
import { ApplicationStore } from "./applicationStore"


let BASE_MINIONS = 50

export class FishingStore {
    private applicationStore: ApplicationStore
    private taskKey = "FISHING_DATA"

    @observable public fishingData: { [fishingSpotKey: string]: FishingSpot} = {}
    @observable public minionLevel = 0
    @observable public xp = 0

    @computed
    public get usedMinions(): number {
        let count = 0

        Object.keys(this.fishingData).forEach((key) => {
            count += this.fishingData[key].minions
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
    
    @computed
    public get totalMinions() {
        return BASE_MINIONS + this.minionLevel
    }

    private onUpdate = (timeDelta: number) => {
        // console.log("updating: ", timeDelta)
        
        Object.keys(this.fishingData).forEach(key => {
            let fishingSpot = this.fishingData[key]

            if(fishingSpot.minions > 0) {
                let currentTime = fishingSpot.timeElapsed
                currentTime = currentTime + timeDelta

                if(currentTime > fishingSpot.currentCycleSpeed) {
                    // cycled!
                    // mom, there is an exploit here to refresh at low cycle times and pause rendering.
                    let cycleCount = Math.floor(currentTime / fishingSpot.currentCycleSpeed)

                    this.onFishingCycle(fishingSpot, cycleCount)
                    
                    let leftOver = currentTime % fishingSpot.currentCycleSpeed
                    fishingSpot.timeElapsed = leftOver
                    fishingSpot.updateCycleSpeed()
                } else {
                    fishingSpot.timeElapsed = currentTime
                }
            }
        })
    }

    private onFishingCycle(fishingSpot: FishingSpot, cycleCount: number) {
        let caught = fishingSpot.getFishForCatch()
        this.applicationStore.bankStore.addItemToBank(caught.resource_id, cycleCount)
        this.xp += caught.xp * cycleCount
    }

    private getDataForSave = (): FishingSaveData => {
        
        let fishingData = {}

        Object.keys({...this.fishingData}).forEach((key) => {
            fishingData[key] = this.fishingData[key].getSaveData()
        })

        return {
            taskKey: this.taskKey,
            minionLevel: this.minionLevel,
            xp: this.xp,
            fishingData: fishingData
        }
    }

    private loadData = (data: FishingSaveData) => {
        if(data === undefined || Object.keys(data).length === 0) {
            return 
        }

        this.minionLevel = data.minionLevel || 0
        this.xp = data.xp || 0

        Object.keys(this.fishingData).forEach(key => {
            let fishingData = {}
            Object.keys(data.fishingData).forEach(k => {
                fishingData[k] = new FishingSpot(data.fishingData[k])
            })
            this.fishingData = fishingData
        })
    }

    public incMinion(key: string, amount: number) {
        let fishingSpot = this.fishingData[key]
        if (fishingSpot === undefined) {
            throw Error('fishingSpot queried but none found')
        }

        let count = fishingSpot.minions + amount
        let availableMinions = this.totalMinions - this.usedMinions

        if (amount > availableMinions) {
            alert("you don't have enough minions. craft more")
            return
        }

        if (count >= 0) {
            fishingSpot.minions = count
        }
    }

    constructor(applicationStore: ApplicationStore) {
        this.applicationStore = applicationStore
        this.fishingData = ALL_FISHING_SPOTS
        applicationStore.addUpdateFunction(this.taskKey, this.onUpdate)
        applicationStore.addSaveFunction(this.taskKey, this.getDataForSave)

        let loadedData = applicationStore.loadSaveData(this.taskKey)
        this.loadData(loadedData)
    }
}