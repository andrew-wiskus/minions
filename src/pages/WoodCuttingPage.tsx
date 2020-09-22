import React, { CSSProperties } from 'react'
import woodCutBG from '../images/woodcut_bg.png'
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

interface Tree {
    timeElapsed: number
    minions: number
    achievmentLevel: number
    achievmentXp: number
    levelRequirement: number
    xpPer: number
    timePerCycle: number
    name: string
    minionAddedBonus: number
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

let startTime = 0
let currentTime = 0
let lastUpdate = 0
let fps = 1000 / 60

export class WoodCuttingPage extends React.Component<{}, State> {
    public state: State = {
        currentTime: 0,
        woodcutting: {
            bush: {
                timeElapsed: 0,
                minions: 2,
                achievmentLevel: 1,
                achievmentXp: 10,
                levelRequirement: 0,
                xpPer: 10,
                timePerCycle: 7000,
                minionAddedBonus: 300,
                name: 'bush',
                image: BushIcon,
            },
            oak: {
                timeElapsed: 0,
                minions: 2,
                achievmentLevel: 1,
                achievmentXp: 10,
                levelRequirement: 15,
                xpPer: 15,
                timePerCycle: 10000,
                minionAddedBonus: 300,
                name: 'oak tree',
                image: OakIcon,
            },
            willow: {
                timeElapsed: 0,
                minions: 2,
                achievmentLevel: 1,
                achievmentXp: 10,
                levelRequirement: 30,
                xpPer: 22,
                timePerCycle: 15000,
                minionAddedBonus: 300,
                name: 'willow tree',
                image: WillowIcon,
            },
            teak: {
                timeElapsed: 0,
                minions: 2,
                achievmentLevel: 1,
                achievmentXp: 10,
                levelRequirement: 30,
                xpPer: 30,
                timePerCycle: 20000,
                minionAddedBonus: 300,
                name: 'teak tree',
                image: TeakIcon,
            },
            maple: {
                timeElapsed: 0,
                minions: 2,
                achievmentLevel: 1,
                achievmentXp: 10,
                levelRequirement: 30,
                xpPer: 40,
                timePerCycle: 27000,
                minionAddedBonus: 300,
                name: 'maple tree',
                image: MapleIcon,
            },
            mahogany: {
                timeElapsed: 0,
                minions: 2,
                achievmentLevel: 1,
                achievmentXp: 10,
                levelRequirement: 30,
                xpPer: 60,
                timePerCycle: 36000,
                minionAddedBonus: 300,
                name: 'mahogany tree',
                image: MahoganyIcon,
            },
            yew: {
                timeElapsed: 0,
                minions: 2,
                achievmentLevel: 1,
                achievmentXp: 10,
                levelRequirement: 30,
                xpPer: 80,
                timePerCycle: 40000,
                minionAddedBonus: 300,
                name: 'yew tree',
                image: YewIcon,
            },
            magic: {
                timeElapsed: 0,
                minions: 2,
                achievmentLevel: 1,
                achievmentXp: 10,
                levelRequirement: 30,
                xpPer: 100,
                timePerCycle: 60000,
                minionAddedBonus: 300,
                name: 'magic tree',
                image: MagicIcon,
            },
        },
    }

    private updateStateForFps = (timeElapsed: number, treeKey: string) => {
        let tree = this.state.woodcutting[treeKey]
        let cycleTime = Math.floor(tree.timePerCycle - tree.minions * tree.minionAddedBonus)

        tree.timeElapsed = tree.timeElapsed + timeElapsed
        if (tree.timeElapsed > cycleTime) {
            // CYCLE COMPLETED
            let leftOver = tree.timeElapsed - cycleTime
            tree.timeElapsed = leftOver
        }

        return tree
    }

    private draw = (timestamp?: number) => {
        if (!startTime) {
            startTime = timestamp || 0
        }

        currentTime = timestamp || 0 - startTime

        // Do something based on current time
        // console.log(currentTime)

        // update state at 30fps

        if (lastUpdate + fps < currentTime) {
            this.setState({ currentTime: currentTime })

            let wc = {}
            Object.keys(this.state.woodcutting).forEach((key) => {
                let timeElapsed = currentTime - lastUpdate
                wc[key] = this.updateStateForFps(timeElapsed, key)
            })
            this.setState({ woodcutting: wc as any })
            lastUpdate = currentTime
        }

        requestAnimationFrame(this.draw)
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
        this.draw()
    }

