import React, { CSSProperties } from 'react'
import BushIcon from '../images/bush.png'
import OakIcon from '../images/oak.png'
import WillowIcon from '../images/willow.png'
import TeakIcon from '../images/teak.png'
import MapleIcon from '../images/maple.png'
import MahoganyIcon from '../images/mahogany.png'
import YewIcon from '../images/yew.png'
import MagicIcon from '../images/magic.png'

import MinionImage from '../images/minion.png'
import AddButtonIcon from '../images/addButton.png'
import RemoveButtonIcon from '../images/removeButton.png'
import LockIcon from '../images/lockIcon.png'
import { INNER_COLOR, LEVEL_GREEN, OUTER_COLOR } from '../constants'
import { MAGIC_LOG, MAHOGANY_LOG, MAPLE_LOG, OAK_LOG, STICK, TEAK_LOG, WILLOW_LOG, YEW_LOG } from '../images/itemImages'
import { inject, observer } from 'mobx-react'
import { ApplicationStore } from '../data/applicationStore'
import { loop } from '../loop'

interface Tree {
    resource_id: string
    timeElapsed: number
    minions: number
    achievmentLevel: number
    achievmentXp: number
    levelRequirement: number
    xpPer: number
    timePerCycle: number
    name: string
    image: string
}

interface State {
    currentTime: number
    woodcutting: {
        bush: Tree
        oak: Tree
        willow: Tree
        teak: Tree
        maple: Tree
        mahogany: Tree
        yew: Tree
        magic: Tree
    }
}

function minionPercent(minionCount: number, percentPer: number) {
    let base = 1
    loop(minionCount)(() => (base = base * percentPer))
    return base
}

let startTime = 0
let currentTime = 0
let lastUpdate = 0
let fps = 1000 / 60

@inject('applicationStore')
@observer
export class WoodCuttingPage extends React.Component<{ applicationStore?: ApplicationStore }, State> {
    public state: State = {
        currentTime: 0,
        woodcutting: {
            bush: {
                resource_id: STICK,
                timeElapsed: 0,
                minions: 2,
                achievmentLevel: 1,
                achievmentXp: 10,
                levelRequirement: 0,
                xpPer: 10,
                timePerCycle: 7000,
                name: 'bush',
                image: BushIcon,
            },
            oak: {
                resource_id: OAK_LOG,
                timeElapsed: 0,
                minions: 2,
                achievmentLevel: 1,
                achievmentXp: 10,
                levelRequirement: 15,
                xpPer: 15,
                timePerCycle: 10000,
                name: 'oak tree',
                image: OakIcon,
            },
            willow: {
                resource_id: WILLOW_LOG,
                timeElapsed: 0,
                minions: 2,
                achievmentLevel: 1,
                achievmentXp: 10,
                levelRequirement: 30,
                xpPer: 22,
                timePerCycle: 15000,
                name: 'willow tree',
                image: WillowIcon,
            },
            teak: {
                resource_id: TEAK_LOG,
                timeElapsed: 0,
                minions: 2,
                achievmentLevel: 1,
                achievmentXp: 10,
                levelRequirement: 30,
                xpPer: 30,
                timePerCycle: 20000,
                name: 'teak tree',
                image: TeakIcon,
            },
            maple: {
                resource_id: MAPLE_LOG,
                timeElapsed: 0,
                minions: 2,
                achievmentLevel: 1,
                achievmentXp: 10,
                levelRequirement: 30,
                xpPer: 40,
                timePerCycle: 27000,
                name: 'maple tree',
                image: MapleIcon,
            },
            mahogany: {
                resource_id: MAHOGANY_LOG,
                timeElapsed: 0,
                minions: 2,
                achievmentLevel: 1,
                achievmentXp: 10,
                levelRequirement: 30,
                xpPer: 60,
                timePerCycle: 36000,
                name: 'mahogany tree',
                image: MahoganyIcon,
            },
            yew: {
                resource_id: YEW_LOG,
                timeElapsed: 0,
                minions: 2,
                achievmentLevel: 1,
                achievmentXp: 10,
                levelRequirement: 30,
                xpPer: 80,
                timePerCycle: 40000,
                name: 'yew tree',
                image: YewIcon,
            },
            magic: {
                resource_id: MAGIC_LOG,
                timeElapsed: 0,
                minions: 2,
                achievmentLevel: 1,
                achievmentXp: 10,
                levelRequirement: 30,
                xpPer: 100,
                timePerCycle: 60000,
                name: 'magic tree',
                image: MagicIcon,
            },
        },
    }

