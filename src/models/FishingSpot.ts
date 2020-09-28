import { observable } from 'mobx'
import { fishingConfig } from '../config/fishingConfig'
import { treeConfig } from '../config/woodCuttingConfig'
import { loop } from '../loop'
import { roundToNearest } from '../pages/FishingPage'
import { Resource } from './Tree'

export interface IFishingSpot {
    id: string
    timeElapsed: number
    minions: number
    achievmentLevel: number
    achievmentXp: number
}

export class FishingSpot implements Resource {
    public id
    @observable public timeElapsed
    @observable public minions
    public achievmentLevel
    public achievmentXp
    public levelRequirement
    public BASE_minCatchSpeed
    public BASE_maxCatchSpeed
    public treasureChance
    public rareityModifier
    public fish_1
    public fish_2
    public fish_3
    public fish_4
    public name

    public currentCycleSpeed = 1000

    public get minCatchSpeed() {
        return roundToNearest(this.BASE_minCatchSpeed * minionPercent(this.minions, 0.94),0)
    }

    public get maxCatchSpeed() {
        return roundToNearest(this.BASE_maxCatchSpeed * minionPercent(this.minions, 0.96), 0)
    }
    constructor(fishingSpot: IFishingSpot) {
        let id = fishingSpot.id
        this.id = fishingSpot.id
        this.timeElapsed = fishingSpot.timeElapsed
        this.minions = fishingSpot.minions
        this.achievmentLevel = fishingSpot.achievmentLevel
        this.achievmentXp = fishingSpot.achievmentXp

        this.levelRequirement = fishingConfig[id].levelRequirement
        this.BASE_minCatchSpeed = fishingConfig[id].BASE_minCatchSpeed
        this.BASE_maxCatchSpeed = fishingConfig[id].BASE_maxCatchSpeed
        this.treasureChance = fishingConfig[id].treasureChance
        this.rareityModifier = fishingConfig[id].rareityModifier
        this.fish_1 = fishingConfig[id].fish_1
        this.fish_2 = fishingConfig[id].fish_2
        this.fish_3 = fishingConfig[id].fish_3
        this.fish_4 = fishingConfig[id].fish_4
        this.name = fishingConfig[id].name

        this.updateCycleSpeed()
    }

    public getSaveData(): IFishingSpot {
        return {
            id: this.id,
            timeElapsed: this.timeElapsed,
            minions: this.minions,
            achievmentLevel: this.achievmentLevel,
            achievmentXp: this.achievmentXp,
        }
    }

    public updateCycleSpeed() {
        let min = this.minCatchSpeed
        let max = this.maxCatchSpeed
        let dif = max - min 
        let cycleSpeed = (Math.random() * dif) + min 
        this.currentCycleSpeed = cycleSpeed
    }
}

function minionPercent(minionCount: number, percentPer: number) {
    let base = 1
    loop(minionCount)(() => (base = base * percentPer))
    return base
}

interface Treasure {
    name: string
}