    public render() {
        return (
            <div style={styles.pageBackground}>
                {Object.keys(this.state.woodcutting).map((key) => {
                    let tree: any = this.state.woodcutting[key]
                    return (
                        <WoodcuttingTree
                            key={key}
                            wcKey={key}
                            tree={tree}
                            onChangeMinion={(inc: number) => this.changeMinionCount(inc, key)}
                        />
                    )
                })}
            </div>
        )
    }
}

class WoodcuttingTree extends React.Component<{ wcKey: string; tree: Tree; onChangeMinion: (inc: number) => void }> {
    public render() {
        let tree = this.props.tree
        let cycleTime = Math.floor(tree.timePerCycle - tree.minions * tree.minionAddedBonus)
        let xpPerSecondText = `${tree.xpPer * tree.minions}xp / ${cycleTime / 1000} sec`
        let progressPercent = (tree.timeElapsed / cycleTime) * 100 + '%'
        let isRow = false

        return (
            <div className="noselect" style={isRow ? styles.containerRow : styles.containerBox}>
                <div style={isRow ? { display: 'flex', flexDirection: 'column', width: 350 } : {}}>
                    <div style={{ ...styles.headerContainer, ...(isRow ? { marginBottom: -2 } : {}) }}>
                        <p
                            style={{
                                color: 'white',
                                paddingTop: 6,
                                ...(isRow ? { paddingTop: -10, marginTop: 8 } : {}),
                            }}
                        >{`${tree.name}`}</p>

                        <img
                            src={tree.image}
                            style={{
                                ...styles.treeIcon,
                                ...(isRow
                                    ? {
                                          height: 50,
                                          width: 50,
                                          marginRight: 55,
                                      }
                                    : {}),
                            }}
                        />
                    </div>
                    <p
                        style={{
                            color: 'white',
                            marginTop: -28,
                            ...(isRow ? { marginTop: -22, marginBottom: 6 } : {}),
                        }}
                    >{`${xpPerSecondText}`}</p>

                    <div style={{ width: 285, height: 30, backgroundColor: '#383e48' }}>
                        <div style={{ height: 30, width: progressPercent, backgroundColor: '#4f8c2d' }} />
                    </div>
                </div>

                <div style={styles.triButtonContainer}>
                    <div style={{ marginRight: 7, ...styles.triButton }}>
                        <div style={styles.minionCountContainer}>
                            <p style={styles.minionCountText}>{tree.minions}</p>

                            <img style={styles.minionImage} src={MinionImage} />

                            <div style={styles.minionIncrementContainer}>
                                <div
                                    style={{ ...styles.minionIncrement, borderBottom: '2px solid #2e343e' }}
                                    onClick={() => this.props.onChangeMinion(1)}
                                >
                                    <img style={styles.minionIncrementIcon} src={AddButtonIcon} />
                                </div>
                                <div
                                    style={{ ...styles.minionIncrement, borderTop: '2px solid #2e343e' }}
                                    onClick={() => this.props.onChangeMinion(-1)}
                                >
                                    <img style={styles.minionIncrementIcon} src={RemoveButtonIcon} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ ...styles.triButton }}>
                        <img src={LockIcon} style={{ width: 60, height: 60 }} />
                    </div>
                    <div style={{ marginLeft: 7, ...styles.triButton }}>
                        <img src={LockIcon} style={{ width: 60, height: 60 }} />
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    containerRow: {
        width: `calc(100% - 90px)`,
        height: 90,
        borderRadius: 5,
        backgroundColor: '#2e343e',
        borderTop: '10px solid #4f8c2d',
        zIndex: 9,
        padding: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    } as CSSProperties,
    containerBox: {
        width: 290,
        height: 190,
        borderRadius: 5,
        backgroundColor: '#2e343e',
        borderTop: '10px solid #4f8c2d',
        zIndex: 9,
        padding: 15,
        marginBottom: 15,
        marginRight: 15,
    },
    pageBackground: {
        padding: 25,
        height: '100%',
        width: '100%',
        backgroundImage: `url(${woodCutBG})`,
        display: 'flex',
        flexWrap: 'wrap',
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
        marginTop: 10,
        marginLeft: -2,
    } as CSSProperties,
    treeIcon: {
        height: 70,
        width: 70,
        objectFit: 'contain',
        marginRight: 0,
    } as CSSProperties,
}
