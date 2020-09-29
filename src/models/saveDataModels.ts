import { IFishingSpot } from './FishingSpot';
import { ITree } from './Tree'

export interface WoodCuttingSaveData {
    taskKey: string
    minionLevel: number
    treeData: { [key: string]: ITree }
    xp: number
}


export interface MiningSaveData {
    taskKey: string
    minionLevel: number
    miningData: { [key: string]: ITree }
    xp: number
}

export interface FishingSaveData {
    taskKey: string
    minionLevel: number
    fishingData: { [key: string]: IFishingSpot }
    xp: number
}

export interface BankSaveData {
    items: { id: string; count: number }[]
}
