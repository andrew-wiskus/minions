import {  SHRIMP_MULTI_ICON, SHRIMP_NORMAL_ICON, SHRIMP_GRAND_ICON, SHRIMP_PRIME_ICON, TROUT_HERRING_ICON, TROUT_PRIME_ICON, TROUT_SALMON_ICON, TROUT_TROUT_ICON } from '../images/itemImages'
import { FishingSpot } from '../models/FishingSpot'

import { STICK, SHRIMP_NORMAL, SHRIMP_MULTI, SHRIMP_PRAWN, SHRIMP_PRIME, TROUT_HERRING, TROUT_PRIME, TROUT_SALMON, TROUT_TROUT } from './itemConfig'

export interface FishCatchConfig {
    resource_id: string,
    image: string,
    name: string, 
    catchWeight: number, 
    xp: number
}

const FISH_LOCATION_TROUT_TRAILS = 'TROUT_TRAILS'
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
        } as FishCatchConfig,
        fish_2: {
            resource_id: SHRIMP_PRIME,
            image: SHRIMP_PRIME_ICON,
            name: 'Shrimp Prime',
            catchWeight: 3,
            xp: 15,
        } as FishCatchConfig,
        fish_3: {
            resource_id: SHRIMP_MULTI,
            image: SHRIMP_MULTI_ICON,
            name: 'Shrimp Multi',
            catchWeight: 2,
            xp: 20,
        } as FishCatchConfig,
        fish_4: {
            resource_id: SHRIMP_PRAWN,
            image: SHRIMP_GRAND_ICON,
            name: 'Shrimp Prawn',
            catchWeight: 1,
            xp: 25,
        } as FishCatchConfig,
    },
    [FISH_LOCATION_TROUT_TRAILS]: {
        levelRequirement: 0,
        BASE_minCatchSpeed: 15000,
        BASE_maxCatchSpeed: 25000,
        treasureChance: 0.14,
        rareityModifier: 22,
        id: FISH_LOCATION_TROUT_TRAILS,
        name: 'trout trails',
        fish_1: {
            resource_id: TROUT_HERRING,
            image: TROUT_HERRING_ICON,
            name: 'Shrimip Regular',
            catchWeight: 5,
            xp: 10,
        } as FishCatchConfig,
        fish_2: {
            resource_id: TROUT_PRIME,
            image: TROUT_PRIME_ICON,
            name: 'Shrimp Prime',
            catchWeight: 3,
            xp: 15,
        } as FishCatchConfig,
        fish_3: {
            resource_id: TROUT_SALMON,
            image: TROUT_SALMON_ICON,
            name: 'Shrimp Multi',
            catchWeight: 2,
            xp: 20,
        } as FishCatchConfig,
        fish_4: {
            resource_id: TROUT_TROUT,
            image: TROUT_TROUT_ICON,
            name: 'Shrimp Prawn',
            catchWeight: 1,
            xp: 25,
        } as FishCatchConfig,
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
    [FISH_LOCATION_TROUT_TRAILS]: new FishingSpot({
        id: FISH_LOCATION_TROUT_TRAILS,
        timeElapsed: 0,
        minions: 10,
        achievmentLevel: 1,
        achievmentXp: 10,
    }),
}

export const minionCraftRequirements = [
    { [STICK]: 50 },
]
