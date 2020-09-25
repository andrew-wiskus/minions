import React, { CSSProperties } from 'react'
import './App.css'
import { WoodCuttingPage } from './pages/WoodCuttingPage'
import woodCutBG from './images/woodcut_bg.png'
import SkillBG from './images/skill_level_bg.png'
import FarmingIcon from './images/FarmingIcon.png'
import FishingIcon from './images/FishingIcon.png'
import WoodcuttingIcon from './images/WoodcuttingIcon.png'
import HuntingIcon from './images/HuntingIcon.png'
import MiningIcon from './images/MiningIcon.png'
import DivinationIcon from './images/DivinationIcon.png'
import ArtifactDiggingIcon from './images/ArtifactDiggingIcon.png'
import GemMiningIcon from './images/GemMiningIcon.png'
import ForagingIcon from './images/ForagingIcon.png'
import EssenceGatheringIcon from './images/EssenceGatheringIcon.png'
import StudyIcon from './images/StudyIcon.png'
import DiplomacyIcon from './images/DiplomacyIcon.png'
import MenuIcon from './images/menuIcon.png'
import BankIcon from './images/BankIcon.png'
import TrophyIcon from './images/TrophyIcon.png'
import { INNER_COLOR, OUTER_COLOR } from './constants'
import { BankPage } from './pages/BankPage'
import { inject, observer } from 'mobx-react'
import { ApplicationStore } from './data/applicationStore'

export enum PageRoute {
    WOODCUTTING = 'WOODCUTTING',
    BANK = 'BANK',
    TODO = 'TODO',
}

interface State {
    currentPage: PageRoute
}
export class App extends React.Component<{}, State> {
    public state: State = {
        currentPage: PageRoute.WOODCUTTING,
    }

    public render() {
        return (
            <div
                style={{
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    height: '100vh',
                    width: '500px',
                    backgroundImage: `url(${woodCutBG})`,
                }}
            >
                <GameBar onClickRoute={(route: PageRoute) => this.setState({ currentPage: route })} />
                {this.state.currentPage === PageRoute.WOODCUTTING && <WoodCuttingPage />}
                {this.state.currentPage === PageRoute.BANK && <BankPage />}
            </div>
        )
    }
}

export default App

interface GatheringSkill {
    name: string
    icon: string
    store: string
    level: number
    currentLevel: number
    xp: number
    onClickRoute: string
}

// interface CraftingSkill {
//     name: string
// }

// let craftingSkills: CraftingSkill[] = [
//     { name: 'construction' },
//     { name: 'smithing' },
//     { name: 'cooking' },
//     { name: 'runecrafting' },
//     { name: 'fletching' },
//     { name: 'potion_making' },
//     { name: 'summoning' },
//     { name: 'divination' },
//     { name: 'weaving' },
//     { name: 'enchanting' },
//     { name: 'alchemy' },
//     { name: 'jewlery' },
//     { name: 'smithing' },
//     { name: 'smithing' },
//     { name: 'smithing' },
// ]

