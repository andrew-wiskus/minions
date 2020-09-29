import { ADAMANTITE_ORE_ICON, BANITE_ORE_ICON, COAL_ORE_ICON, COPPER_ORE_ICON, DARK_ANIMICA_ICON, DRAKOLITH_ORE_ICON, IRON_ORE_ICON, LIGHT_ANIMICA_ICON, LUMINITE_ORE_ICON, MITHRIL_ORE_ICON, NECRITE_ORE_ICON, ORICHALCITE_ORE_ICON, PHASMATITE_ORE_ICON, RUNITE_ORE_ICON, TIN_ORE_ICON } from '../images/itemImages'
import { MiningSpot } from '../models/MiningSpot'
import { COPPER_ORE, TIN_ORE, IRON_ORE, COAL_ORE, MITHRIL_ORE, ADAMANTITE_ORE, LUMINITE_ORE, RUNITE_ORE, ORICHALCITE_ORE, DRAKOLITH_ORE, NECRITE_ORE, PHASMATITE_ORE, BANITE_ORE, LIGHT_ANIMICA, DARK_ANIMICA, STICK, OAK_LOG, WILLOW_LOG, TEAK_LOG, MAPLE_LOG, MAHOGANY_LOG, YEW_LOG, MAGIC_LOG } from './itemConfig'

export const miningConfig = {
    [COPPER_ORE]: {
        levelRequirement: 1,
        xpPer: 10,
        BASE_TIME_PER_CYCLE: 7000,
        name: 'COPPER_ORE',
        image: COPPER_ORE_ICON,
    },
    [TIN_ORE]: {
        levelRequirement: 1,
        xpPer: 15,
        BASE_TIME_PER_CYCLE: 10000,
        name: 'TIN_ORE',
        image: TIN_ORE_ICON,
    },
    [IRON_ORE]: {
        levelRequirement: 10,
        xpPer: 22,
        BASE_TIME_PER_CYCLE: 15000,
        name: 'IRON_ORE',
        image: IRON_ORE_ICON,
    },
    [COAL_ORE]: {
        levelRequirement: 20,
        xpPer: 30,
        BASE_TIME_PER_CYCLE: 20000,
        name: 'COAL_ORE',
        image: COAL_ORE_ICON,
    },
    [MITHRIL_ORE]: {
        levelRequirement: 30,
        xpPer: 40,
        BASE_TIME_PER_CYCLE: 27000,
        name: 'MITHRIL_ORE',
        image: MITHRIL_ORE_ICON,
    },
    [ADAMANTITE_ORE]: {
        levelRequirement: 40,
        xpPer: 60,
        BASE_TIME_PER_CYCLE: 36000,
        name: 'ADAMANTITE_ORE',
        image: ADAMANTITE_ORE_ICON,
    },
    [LUMINITE_ORE]: {
        levelRequirement: 40,
        xpPer: 80,
        BASE_TIME_PER_CYCLE: 40000,
        name: 'LUMINITE_ORE',
        image: LUMINITE_ORE_ICON,
    },
    [RUNITE_ORE]: {
        levelRequirement: 50,
        xpPer: 100,
        BASE_TIME_PER_CYCLE: 60000,
        name: 'RUNITE_ORE',
        image: RUNITE_ORE_ICON,
    },
    [ORICHALCITE_ORE]: {
        levelRequirement: 60,
        xpPer: 100,
        BASE_TIME_PER_CYCLE: 60000,
        name: 'ORICHALCITE_ORE',
        image: ORICHALCITE_ORE_ICON,
    },
    [DRAKOLITH_ORE]: {
        levelRequirement: 60,
        xpPer: 100,
        BASE_TIME_PER_CYCLE: 60000,
        name: 'DRAKOLITH_ORE',
        image: DRAKOLITH_ORE_ICON,
    },
    [NECRITE_ORE]: {
        levelRequirement: 70,
        xpPer: 100,
        BASE_TIME_PER_CYCLE: 60000,
        name: 'NECRITE_ORE',
        image: NECRITE_ORE_ICON,
    },
    [PHASMATITE_ORE]: {
        levelRequirement: 70,
        xpPer: 100,
        BASE_TIME_PER_CYCLE: 60000,
        name: 'PHASMATITE_ORE',
        image: PHASMATITE_ORE_ICON,
    },
    [BANITE_ORE]: {
        levelRequirement: 80,
        xpPer: 100,
        BASE_TIME_PER_CYCLE: 60000,
        name: 'BANITE_ORE',
        image: BANITE_ORE_ICON,
    },
    [LIGHT_ANIMICA]: {
        levelRequirement: 90,
        xpPer: 100,
        BASE_TIME_PER_CYCLE: 60000,
        name: 'LIGHT_ANIMICA',
        image: LIGHT_ANIMICA_ICON,
    },
    [DARK_ANIMICA]: {
        levelRequirement: 90,
        xpPer: 100,
        BASE_TIME_PER_CYCLE: 60000,
        name: 'DARK_ANIMICA',
        image: DARK_ANIMICA_ICON,
    },
}

