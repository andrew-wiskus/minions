import { observable } from 'mobx'
import moment from 'moment'
import { BankStore } from './bankStore'
import { FishingStore } from './fishingStore'
import { MiningStore } from './miningStore'
import { WoodCuttingStore } from './woodcuttingStore'

export class ApplicationStore {
    @observable public bankStore: BankStore = new BankStore(this)
    @observable public woodcuttingStore: WoodCuttingStore = new WoodCuttingStore(this)
    @observable public miningStore: MiningStore = new MiningStore(this)
    @observable public fishingStore: FishingStore = new FishingStore(this)
    
    private updateFunctions: { [taskKey: string]: (timeDelta: number) => void } = {}
    private saveFunctions: { [taskKey: string]: () => void } = {}
    private lastSaveTime = moment().valueOf()
    private lastUpdatedTime = 0

    public addUpdateFunction = (key: string, updateFunc: (timeDelta: number) => void) => {
        this.updateFunctions[key] = updateFunc
    }

    public addSaveFunction = (key: string, saveFunc: () => void) => {
        this.saveFunctions[key] = saveFunc
    }

    public loadSaveData = (taskKey: string) => {
        let encodedData = localStorage.getItem(taskKey)
        if (encodedData == null) {
            return {}
        }


        let data = JSON.parse(atob(encodedData))
        // console.log("LOADING: " + taskKey, data)

        return data
    }

    public saveData = () => {
        Object.keys(this.saveFunctions).forEach((taskKey) => {
            let data = this.saveFunctions[taskKey]()
            // console.log('SAVING ' + taskKey + ': ', data)
            let encoded = btoa(JSON.stringify(data))
            localStorage.setItem(taskKey, encoded)
        })
    }

    private loopOnRender = () => {
        const timeStamp = moment().valueOf()
        let fps = Math.floor(1000 / 60)
        let saveInterval = 20000

        if (this.lastUpdatedTime + fps < timeStamp) {
            this.runUpdateLoop(timeStamp - this.lastUpdatedTime)
            this.lastUpdatedTime = timeStamp
        }

        if (this.lastSaveTime + saveInterval < timeStamp) {
            this.saveData()
            this.lastSaveTime = timeStamp
        }

        requestAnimationFrame(this.loopOnRender)
    }

    private runUpdateLoop = (timeDelta: number) => {
        Object.keys(this.updateFunctions).forEach((key) => {
            this.updateFunctions[key](timeDelta)
        })
    }

    constructor() {
        // localStorage.clear()
        this.loopOnRender()
    }
}