let skills: GatheringSkill[] = [
    {
        name: 'Woodcutting',
        store: 'woodcuttingStore',
        icon: WoodcuttingIcon,
        level: 1,
        currentLevel: 1,
        xp: 0,
        onClickRoute: PageRoute.WOODCUTTING,
    },
    {
        name: 'Fishing',
        store: 'XX',
        icon: FishingIcon,
        level: 1,
        currentLevel: 1,
        xp: 0,
        onClickRoute: 'Fishing',
    },
    {
        name: 'Mining',
        store: 'XX',
        icon: MiningIcon,
        level: 1,
        currentLevel: 1,
        xp: 0,
        onClickRoute: 'Mining',
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

enum Tab {
    GATHER = 'GATHER',
    CRAFT = 'CRAFT',
    COMBAT = 'COMBAT',
    MARKET = 'MARKET',
}

export class GameBar extends React.Component<{ onClickRoute: (route: string) => void }> {
    public state = {
        selectedTab: Tab.GATHER,
    }

    public render() {
        return (
            <div
                style={{
                    position: 'relative',
                    width: `100%`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    borderBottom: '10px solid ' + OUTER_COLOR,
                }}
            >
                <div
                    style={{
                        width: 500,
                        height: 50,
                        backgroundColor: INNER_COLOR,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 99,
                    }}
                >
                    <img alt="todo" style={{ height: 20, width: 20, marginLeft: 25 }} src={MenuIcon} />

                    <div onClick={() => this.props.onClickRoute(PageRoute.BANK)}>
                        <img
                            alt="todo"
                            style={{ height: 35, width: 35, marginRight: 10, marginTop: 5 }}
                            src={BankIcon}
                        />
                        <img
                            alt="todo"
                            style={{ height: 35, width: 35, marginRight: 10, marginTop: 5 }}
                            src={TrophyIcon}
                        />
                    </div>

                    <p
                        style={{
                            color: 'white',
                            fontSize: 32,
                            marginTop: 30,
                            fontWeight: 'lighter',
                            textAlign: 'center',
                            left: 100,
                            right: 100,
                            position: 'absolute',
                        }}
                    >
                        Wizzy
                    </p>
                </div>
                <div
                    style={{
                        paddingTop: 50,
                        height: 30,
                        width: `100%`,
                        backgroundColor: OUTER_COLOR,
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <SkillTab
                        onClick={() => this.setState({ selectedTab: Tab.GATHER })}
                        isSelected={this.state.selectedTab === Tab.GATHER}
                        text={'gather'}
                    />
                    <SkillTab
                        onClick={() => this.setState({ selectedTab: Tab.CRAFT })}
                        isSelected={this.state.selectedTab === Tab.CRAFT}
                        text={'craft'}
                    />
                    <SkillTab
                        onClick={() => this.setState({ selectedTab: Tab.COMBAT })}
                        isSelected={this.state.selectedTab === Tab.COMBAT}
                        text={'combat'}
                    />
                    <SkillTab
                        onClick={() => this.setState({ selectedTab: Tab.MARKET })}
                        isSelected={this.state.selectedTab === Tab.MARKET}
                        text={'market'}
                    />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: OUTER_COLOR, paddingTop: 10 }}>
                    {skills.map((skill, index) => {
                        return (
                            <SkillDisplayButton
                                key={index}
                                skill={skill}
                                onClick={() => this.props.onClickRoute(skill.onClickRoute)}
                            />
                        )
                    })}
                </div>
            </div>
        )
    }
}

const SkillTab = (props: { isSelected: boolean; text: string; onClick: () => void }) => {
    return (
        <div
            onClick={props.onClick}
            style={{
                ...styles.tab,
                ...(props.isSelected ? styles.selectedTab : {}),
                cursor: 'pointer',
            }}
        >
            <p
                style={{
                    color: '#FFFFFF',
                    opacity: props.isSelected ? 1 : 0.4,
                    marginTop: 3,
                    width: `100%`,
                    textAlign: 'center',
                }}
            >
                {props.text}
            </p>
        </div>
    )
}

const styles = {
    tab: {
        border: '2px solid ' + INNER_COLOR,
        borderBottom: '4px solid ' + OUTER_COLOR,
        flex: 1,
        display: 'flex',
        height: 25,
        marginTop: 5,
    } as CSSProperties,
    selectedTab: {
        backgroundColor: INNER_COLOR,
        borderBottomColor: INNER_COLOR,
    } as CSSProperties,
}

@inject('applicationStore')
@observer
export class SkillDisplayButton extends React.Component<
    { skill: GatheringSkill; onClick: () => void; applicationStore?: ApplicationStore },
    { hover: boolean }
> {
    public state = {
        hover: false,
    }

    public render() {
        let store = this.props.applicationStore!
        let width = 100
        let skillButtonRatio = 215 / 423
        let skill = this.props.skill
        let level = 1
        if (store[skill.store] !== undefined) {
            level = (store[skill.store] as any).level // todo force this shit
        }

        return (
            <div
                onMouseOver={() => {
                    this.setState({ hover: true })
                }}
                onMouseLeave={() => {
                    this.setState({ hover: false })
                }}
                onClick={this.props.onClick}
                style={{
                    width: width,
                    height: width * skillButtonRatio,
                    backgroundImage: `url(${SkillBG})`,
                    backgroundSize: 'cover',
                    position: 'relative',
                    transform: this.state.hover ? 'scale(0.93)' : 'scale(1)',
                    transition: 'transform 0.2s, opacity 0.4s',
                    opacity: this.state.hover ? 0.8 : 1,
                }}
            >
                <p
                    style={{
                        position: 'absolute',
                        top: '-30%',
                        right: level < 10 ? '30%' : '27%',
                        color: '#EEE',
                        fontSize: 22,
                        fontWeight: 600,
                    }}
                >
                    {level}
                </p>

                <p
                    style={{
                        position: 'absolute',
                        top: level < 10 ? '8%' : '10%',
                        right: level < 10 ? '7%' : '2%',
                        color: '#EEE',
                        fontSize: 22,
                    }}
                >
                    {level}
                </p>

                <img
                    alt="todo"
                    src={skill.icon}
                    style={{ height: 30, width: 30, position: 'absolute', left: 10, top: 10 }}
                />
            </div>
        )
    }
}
