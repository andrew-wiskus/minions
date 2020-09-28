import { observable } from "mobx"
import { ALL_FISHING_SPOTS } from "../config/fishingConfig"
import { FishingSpot } from "../models/FishingSpot"
import { FishingSaveData } from "../models/saveDataModels"
import { ApplicationStore } from "./applicationStore"


let BASE_MINIONS = 50

export class FishingStore {
    private applicationStore: ApplicationStore
    private taskKey = "FISHING_DATA"

    @observable public fishingData: { [fishingSpotKey: string]: FishingSpot} = {}
    @observable public minionLevel = 0
    @observable public xp = 0

    private onUpdate = (timeDelta: number) => {
        console.log("updating: ", timeDelta)
    }

    private getDataForSave = (): FishingSaveData => {
        return {
            taskKey: this.taskKey,
            minionLevel: this.minionLevel,
            xp: this.xp,
            fishingData: this.fishingData
        }
    }

    private loadData = (data: FishingSaveData) => {
        console.log("loading: ", data)
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