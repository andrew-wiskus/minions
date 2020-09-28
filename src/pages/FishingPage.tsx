import React, { CSSProperties } from "react"
import { MinionCounter } from "../components/woodcutting/ResourcePanel"
import { INNER_COLOR, OUTER_COLOR } from "../constants"
import { FishingSpot } from "../models/FishingSpot"
import LockIcon from '../images/lockIcon.png'
import { inject, observer } from "mobx-react"
import { ApplicationStore } from "../data/applicationStore"

@inject('applicationStore')
@observer
export class FishingPage extends React.Component<{applicationStore?: ApplicationStore}> {
    public render(): JSX.Element {
        let store = this.props.applicationStore!.fishingStore

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
                {Object.keys(store.fishingData).map((key) => {
                    return <FishResourcePanel key={key} fishingSpot={store.fishingData[key]} />
                })}
            </div>
        )
    }
}
@inject('applicationStore')
@observer
class FishResourcePanel extends React.Component<{ fishingSpot: FishingSpot, applicationStore?: ApplicationStore }> {
    public render() {
        let store = this.props.applicationStore!.fishingStore 
        let fishingSpot = this.props.fishingSpot
        let progressPercent = Math.floor((fishingSpot.timeElapsed / fishingSpot.currentCycleSpeed) * 100)
        
        return (
            <div style={styles.resourcePanelContainer}>
                {fishingSpot.fish_1 !== undefined && (
                    <div style={{ top: 10, right: 20, backgroundColor: INNER_COLOR, ...styles.fishIcon }}>
                        <img alt="" style={styles.icon} src={fishingSpot.fish_1.image} />
                    </div>
                )}
                {fishingSpot.fish_2 !== undefined && (
                    <div style={{ top: 50, right: 20, backgroundColor: INNER_COLOR, ...styles.fishIcon }}>
                        <img alt="" style={styles.icon} src={fishingSpot.fish_2.image} />
                    </div>
                )}
                {fishingSpot.fish_3 !== undefined && (
                    <div style={{ top: 10, right: 60, backgroundColor: INNER_COLOR, ...styles.fishIcon }}>
                        <img alt="" style={styles.icon} src={fishingSpot.fish_3.image} />
                    </div>
                )}
                {fishingSpot.fish_4 !== undefined && (
                    <div style={{ top: 50, right: 60, backgroundColor: INNER_COLOR, ...styles.fishIcon }}>
                        <img alt="" style={styles.icon} src={fishingSpot.fish_4.image} />
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
                            //   this.props.fishingSpot.incMinion(inc)
                            store.incMinion(this.props.fishingSpot.id, inc)
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
                            {fishingSpot.name}
                        </span>{' '}
                        <br />
                        speed: {fishingSpot.minCatchSpeed / 1000} - {fishingSpot.maxCatchSpeed / 1000} sec
                        <br />
                        tresure change: {roundToNearest(fishingSpot.treasureChance * 1, 2)}%
                        <br />
                        rareity modifier: {fishingSpot.rareityModifier}
                        <br />
                    </p>
                </div>

                <div style={styles.progressBarContainer}>
                    <div style={styles.progressBarInner(progressPercent)} />
                </div>
            </div>
        )
    }
}

export function roundToNearest(num, places) {
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
        marginBottom: 15,
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
