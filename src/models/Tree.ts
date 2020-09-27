import { observable } from 'mobx'
import { treeConfig } from '../config/woodCutting'
import { loop } from '../loop'

export interface ITree {
    resource_id: string
    timeElapsed: number
    minions: number
    achievmentLevel: number
    achievmentXp: number
}

export interface Resource {
    minions: number
}
export class Tree implements Resource {
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
    public treeTime

    constructor(tree: ITree) {
        let id = tree.resource_id
        this.resource_id = tree.resource_id
        this.timeElapsed = tree.timeElapsed
        this.minions = tree.minions
        this.achievmentLevel = tree.achievmentLevel
        this.achievmentXp = tree.achievmentXp

        this.levelRequirement = treeConfig[id].levelRequirement
        this.xpPer = treeConfig[id].xpPer
        this.BASE_TIME_PER_CYCLE = treeConfig[id].BASE_TIME_PER_CYCLE
        this.name = treeConfig[id].name
        this.image = treeConfig[id].image
    }

    public getTimePerCycle = () => {
        return this.BASE_TIME_PER_CYCLE * minionPercent(this.minions, 0.9)
    }

    public getSaveData(): ITree {
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
