import BushIcon from '../images/bush.png'
import { FishingSpot } from '../models/FishingSpot'

import { STICK, SHRIMP_NORMAL } from './itemConfig'

export const fishingConfig = {
    [SHRIMP_NORMAL]: {
        levelRequirement: 0,
        xpPer: 10,
        BASE_TIME_PER_CYCLE: 7000,
        name: 'bush',
        image: BushIcon,
    },
}

export const ALL_FISHING_SPOTS = {
    SHRIMPY_COVE: new FishingSpot({
        id: "SHRIMPY_COVE",
        timeElapsed: 0,
        minions: 10,
        achievmentLevel: 1,
        achievmentXp: 10,
    }),
}

export const minionCraftRequirements = [
    { [STICK]: 50 },
]
