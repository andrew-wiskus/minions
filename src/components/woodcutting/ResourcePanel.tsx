import { inject, observer } from 'mobx-react'
import React, { CSSProperties } from 'react'
import { INNER_COLOR, LEVEL_GREEN } from '../../constants'
import { ApplicationStore } from '../../data/applicationStore'
import LockIcon from '../../images/lockIcon.png'
import MinionImage from '../../images/minion.png'
import AddButtonIcon from '../../images/addButton.png'
import RemoveButtonIcon from '../../images/removeButton.png'
import { Resource, Tree } from '../../models/Tree'

@inject('applicationStore')
@observer
export class ResourcePanel extends React.Component<{
    wcKey: string
    resource: Tree
    applicationStore?: ApplicationStore
    onChangeMinion: (inc: number) => void
    level: number
}> {
    public render() {
        let resource = this.props.resource
        let cycleTime = resource.getTimePerCycle()
        let xpPerSecondText = `${resource.xpPer}xp / ${Math.floor(cycleTime / 100) / 10} sec`
        let progressPercent = (resource.timeElapsed / cycleTime) * 100 + '%'
        let notLevelRequired = this.props.level < resource.levelRequirement
        let containerStyle = {
            opacity: notLevelRequired ? 0.6 : 1,
            borderTop: resource.minions === 0 ? '10px solid grey' : styles.containerBox.borderTop,
        }

        return (
            <div key={this.props.wcKey} className="noselect" style={{ ...styles.containerBox, ...containerStyle }}>
                {notLevelRequired && (
                    <div style={styles.lockOverlay}>
                        <img alt={'locked'} src={LockIcon} style={styles.lockIconLarge} />
                    </div>
                )}

                <div style={styles.headerContainer}>
                    <div style={styles.nameAndIconContainer}>
                        <p style={styles.resourceNameText}>{`${resource.name}`}</p>

                        <img alt="todo" src={resource.image} style={styles.resourceIcon} />
                    </div>
                    <p style={styles.xpPerSecondText}>{`${xpPerSecondText}`}</p>

                    <div style={styles.progressBarContainer}>
                        <div style={{ height: 30, width: progressPercent, backgroundColor: LEVEL_GREEN }} />
                    </div>
                </div>

                <div style={styles.triButtonContainer}>
                    <MinionCounter onChangeMinion={this.props.onChangeMinion} resource={resource} />

                    <div style={styles.triButton}>
                        <img alt="todo" src={LockIcon} style={styles.lockIconSmall} />
                    </div>

                    <div style={{ marginLeft: 7, ...styles.triButton }}>
                        <img alt="todo" src={LockIcon} style={styles.lockIconSmall} />
                    </div>
                </div>
            </div>
        )
    }
}

export class MinionCounter extends React.Component<{ resource: Resource; onChangeMinion: (inc: number) => void }> {
    public render() {
        return (
            <div style={{ marginRight: 7, ...styles.triButton }}>
                <div style={styles.minionCountContainer}>
                    <p style={styles.minionCountText}>{this.props.resource.minions}</p>

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
        position: 'relative',
    } as CSSProperties,
    lockIconSmall: {
        width: 60,
        height: 60,
    },
    progressBarContainer: {
        width: 285,
        height: 30,
        backgroundColor: '#383e48',
    },
    resourceNameText: {
        color: 'white',
        paddingTop: 6,
    } as CSSProperties,
    lockOverlay: {
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
    } as CSSProperties,
    xpPerSecondText: {
        color: 'white',
        marginTop: -28,
    },
    headerContainer: {
        transform: 'scale(0.7)',
        marginLeft: -30,
        marginTop: -20,
    } as CSSProperties,
    lockIconLarge: {
        height: 150,
        width: 150,
    },
    nameAndIconContainer: {
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
    resourceIcon: {
        height: 60,
        width: 60,
        objectFit: 'contain',
        marginRight: -60,
        backgroundColor: INNER_COLOR,
        borderRadius: 8,
        padding: 5
    } as CSSProperties,
}
