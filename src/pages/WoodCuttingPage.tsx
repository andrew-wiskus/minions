import React, { CSSProperties } from 'react'
import MinionImage from '../images/minion.png'
import AddButtonIcon from '../images/addButton.png'
import RemoveButtonIcon from '../images/removeButton.png'
import LockIcon from '../images/lockIcon.png'
import { INNER_COLOR, LEVEL_GREEN, OUTER_COLOR } from '../constants'
import { inject, observer } from 'mobx-react'
import { ApplicationStore } from '../data/applicationStore'
import { Tree } from '../data/woodcuttingData'
import { truncLargeNumber } from '../data/_level_xp'
import { loop } from '../loop'

@inject('applicationStore')
@observer
export class WoodCuttingPage extends React.Component<{ applicationStore?: ApplicationStore }> {
    public render() {
        let store = this.props.applicationStore!.woodcuttingStore
        let allTreeData = store.treeData

        let headerRatio = 198 / 826
        let headerWidth = 470
        let xpText = `${truncLargeNumber(store.xp, 1)}/${truncLargeNumber(store.nextLevelXp, 1)}`

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
                                width: 300,
                            }}
                        >
                            <p style={{ color: 'white', fontWeight: 'lighter', marginTop: 5, marginLeft: 10 }}>
                                <span style={{ fontSize: 25 }}>woodcutting</span>
                                <br />
                                level: {store.level}
                                <br />
                                minions: {store.usedMinions}/{store.totalMinions}
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
                                    {xpText}
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
                                    width: 190,
                                    height: `100%`,
                                    position: 'relative',
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: 12,
                                        color: 'white',
                                        marginRight: 20,
                                        position: 'absolute',
                                        textAlign: 'right',
                                        top: 0,
                                        left: -200,
                                        width: 300,
                                    }}
                                >
                                    <MinionCraftRecipie />
                                </div>
                                <img
                                    alt="todo"
                                    style={{
                                        position: 'absolute',
                                        right: 15,
                                        top: 0,
                                        height: 80,
                                        width: 60,
                                        objectFit: 'contain',
                                        marginLeft: 10,
                                        marginTop: -4,
                                    }}
                                    src={MinionImage}
                                />
                                <div style={{ position: 'absolute', bottom: 5, height: 20 }}>
                                    <CraftMinionButton />
                                </div>
                            </div>
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
                    {Object.keys(allTreeData).map((key, i) => {
                        let tree: any = allTreeData[key]
                        return (
                            <WoodcuttingTree
                                key={i}
                                wcKey={key}
                                tree={tree}
                                onChangeMinion={(inc: number) => store.incMinionToTree(key, inc)}
                            />
                        )
                    })}
                </div>
            </>
        )
    }
}

@inject('applicationStore')
@observer
class MinionCraftRecipie extends React.Component<{ applicationStore?: ApplicationStore }> {
    public render() {
        const store = this.props.applicationStore!
        const recipie = store.woodcuttingStore.nextMinionCraft
        const items = store.bankStore.items

        return (
            <>
                {Object.keys(recipie).map((key, index) => {
                    let req = recipie[key]
                    let bankItem = items.find((x) => x.id === key)
                    if (bankItem === undefined) {
                        throw Error('undefined bank item when trying to make minion recipie')
                    }
                    let amount = bankItem.count
                    let color = amount >= req ? '#FFD05B' : 'red'

                    return (
                        <div key={index}>
                            <span style={{ color: color }}>{`
                            ${truncLargeNumber(amount, 1)}
                            /
                            ${truncLargeNumber(req, 1)}
                            ${paddingLeft(key.toLowerCase().replace('_', '').replace('log', ''), 8)}
                            
                            `}</span>
                            {index !== Object.keys(recipie).length - 1 && <br />}
                        </div>
                    )
                })}
            </>
        )
    }
}

const paddingLeft = function (str, paddingValue) {
    let pad = ''
    if (str.length < paddingValue) {
        loop(paddingValue - str.length)(() => (pad += ''))
    }
    return pad + str
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

@inject('applicationStore')
class CraftMinionButton extends React.Component<{ applicationStore?: ApplicationStore }, { hover: boolean }> {
    public state = {
        hover: false,
    }

    public render() {
        return (
            <div
                onClick={this.props.applicationStore!.woodcuttingStore.craftMinion}
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

@inject('applicationStore')
@observer
class WoodcuttingTree extends React.Component<{
    wcKey: string
    tree: Tree
    applicationStore?: ApplicationStore
    onChangeMinion: (inc: number) => void
}> {
    public render() {
        let tree = this.props.tree
        let cycleTime = tree.getTimePerCycle()
        let xpPerSecondText = `${tree.xpPer}xp / ${Math.floor(cycleTime / 100) / 10} sec`
        let progressPercent = (tree.timeElapsed / cycleTime) * 100 + '%'
        let notLevelRequired = this.props.applicationStore!.woodcuttingStore.level < tree.levelRequirement

        return (
            <div
                key={this.props.wcKey}
                className="noselect"
                style={{
                    ...styles.containerBox,
                    opacity: notLevelRequired ? 0.6 : 1,
                    borderTop: tree.minions === 0 ? '10px solid grey' : styles.containerBox.borderTop,
                    position: 'relative',
                }}
            >
                {notLevelRequired && (
                    <div
                        style={{
                            position: 'absolute',
                            top: -10,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            borderRadius: 8,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 99,
                        }}
                    >
                        <img alt={'locked'} src={LockIcon} style={{ height: 150, width: 150 }} />
                    </div>
                )}
                <div
                    style={{
                        transform: 'scale(0.7)',
                        marginLeft: -30,
                        marginTop: -20,
                    }}
                >
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
