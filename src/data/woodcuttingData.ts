import { MAGIC_LOG, MAHOGANY_LOG, MAPLE_LOG, OAK_LOG, STICK, TEAK_LOG, WILLOW_LOG, YEW_LOG } from '../images/itemImages'
import BushIcon from '../images/bush.png'
import OakIcon from '../images/oak.png'
import WillowIcon from '../images/willow.png'
import TeakIcon from '../images/teak.png'
import MapleIcon from '../images/maple.png'
import MahoganyIcon from '../images/mahogany.png'
import YewIcon from '../images/yew.png'
import MagicIcon from '../images/magic.png'
import { loop } from '../loop'
import { observable } from 'mobx'

export interface ITree {
    resource_id: string
    timeElapsed: number
    minions: number
    achievmentLevel: number
    achievmentXp: number
    levelRequirement: number
    xpPer: number
    BASE_TIME_PER_CYCLE: number
    name: string
    image: string
}

export class Tree {
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
        this.resource_id = tree.resource_id
        this.timeElapsed = tree.timeElapsed
        this.minions = tree.minions
        this.achievmentLevel = tree.achievmentLevel
        this.achievmentXp = tree.achievmentXp
        this.levelRequirement = tree.levelRequirement
        this.xpPer = tree.xpPer
        this.BASE_TIME_PER_CYCLE = tree.BASE_TIME_PER_CYCLE
        this.name = tree.name
        this.image = tree.image
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
            levelRequirement: this.levelRequirement,
            xpPer: this.xpPer,
            BASE_TIME_PER_CYCLE: this.BASE_TIME_PER_CYCLE,
            name: this.name,
            image: this.image,
        }
    }
}

function minionPercent(minionCount: number, percentPer: number) {
    let base = 1
    loop(minionCount)(() => (base = base * percentPer))
    return base
}

export const ALL_TREES = {
    bush: new Tree({
        resource_id: STICK,
        timeElapsed: 0,
        minions: 10,
        achievmentLevel: 1,
        achievmentXp: 10,
        levelRequirement: 0,
        xpPer: 10,
        BASE_TIME_PER_CYCLE: 7000,
        name: 'bush',
        image: BushIcon,
    }),
    oak: new Tree({
        resource_id: OAK_LOG,
        timeElapsed: 0,
        minions: 0,
        achievmentLevel: 1,
        achievmentXp: 10,
        levelRequirement: 15,
        xpPer: 15,
        BASE_TIME_PER_CYCLE: 10000,
        name: 'oak tree',
        image: OakIcon,
    }),
    willow: new Tree({
        resource_id: WILLOW_LOG,
        timeElapsed: 0,
        minions: 0,
        achievmentLevel: 1,
        achievmentXp: 10,
        levelRequirement: 30,
        xpPer: 22,
        BASE_TIME_PER_CYCLE: 15000,

        name: 'willow tree',
        image: WillowIcon,
    }),
    teak: new Tree({
        resource_id: TEAK_LOG,
        timeElapsed: 0,
        minions: 0,
        achievmentLevel: 1,
        achievmentXp: 10,
        levelRequirement: 30,
        xpPer: 30,
        BASE_TIME_PER_CYCLE: 20000,
        name: 'teak tree',
        image: TeakIcon,
    }),
    maple: new Tree({
        resource_id: MAPLE_LOG,
        timeElapsed: 0,
        minions: 0,
        achievmentLevel: 1,
        achievmentXp: 10,
        levelRequirement: 30,
        xpPer: 40,
        BASE_TIME_PER_CYCLE: 27000,

        name: 'maple tree',
        image: MapleIcon,
    }),
    mahogany: new Tree({
        resource_id: MAHOGANY_LOG,
        timeElapsed: 0,
        minions: 0,
        achievmentLevel: 1,
        achievmentXp: 10,
        levelRequirement: 30,
        xpPer: 60,
        BASE_TIME_PER_CYCLE: 36000,
        name: 'mahogany tree',
        image: MahoganyIcon,
    }),
    yew: new Tree({
        resource_id: YEW_LOG,
        timeElapsed: 0,
        minions: 0,
        achievmentLevel: 1,
        achievmentXp: 10,
        levelRequirement: 30,
        xpPer: 80,
        BASE_TIME_PER_CYCLE: 40000,
        name: 'yew tree',
        image: YewIcon,
    }),
    magic: new Tree({
        resource_id: MAGIC_LOG,
        timeElapsed: 0,
        minions: 0,
        achievmentLevel: 1,
        achievmentXp: 10,
        levelRequirement: 30,
        xpPer: 100,
        BASE_TIME_PER_CYCLE: 60000,
        name: 'magic tree',
        image: MagicIcon,
    }),
}

export const minionCraftRequirements = [
    { [STICK]: 50 },
    { [STICK]: 200, [OAK_LOG]: 50 },
    { [STICK]: 500, [OAK_LOG]: 100 },
    { [STICK]: 1000, [OAK_LOG]: 500, [WILLOW_LOG]: 200 },
    { [STICK]: 2000, [OAK_LOG]: 1000, [WILLOW_LOG]: 500 },
]
