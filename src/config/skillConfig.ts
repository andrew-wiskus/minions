import FarmingIcon from '../images/FarmingIcon.png'
import FishingIcon from '../images/FishingIcon.png'
import WoodcuttingIcon from '../images/WoodcuttingIcon.png'
import HuntingIcon from '../images/HuntingIcon.png'
import MiningIcon from '../images/MiningIcon.png'
import DivinationIcon from '../images/DivinationIcon.png'
import ArtifactDiggingIcon from '../images/ArtifactDiggingIcon.png'
import GemMiningIcon from '../images/GemMiningIcon.png'
import ForagingIcon from '../images/ForagingIcon.png'
import EssenceGatheringIcon from '../images/EssenceGatheringIcon.png'
import StudyIcon from '../images/StudyIcon.png'
import DiplomacyIcon from '../images/DiplomacyIcon.png'
import woodCutBG from '../images/woodcut_bg.png'
import fishingBG from '../images/FishingBG.png'

export enum PageRoute {
    WOODCUTTING = 'WOODCUTTING',
    BANK = 'BANK',
    FISHING = 'FISHING',
    TODO = 'TODO',
    MINING = 'MINING',
}

export interface GatheringSkill {
    name: string
    icon: string
    store: string
    level: number
    currentLevel: number
    xp: number
    onClickRoute: string
    background?: string
}

export let GATHER_SKILLS: GatheringSkill[] = [
    {
        name: 'Woodcutting',
        store: 'woodcuttingStore',
        icon: WoodcuttingIcon,
        background: woodCutBG,
        level: 1,
        currentLevel: 1,
        xp: 0,
        onClickRoute: PageRoute.WOODCUTTING,
    },
    {
        name: 'Fishing',
        store: 'fishingStore',
        icon: FishingIcon,
        level: 1,
        background: fishingBG,
        currentLevel: 1,
        xp: 0,
        onClickRoute: PageRoute.FISHING,
    },
    {
        name: 'Mining',
        store: 'miningStore',
        icon: MiningIcon,
        level: 1,
        currentLevel: 1,
        background: fishingBG,
        xp: 0,
        onClickRoute: PageRoute.MINING,

    },
    {
        name: 'Farming',
        store: 'XX',
        icon: FarmingIcon,
        level: 1,
        currentLevel: 1,
        xp: 0,
        onClickRoute: 'Farming',
    },
    {
        name: 'Hunting ',
        store: 'XX',
        icon: HuntingIcon,
        level: 1,
        currentLevel: 1,
        xp: 0,
        onClickRoute: 'Hunting ',
    },
    {
        name: 'Divination',
        store: 'XX',
        icon: DivinationIcon,
        level: 1,
        currentLevel: 1,
        xp: 0,
        onClickRoute: 'Divination',
    },
    {
        name: 'Diplomacy',
        store: 'XX',
        icon: DiplomacyIcon,
        level: 1,
        currentLevel: 1,
        xp: 0,
        onClickRoute: 'Diplomacy',
    },
    {
        name: 'Artifact Digging ',
        store: 'XX',
        icon: ArtifactDiggingIcon,
        level: 1,
        currentLevel: 1,
        xp: 0,
        onClickRoute: 'ArtifactDigging ',
    },
    {
        name: 'Gem Mining',
        store: 'XX',
        icon: GemMiningIcon,
        level: 1,
        currentLevel: 1,
        xp: 0,
        onClickRoute: 'Gem Mining',
    },
    {
        name: 'Foraging ',
        store: 'XX',
        icon: ForagingIcon,
        level: 1,
        currentLevel: 1,
        xp: 0,
        onClickRoute: 'Foraging ',
    },
    {
        name: 'Essence Gathering',
        store: 'XX',
        icon: EssenceGatheringIcon,
        level: 1,
        currentLevel: 1,
        xp: 0,
        onClickRoute: 'EssenceGathering',
    },
    {
        name: 'Study',
        store: 'XX',
        icon: StudyIcon,
        level: 1,
        currentLevel: 1,
        xp: 0,
        onClickRoute: 'Study',
    },
]
