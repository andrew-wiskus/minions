import React, { CSSProperties } from 'react'
import './App.css'
import { WoodCuttingPage } from './pages/WoodCuttingPage'
import { BankPage } from './pages/BankPage'
import { PageRoute, GATHER_SKILLS } from './config/skillConfig'
import { GameBar } from './components/navigation/NavBar'
import { INNER_COLOR, OUTER_COLOR } from './constants'
import { MinionCounter } from './components/woodcutting/ResourcePanel'
import LockIcon from './images/lockIcon.png'
import { ALL_FISHING_SPOTS } from './config/fishingConfig'
import { FishingSpot } from './models/FishingSpot'
import { SHRIMP_NORMAL } from './config/itemConfig'
import { SHRIMP_NORMAL_ICON } from './images/itemImages'



interface State {
    currentPage: PageRoute
}

export class App extends React.Component<{}, State> {
    public state: State = {
        currentPage: PageRoute.FISHING,
    }

    private getBigForSkill = () => {
        let currentSkill = GATHER_SKILLS.find((x) => x.onClickRoute === this.state.currentPage)
        if (currentSkill === undefined) {
            return null
        }
        return currentSkill.background
    }

    public render() {
        return (
            <div
                style={{
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    height: '100vh',
                    width: '518px',
                    backgroundImage: `url(${this.getBigForSkill()})`,
                    boxSizing: "content-box"
                }}
            >
                <GameBar onClickRoute={(route: PageRoute) => this.setState({ currentPage: route })} />
                {this.state.currentPage === PageRoute.WOODCUTTING && <WoodCuttingPage />}
                {this.state.currentPage === PageRoute.FISHING && <FishingPage />}
                {this.state.currentPage === PageRoute.BANK && <BankPage />}
            </div>
        )
    }
}

export default App

export class FishingPage extends React.Component {
    public render(): JSX.Element {
        return (
            <div
                style={{
                    width: `100%`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: 15,
                }}
            >
                {Object.keys(ALL_FISHING_SPOTS).map((key) => {
                    return <FishResourcePanel key={key} fishingSpot={ALL_FISHING_SPOTS[key]} />
                })}
            </div>
        )
    }
}

class FishResourcePanel extends React.Component<{ fishingSpot: FishingSpot }> {
    public render() {

        let config = {
            fishingSpotName: 'shrimpy cove',
            minCatchSpeed: 1200,
            maxCatchSpeed: 5300,
            treasureChance: 0.14,
            rareityModifier: 22,
            id: 'SHRIMPY_COVE',
            fish_1: {
                resource_id: SHRIMP_NORMAL,
                image: SHRIMP_NORMAL_ICON,
                name: 'Shrimip Regular',
                catchWeight: 5,
                xp: 10,
            },
            fish_2: {
                resource_id: SHRIMP_NORMAL,
                image: SHRIMP_NORMAL_ICON,
                name: 'Shrimp Prime',
                catchWeight: 3,
                xp: 15,
            },
            fish_3: {
                resource_id: SHRIMP_NORMAL,
                image: SHRIMP_NORMAL_ICON,
                name: 'Shrimp Multi',
                catchWeight: 2,
                xp: 20,
            },
            fish_4: {
                resource_id: SHRIMP_NORMAL,
                image: SHRIMP_NORMAL_ICON,
                name: 'Shrimp Prawn',
                catchWeight: 1,
                xp: 25,
            },
        }
        return (
            <div style={styles.resourcePanelContainer}>
                {config.fish_1 !== undefined && (
                    <div style={{ top: 10, right: 20, backgroundColor: INNER_COLOR, ...styles.fishIcon }}>
                        <img alt="" style={styles.icon} src={config.fish_1.image} />
                    </div>
                )}
                {config.fish_2 !== undefined && (
                    <div style={{ top: 50, right: 20, backgroundColor: INNER_COLOR, ...styles.fishIcon }}>
                        <img alt="" style={styles.icon} src={config.fish_2.image} />
                    </div>
                )}
                {config.fish_3 !== undefined && (
                    <div style={{ top: 10, right: 60, backgroundColor: INNER_COLOR, ...styles.fishIcon }}>
                        <img alt="" style={styles.icon} src={config.fish_3.image} />
                    </div>
                )}
                {config.fish_4 !== undefined && (
                    <div style={{ top: 50, right: 60, backgroundColor: INNER_COLOR, ...styles.fishIcon }}>
                        <img alt="" style={styles.icon} src={config.fish_4.image} />
                    </div>
                )}

                <div style={{ top: 10, right: 100, backgroundColor: INNER_COLOR, ...styles.fishIcon }}>
                    <img alt="" style={styles.icon} src={LockIcon} />
                </div>
                <div style={{ top: 50, right: 100, backgroundColor: INNER_COLOR, ...styles.fishIcon }}>
                    <img alt="" style={styles.icon} src={LockIcon} />
                </div>
                <div style={styles.minionCounterContainer}>
                    <MinionCounter
                        resource={this.props.fishingSpot}
                        onChangeMinion={(inc: number) => {
                                // STORE.INCMINION
                        }}
                    />
                </div>

                <div
                    style={{
                        height: 80,
                        paddingTop: 0,
                        width: 180,
                        position: 'absolute',
                        top: -5,
                        left: 120,
                    }}
                >
                    <p style={{ color: 'white', fontSize: 11, fontWeight: 'lighter' }}>
                        <span style={{ fontSize: 18, lineHeight: 1.5, fontWeight: 'bolder' }}>
                            {config.fishingSpotName}
                        </span>{' '}
                        <br />
                        catch speed: {config.minCatchSpeed / 1000} - {config.maxCatchSpeed / 1000} sec <br />
                        exp/hr: {this.props.fishingSpot.avgExpPerHour()}
                        <br />
                        tresure change: {roundToNearest(config.treasureChance * 100, 2)}%
                        <br />
                        rareity modifier: {config.rareityModifier}
                        <br />
                    </p>
                </div>

                <div style={styles.progressBarContainer}>
                    <div style={styles.progressBarInner(40)} />
                </div>
            </div>
        )
    }
}

function roundToNearest(num, places) {
    var multiplier = Math.pow(10, places)
    return Math.round(num * multiplier) / multiplier
}

const styles = {
    fishIcon: {
        height: 30,
        width: 30,
        border: '2px solid ' + INNER_COLOR,
        borderRadius: 5,
        zIndex: 999,
        position: 'absolute',
    } as CSSProperties,
    resourcePanelContainer: {
        width: '90%',
        height: 150,
        backgroundColor: OUTER_COLOR,
        borderRadius: 8,
        position: 'relative',
    } as CSSProperties,
    minionCounterContainer: {
        position: 'absolute',
        top: 15,
        left: 15,
        display: 'flex',
        flexDirection: 'row',
        height: 70,
        width: 100,
        zIndex: 99,
    } as CSSProperties,
    icon: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        objectFit: 'contain',
        width: `100%`,
    } as CSSProperties,
    progressBarContainer: {
        position: 'absolute',
        bottom: 15,
        left: 20,
        right: 20,
        height: 40,
        backgroundColor: INNER_COLOR,
        borderRadius: 5,
        overflow: 'hidden',
    } as CSSProperties,
    progressBarInner: (percent: number) => {
        return {
            position: 'absolute',
            left: 0,
            bottom: 0,
            top: 0,
            backgroundColor: '#0A86E3',
            width: percent + '%',
        } as CSSProperties
    },
}
