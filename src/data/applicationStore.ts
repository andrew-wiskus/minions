import { computed, observable } from 'mobx'
import moment from 'moment'
import { BankStore } from './bankStore'
import { WoodCuttingSaveData } from './saveDataModels'
import { ALL_TREES, minionCraftRequirements, Tree } from './woodcuttingData'
import { getLevelFromEXP, getNextLevelXP } from './_level_xp'

export class ApplicationStore {
    @observable public bankStore: BankStore = new BankStore(this)
    @observable public woodcuttingStore: WoodCuttingStore = new WoodCuttingStore(this)

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
        return data
    }

    public saveData = () => {
        Object.keys(this.saveFunctions).forEach((taskKey) => {
            let data = this.saveFunctions[taskKey]()
            console.log('SAVING ' + taskKey + ': ', data)
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
        // get save state from last tree data
        // super()
        this.applicationStore = applicationStore
        this.treeData = ALL_TREES
        applicationStore.addUpdateFunction(this.taskKey, this.onUpdate)
        applicationStore.addSaveFunction(this.taskKey, this.getDataForSave)

        let loadedData = applicationStore.loadSaveData(this.taskKey)
        this.loadData(loadedData)
    }

    private RESET_WOODCUT_CONFIG = () => {}
}
