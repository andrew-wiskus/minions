import { ITree } from './woodcuttingData'

export interface WoodCuttingSaveData {
    taskKey: number
    minionLevel: number
    treeData: { [key: string]: ITree }
    xp: number
}
export interface ISaveData {
    testing: number
}
export class SaveData {}
