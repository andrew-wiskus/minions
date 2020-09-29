import { observable } from 'mobx'
import { miningConfig } from '../config/miningConfig'
import { loop } from '../loop'

export interface IMiningSpot {
    resource_id: string
    timeElapsed: number
    minions: number
    achievmentLevel: number
    achievmentXp: number
}

export interface Resource {
    minions: number
}
export class MiningSpot implements Resource {
    public resource_id
    @observable public timeElapsed
    @observable public minions
    public achievmentLevel
    public achievmentXp
    public levelRequirement
    public xpPer
    public BASE_TIME_PER_CYCLE
    public name
    public image
    public miningSpotTime

    constructor(miningSpot: IMiningSpot) {
        let id = miningSpot.resource_id
        this.resource_id = miningSpot.resource_id
        this.timeElapsed = miningSpot.timeElapsed
        this.minions = miningSpot.minions
        this.achievmentLevel = miningSpot.achievmentLevel
        this.achievmentXp = miningSpot.achievmentXp

        this.levelRequirement = miningConfig[id].levelRequirement
        this.xpPer = miningConfig[id].xpPer
        this.BASE_TIME_PER_CYCLE = miningConfig[id].BASE_TIME_PER_CYCLE
        this.name = miningConfig[id].name
        this.image = miningConfig[id].image
    }

    public getTimePerCycle = () => {
        return this.BASE_TIME_PER_CYCLE * minionPercent(this.minions, 0.9)
    }

    public getSaveData(): IMiningSpot {
        return {
            resource_id: this.resource_id,
            timeElapsed: this.timeElapsed,
            minions: this.minions,
            achievmentLevel: this.achievmentLevel,
            achievmentXp: this.achievmentXp,
        }
    }
}

function minionPercent(minionCount: number, percentPer: number) {
    let base = 1
    loop(minionCount)(() => (base = base * percentPer))
    return base
}
