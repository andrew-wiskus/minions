import BushIcon from '../images/bush.png'
import { SHRIMP_MULTI_ICON, SHRIMP_NORMAL_ICON, SHRIMP_PRAWN_ICON, SHRIMP_PRIME_ICON } from '../images/itemImages'
import { FishingSpot } from '../models/FishingSpot'

import { STICK, SHRIMP_NORMAL, SHRIMP_MULTI, SHRIMP_PRAWN, SHRIMP_PRIME } from './itemConfig'

const FISH_LOCATION_SHRIMPY_COVE = 'SHRIMPY_COVE'
export const fishingConfig = {
    [FISH_LOCATION_SHRIMPY_COVE]: {
        levelRequirement: 0,
        BASE_minCatchSpeed: 1200,
        BASE_maxCatchSpeed: 5300,
        treasureChance: 0.14,
        rareityModifier: 22,
        id: FISH_LOCATION_SHRIMPY_COVE,
        name: 'shrimpy cove',
        fish_1: {
            resource_id: SHRIMP_NORMAL,
            image: SHRIMP_NORMAL_ICON,
            name: 'Shrimip Regular',
            catchWeight: 5,
            xp: 10,
        },
        fish_2: {
            resource_id: SHRIMP_PRIME,
            image: SHRIMP_PRIME_ICON,
            name: 'Shrimp Prime',
            catchWeight: 3,
            xp: 15,
        },
        fish_3: {
            resource_id: SHRIMP_MULTI,
            image: SHRIMP_MULTI_ICON,
            name: 'Shrimp Multi',
            catchWeight: 2,
            xp: 20,
        },
        fish_4: {
            resource_id: SHRIMP_PRAWN,
            image: SHRIMP_PRAWN_ICON,
            name: 'Shrimp Prawn',
            catchWeight: 1,
            xp: 25,
        },
    },
}

// takes in save data to construct class and then matches key from config to build data!
export const ALL_FISHING_SPOTS = {
    [FISH_LOCATION_SHRIMPY_COVE]: new FishingSpot({
        id: FISH_LOCATION_SHRIMPY_COVE,
        timeElapsed: 0,
        minions: 10,
        achievmentLevel: 1,
        achievmentXp: 10,
    }),
}

export const minionCraftRequirements = [
    { [STICK]: 50 },
]
