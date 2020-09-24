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
        currentPage: PageRoute.BANK,
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
                {this.state.currentPage == PageRoute.WOODCUTTING && <WoodCuttingPage />}
                {this.state.currentPage == PageRoute.BANK && <BankPage />}
            </div>
        )
    }
}

export default App

interface Skill {
    name: string
    icon: string
    level: number
    currentLevel: number
    xp: number
    onClickRoute: string
}

let skills: Skill[] = [
    {
        name: 'Woodcutting',
        icon: WoodcuttingIcon,
        level: 1,
        currentLevel: 1,
        xp: 0,
        onClickRoute: PageRoute.WOODCUTTING,
    },
    {
        name: 'Fishing',
        icon: FishingIcon,
        level: 1,
        currentLevel: 1,
        xp: 0,
        onClickRoute: 'Fishing',
    },
    {
        name: 'Mining',
        icon: MiningIcon,
        level: 1,
        currentLevel: 1,
        xp: 0,
        onClickRoute: 'Mining',
    },
    {
        name: 'Farming',
        icon: FarmingIcon,
        level: 1,
        currentLevel: 1,
        xp: 0,
        onClickRoute: 'Farming',
    },
    {
        name: 'Hunting ',
        icon: HuntingIcon,
        level: 1,
        currentLevel: 1,
        xp: 0,
        onClickRoute: 'Hunting ',
    },
    {
        name: 'Divination',
        icon: DivinationIcon,
        level: 1,
        currentLevel: 1,
        xp: 0,
        onClickRoute: 'Divination',
    },
    {
        name: 'Diplomacy',
        icon: DiplomacyIcon,
        level: 1,
        currentLevel: 1,
        xp: 0,
        onClickRoute: 'Diplomacy',
    },
    {
        name: 'Artifact Digging ',
        icon: ArtifactDiggingIcon,
        level: 1,
        currentLevel: 1,
        xp: 0,
        onClickRoute: 'ArtifactDigging ',
    },
    {
        name: 'Gem Mining',
        icon: GemMiningIcon,
        level: 1,
        currentLevel: 1,
        xp: 0,
        onClickRoute: 'Gem Mining',
    },
    {
        name: 'Foraging ',
        icon: ForagingIcon,
        level: 1,
        currentLevel: 1,
        xp: 0,
        onClickRoute: 'Foraging ',
    },
    {
        name: 'Essence Gathering',
        icon: EssenceGatheringIcon,
        level: 1,
        currentLevel: 1,
        xp: 0,
        onClickRoute: 'EssenceGathering',
    },
    {
        name: 'Study',
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
export class SkillDisplayButton extends React.Component<{ skill: Skill; onClick: () => void }, { hover: boolean }> {
    public state = {
        hover: false,
    }

    public render() {
        let width = 100
        let skillButtonRatio = 215 / 423
        let skill = this.props.skill

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
                        right: skill.currentLevel < 10 ? '30%' : '27%',
                        color: '#EEE',
                        fontSize: 22,
                        fontWeight: 600,
                    }}
                >
                    {skill.currentLevel}
                </p>

                <p
                    style={{
                        position: 'absolute',
                        top: skill.level < 10 ? '8%' : '10%',
                        right: skill.level < 10 ? '7%' : '2%',
                        color: '#EEE',
                        fontSize: 22,
                    }}
                >
                    {skill.level}
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
