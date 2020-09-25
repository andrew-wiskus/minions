import { ITree } from './Tree'

export interface WoodCuttingSaveData {
    taskKey: string
    minionLevel: number
    treeData: { [key: string]: ITree }
    xp: number
}

export interface BankSaveData {
    items: { id: string; count: number }[]
}