    private changeMinionCount = (inc: number, treeKey: string) => {
        let tree = this.state.woodcutting[treeKey]
        let newCount = tree.minions + inc
        newCount = Math.max(0, newCount)
        tree.minions = newCount

        let wc = this.state.woodcutting
        wc[treeKey] = tree

        this.setState({ woodcutting: wc })
    }

    public componentDidMount() {
        //
    }

    public render() {
        let headerRatio = 198 / 826
        let headerWidth = 470

        return (
            <>
                <div
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        width: `100%`,
                        paddingTop: 15,
                    }}
                >
                    <div
                        style={{
                            width: headerWidth,
                            backgroundColor: OUTER_COLOR,
                            height: headerWidth * headerRatio,
                            borderRadius: 8,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div
                            style={{
                                transform: 'scale(0.85)',
                                marginLeft: -10,
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <p style={{ color: 'white', fontWeight: 'lighter', marginTop: 5, marginLeft: 10 }}>
                                <span style={{ fontSize: 25 }}>woodcutting</span>
                                <br />
                                level: 29
                                <br />
                                minions: 22/22
                            </p>
                            <div
                                style={{
                                    backgroundColor: INNER_COLOR,
                                    width: 200,
                                    height: 30,
                                    borderRadius: 8,
                                    overflow: 'hidden',
                                    marginTop: -10,
                                    marginLeft: 10,
                                    position: 'relative',
                                }}
                            >
                                <div style={{ backgroundColor: LEVEL_GREEN, width: '30%', height: 30 }} />
                                <p
                                    style={{
                                        position: 'absolute',
                                        left: 0,
                                        right: 0,
                                        top: -12,
                                        color: 'white',
                                        fontSize: 18,
                                        fontWeight: 500,
                                        textAlign: 'center',
                                    }}
                                >
                                    23.2k/28.6k
                                </p>
                            </div>
                        </div>

                        <div>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    marginRight: 0,
                                    transform: 'scale(0.8)',
                                    marginTop: 0,
                                }}
                            >
                                <p style={{ fontSize: 12, color: 'white', marginRight: 20 }}>
                                    <span style={{ color: 'red' }}>2.4k/200k oak</span>
                                    <br />
                                    <span style={{ color: '#FFD05B' }}>401k/100k teak</span>
                                    <br />
                                    <span style={{ color: '#FFD05B' }}>53k/40k maple</span>
                                    <br />
                                    <span style={{ color: '#FFD05B' }}>14.4k/10k yew</span>
                                </p>
                                <img
                                    alt="todo"
                                    style={{
                                        height: 80,
                                        width: 60,
                                        objectFit: 'contain',
                                        marginLeft: 10,
                                        marginTop: -4,
                                    }}
                                    src={MinionImage}
                                />
                            </div>

                            <CraftMinionButton />
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: headerWidth,
                        height: 30,
                        paddingLeft: 15,
                        paddingTop: 15,
                        justifyContent: 'space-between',
                    }}
                >
                    <SkillInfoButton text={'achievments'} />
                    <SkillInfoButton text={'stats'} />
                    <SkillInfoButton text={'information'} />
                </div>
                <div style={styles.pageBackground}>
                    {Object.keys(this.state.woodcutting).map((key, i) => {
                        let tree: any = this.state.woodcutting[key]
                        return (
                            <WoodcuttingTree
                                key={i}
                                wcKey={key}
                                tree={tree}
                                onChangeMinion={(inc: number) => this.changeMinionCount(inc, key)}
                            />
                        )
                    })}
                </div>
            </>
        )
    }
}

class SkillInfoButton extends React.Component<{ text: string }, { hover: boolean }> {
    public state = {
        hover: false,
    }

    public render() {
        return (
            <div
                style={{
                    backgroundColor: this.state.hover ? '#999' : INNER_COLOR,
                    height: 30,
                    width: `30%`,
                    borderRadius: 8,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    fontWeight: 'lighter',
                    fontSize: 14,
                    transform: this.state.hover ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.2s, background-color 0.5s ease',
                    cursor: 'pointer',
                }}
                onMouseOver={() => {
                    this.setState({ hover: true })
                }}
                onMouseLeave={() => {
                    this.setState({ hover: false })
                }}
            >
                {this.props.text}
            </div>
        )
    }
}

class CraftMinionButton extends React.Component<{}, { hover: boolean }> {
    public state = {
        hover: false,
    }

    public render() {
        return (
            <div
                style={{
                    backgroundColor: this.state.hover ? '#999' : INNER_COLOR,
                    height: 25,
                    width: 160,
                    borderRadius: 8,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    fontWeight: 'lighter',
                    fontSize: 14,
                    marginRight: -50,
                    marginLeft: 15,
                    transform: this.state.hover ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.2s, background-color 0.5s ease',
                    cursor: 'pointer',
                    marginTop: -7,
                }}
                onMouseOver={() => {
                    this.setState({ hover: true })
                }}
                onMouseLeave={() => {
                    this.setState({ hover: false })
                }}
            >
                craft minion
            </div>
        )
    }
}

