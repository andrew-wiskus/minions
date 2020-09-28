import {
    OAK_LOG_ICON,
    WILLOW_LOG_ICON,
    TEAK_LOG_ICON,
    MAGIC_LOG_ICON,
    MAPLE_LOG_ICON,
    MAHOGANY_LOG_ICON,
    YEW_LOG_ICON,
    STICK_LOG_ICON,
    SHRIMP_NORMAL_ICON
} from '../images/itemImages'
import { InventoryItem } from '../models/Item'

export const OAK_LOG = 'OAK_LOG'
export const WILLOW_LOG = 'WILLOW_LOG'
export const TEAK_LOG = 'TEAK_LOG'
export const MAGIC_LOG = 'MAGIC_LOG'
export const MAPLE_LOG = 'MAPLE_LOG'
export const MAHOGANY_LOG = 'MAHOGANY_LOG'
export const YEW_LOG = 'YEW_LOG'
export const STICK = 'STICK'

export const SHRIMP_NORMAL = 'SHRIMP_NORMAL'

export const itemImages = {
    [OAK_LOG]: OAK_LOG_ICON,
    [WILLOW_LOG]: WILLOW_LOG_ICON,
    [TEAK_LOG]: TEAK_LOG_ICON,
    [MAGIC_LOG]: MAGIC_LOG_ICON,
    [MAPLE_LOG]: MAPLE_LOG_ICON,
    [MAHOGANY_LOG]: MAHOGANY_LOG_ICON,
    [YEW_LOG]: YEW_LOG_ICON,
    [STICK]: STICK_LOG_ICON,

    [SHRIMP_NORMAL]: SHRIMP_NORMAL_ICON
}

export const ALL_ITEMS = {
    [STICK]: new InventoryItem(STICK, 0),
    [OAK_LOG]: new InventoryItem(OAK_LOG, 0),
    [WILLOW_LOG]: new InventoryItem(WILLOW_LOG, 0),
    [TEAK_LOG]: new InventoryItem(TEAK_LOG, 0),
    [MAGIC_LOG]: new InventoryItem(MAGIC_LOG, 0),
    [MAPLE_LOG]: new InventoryItem(MAPLE_LOG, 0),
    [MAHOGANY_LOG]: new InventoryItem(MAHOGANY_LOG, 0),
    [YEW_LOG]: new InventoryItem(YEW_LOG, 0),

    [SHRIMP_NORMAL]: new InventoryItem(SHRIMP_NORMAL, 0)
}

export interface BankItem {
    name: string
    icon: string
    count: number
}