export const ALL_MINING_SPOTS = {
    COPPER_ORE: new MiningSpot({resource_id: COPPER_ORE, timeElapsed: 0, minions: 0, achievmentLevel: 1, achievmentXp: 0}),
    TIN_ORE: new MiningSpot({resource_id: TIN_ORE, timeElapsed: 0, minions: 0, achievmentLevel: 1, achievmentXp: 0}),
    IRON_ORE: new MiningSpot({resource_id: IRON_ORE, timeElapsed: 0, minions: 0, achievmentLevel: 1, achievmentXp: 0}),
    COAL_ORE: new MiningSpot({resource_id: COAL_ORE, timeElapsed: 0, minions: 0, achievmentLevel: 1, achievmentXp: 0}),
    MITHRIL_ORE: new MiningSpot({resource_id: MITHRIL_ORE, timeElapsed: 0, minions: 0, achievmentLevel: 1, achievmentXp: 0}),
    ADAMANTITE_ORE: new MiningSpot({resource_id: ADAMANTITE_ORE, timeElapsed: 0, minions: 0, achievmentLevel: 1, achievmentXp: 0}),
    LUMINITE_ORE: new MiningSpot({resource_id: LUMINITE_ORE, timeElapsed: 0, minions: 0, achievmentLevel: 1, achievmentXp: 0}),
    RUNITE_ORE: new MiningSpot({resource_id: RUNITE_ORE, timeElapsed: 0, minions: 0, achievmentLevel: 1, achievmentXp: 0}),
    ORICHALCITE_ORE: new MiningSpot({resource_id: ORICHALCITE_ORE, timeElapsed: 0, minions: 0, achievmentLevel: 1, achievmentXp: 0}),
    DRAKOLITH_ORE: new MiningSpot({resource_id: DRAKOLITH_ORE, timeElapsed: 0, minions: 0, achievmentLevel: 1, achievmentXp: 0}),
    NECRITE_ORE: new MiningSpot({resource_id: NECRITE_ORE, timeElapsed: 0, minions: 0, achievmentLevel: 1, achievmentXp: 0}),
    PHASMATITE_ORE: new MiningSpot({resource_id: PHASMATITE_ORE, timeElapsed: 0, minions: 0, achievmentLevel: 1, achievmentXp: 0}),
    BANITE_ORE: new MiningSpot({resource_id: BANITE_ORE, timeElapsed: 0, minions: 0, achievmentLevel: 1, achievmentXp: 0}),
    LIGHT_ANIMICA: new MiningSpot({resource_id: LIGHT_ANIMICA, timeElapsed: 0, minions: 0, achievmentLevel: 1, achievmentXp: 0}),
    DARK_ANIMICA: new MiningSpot({resource_id: DARK_ANIMICA, timeElapsed: 0, minions: 0, achievmentLevel: 1, achievmentXp: 0}),
}

export const miningMinionCraftRequirements = [
    { [STICK]: 50 },
    { [STICK]: 200, [OAK_LOG]: 50 },
    { [STICK]: 500, [OAK_LOG]: 100 },
    { [STICK]: 1000, [OAK_LOG]: 500, [WILLOW_LOG]: 200 },
    { [STICK]: 2000, [OAK_LOG]: 1000, [WILLOW_LOG]: 500 },
]