class WoodcuttingTree extends React.Component<{
    wcKey: string
    tree: Tree
    onChangeMinion: (inc: number) => void
}> {
    public render() {
        let tree = this.props.tree
        let adjustedForMinion = minionPercent(tree.minions, 0.9)
        let cycleTime = Math.floor(tree.timePerCycle * adjustedForMinion)
        let xpPerSecondText = `${tree.xpPer}xp / ${cycleTime / 1000} sec`
        let progressPercent = (tree.timeElapsed / cycleTime) * 100 + '%'

        return (
            <div
                key={this.props.wcKey}
                className="noselect"
                style={{
                    ...styles.containerBox,
                }}
            >
                <div style={{ transform: 'scale(0.7)', marginLeft: -30, marginTop: -20 }}>
                    <div style={{ ...styles.headerContainer }}>
                        <p
                            style={{
                                color: 'white',
                                paddingTop: 6,
                            }}
                        >{`${tree.name}`}</p>

                        <img alt="todo" src={tree.image} style={{ ...styles.treeIcon }} />
                    </div>
                    <p
                        style={{
                            color: 'white',
                            marginTop: -28,
                        }}
                    >{`${xpPerSecondText}`}</p>

                    <div style={{ width: 285, height: 30, backgroundColor: '#383e48' }}>
                        <div style={{ height: 30, width: progressPercent, backgroundColor: LEVEL_GREEN }} />
                    </div>
                </div>

                <div style={styles.triButtonContainer}>
                    <div style={{ marginRight: 7, ...styles.triButton }}>
                        <div style={styles.minionCountContainer}>
                            <p style={styles.minionCountText}>{tree.minions}</p>

                            <img alt="todo" style={styles.minionImage} src={MinionImage} />

                            <div style={styles.minionIncrementContainer}>
                                <div
                                    style={{ ...styles.minionIncrement, borderBottom: '2px solid #2e343e' }}
                                    onClick={() => this.props.onChangeMinion(1)}
                                >
                                    <img alt="todo" style={styles.minionIncrementIcon} src={AddButtonIcon} />
                                </div>
                                <div
                                    style={{ ...styles.minionIncrement, borderTop: '2px solid #2e343e' }}
                                    onClick={() => this.props.onChangeMinion(-1)}
                                >
                                    <img alt="todo" style={styles.minionIncrementIcon} src={RemoveButtonIcon} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ ...styles.triButton }}>
                        <img alt="todo" src={LockIcon} style={{ width: 60, height: 60 }} />
                    </div>
                    <div style={{ marginLeft: 7, ...styles.triButton }}>
                        <img alt="todo" src={LockIcon} style={{ width: 60, height: 60 }} />
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    containerBox: {
        width: 290 * 0.7,
        height: 190 * 0.7,
        borderRadius: 5,
        backgroundColor: '#2e343e',
        borderTop: '10px solid #4f8c2d',
        zIndex: 9,
        padding: 15 * 0.7,
        marginBottom: 15,
    },
    pageBackground: {
        paddingTop: 25,
        width: 'calc(100% - 30px)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingBottom: 100,
    } as CSSProperties,
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 10,
    } as CSSProperties,
    triButton: {
        display: 'flex',
        width: `100%`,
        backgroundColor: '#383e48',
        borderRadius: 8,
        border: '2px solid #2e343e',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    } as CSSProperties,
    minionIncrement: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height: '100%',
        borderLeft: '4px solid #2e343e',
    },
    minionIncrementIcon: {
        width: 40,
        height: 18,
        objectFit: 'contain',
    } as CSSProperties,
    minionIncrementContainer: {
        position: 'absolute',
        right: 0,
        width: 40,
        top: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
    } as CSSProperties,
    minionCountText: {
        position: 'absolute',
        left: 6,
        color: 'white',
        fontSize: 16,
        top: 30,
        width: 40,
        textAlign: 'center',
    } as CSSProperties,
    minionCountContainer: {
        display: 'relative',
        width: '100%',
        height: '100%',
    } as CSSProperties,
    minionImage: {
        height: 35,
        width: 35,
        position: 'absolute',
        left: 6,
        top: 7,
    } as CSSProperties,
    triButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: 70,
        width: 289,
        // marginLeft: -2,
        transform: 'scale(0.7)',
        marginLeft: -40,
        marginTop: -10,
    } as CSSProperties,
    treeIcon: {
        height: 70,
        width: 70,
        objectFit: 'contain',
        marginRight: 0,
    } as CSSProperties,
}
