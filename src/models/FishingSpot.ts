import { observable } from 'mobx'
import { treeConfig } from '../config/woodCuttingConfig'
import { loop } from '../loop'
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
    // public levelRequirement
    // public xpPer
    // public BASE_TIME_PER_CYCLE
    // public name
    // public image

    constructor(fishingSpot: IFishingSpot) {
        let id = fishingSpot.id
        this.id = fishingSpot.id
        this.timeElapsed = fishingSpot.timeElapsed
        this.minions = fishingSpot.minions
        this.achievmentLevel = fishingSpot.achievmentLevel
        this.achievmentXp = fishingSpot.achievmentXp

        // this.levelRequirement = treeConfig[id].levelRequirement
        // this.xpPer = treeConfig[id].xpPer
        // this.BASE_TIME_PER_CYCLE = treeConfig[id].BASE_TIME_PER_CYCLE
        // this.name = treeConfig[id].name
        // this.image = treeConfig[id].image
    }

    public getTimePerCycle = () => {
        // return this.BASE_TIME_PER_CYCLE * minionPercent(this.minions, 0.9)
        return 1000
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

    public avgExpPerHour(): number {
        return 32
    }

    getResourceIdForCatch(): string {
        // let weights = this.fishingSpots.map((x) => x.catchWeight)
        // let totalWeight = weights.reduce((a, b) => a + b)
        // let catchRand = Math.random() * totalWeight

        // let total = 0
        // for (let i = 0; i < weights.length; ++i) {
        //     // Add the weight to our running total.
        //     total += weights[i]

        //     // If this value falls within the threshold, we're done!
        //     if (total >= catchRand) {
        //         return this.fishingSpots[i].resource_id
        //     }
        // }

        return "TODO"
    }

    rollForTreasure(): Treasure | undefined {
        // let rand = Math.random() * 100
        // if (rand < this.config.treasureChance) {
        //     // todo: build treasure
        //     return { name: 'holy cow treasure' }
        // }
        // return undefined

        return undefined
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