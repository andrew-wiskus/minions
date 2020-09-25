import React, { CSSProperties } from 'react'
import MinionImage from '../images/minion.png'
import { INNER_COLOR, LEVEL_GREEN, OUTER_COLOR } from '../constants'
import { inject, observer } from 'mobx-react'
import { ApplicationStore } from '../data/applicationStore'
import { truncLargeNumber } from '../models/levelXpData'
import { CraftMinionButton } from '../components/woodcutting/MinionCraftButton'
import { MinionCraftRecipie } from '../components/woodcutting/MinionCraftRecipie'
import { SkillInfoButton } from '../components/woodcutting/SkillInfoButton'
import { ResourcePanel } from '../components/woodcutting/ResourcePanel'

let headerRatio = 198 / 826
let headerWidth = 470
@inject('applicationStore')
@observer
export class WoodCuttingPage extends React.Component<{ applicationStore?: ApplicationStore }> {
    public render() {
        let store = this.props.applicationStore!.woodcuttingStore
        let allTreeData = store.treeData
        let xpText = `${truncLargeNumber(store.xp, 1)}/${truncLargeNumber(store.nextLevelXp, 1)}`

        return (
            <>
                <div style={styles.container}>
                    <div style={styles.headerBlockContainer}>
                        <div style={styles.skillInfoContainer}>
                            {/* SKILL HEADER TEXT */}
                            <p style={styles.headerText}>
                                <span style={{ fontSize: 25 }}>woodcutting</span>
                                <br />
                                level: {store.level}
                                <br />
                                minions: {store.usedMinions}/{store.totalMinions}
                            </p>
                            {/* END */}

                            {/* XP PROGRESS BAR */}
                            <div style={styles.xpProgressBarContainer}>
                                <div
                                    style={{
                                        backgroundColor: LEVEL_GREEN,
                                        width: store.levelCompletePercent + '%',
                                        height: 30,
                                    }}
                                />
                                <p style={styles.xpText}>{xpText}</p>
                            </div>
                            {/* END */}
                        </div>

                        {/* MINION CRAFT AREA */}
                        <div>
                            <div style={styles.minionCraftContainer}>
                                <div style={styles.minionCraftRecipie}>
                                    <MinionCraftRecipie />
                                </div>
                                <img alt="todo" style={styles.minionIcon} src={MinionImage} />
                                <div style={styles.craftMinionButton}>
                                    <CraftMinionButton />
                                </div>
                            </div>
                        </div>
                        {/* END */}
                    </div>
                </div>

                <div style={styles.skillButtonRow}>
                    <SkillInfoButton text={'achievments'} />
                    <SkillInfoButton text={'stats'} />
                    <SkillInfoButton text={'information'} />
                </div>

                <div style={styles.pageBackground}>
                    {Object.keys(allTreeData).map((key, i) => {
                        let tree: any = allTreeData[key]
                        return (
                            <ResourcePanel
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

const styles = {
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        width: `100%`,
        paddingTop: 15,
    } as CSSProperties,
    headerText: {
        color: 'white',
        fontWeight: 'lighter',
        marginTop: 5,
        marginLeft: 10,
    } as CSSProperties,
    headerBlockContainer: {
        width: headerWidth,
        backgroundColor: OUTER_COLOR,
        height: headerWidth * headerRatio,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    } as CSSProperties,
    skillInfoContainer: {
        transform: 'scale(0.85)',
        marginLeft: -10,
        display: 'flex',
        flexDirection: 'column',
        width: 300,
    } as CSSProperties,
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
    xpProgressBarContainer: {
        backgroundColor: INNER_COLOR,
        width: 200,
        height: 30,
        borderRadius: 8,
        overflow: 'hidden',
        marginTop: -10,
        marginLeft: 10,
        position: 'relative',
    } as CSSProperties,
    minionCraftRecipie: {
        fontSize: 12,
        color: 'white',
        marginRight: 20,
        position: 'absolute',
        textAlign: 'right',
        top: 0,
        left: -200,
        width: 300,
    } as CSSProperties,
    xpText: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: -12,
        color: 'white',
        fontSize: 18,
        fontWeight: 500,
        textAlign: 'center',
    } as CSSProperties,
    minionCraftContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginRight: 0,
        transform: 'scale(0.8)',
        marginTop: 0,
        width: 190,
        height: `100%`,
        position: 'relative',
    } as CSSProperties,
    skillButtonRow: {
        display: 'flex',
        flexDirection: 'row',
        width: headerWidth,
        height: 30,
        paddingLeft: 15,
        paddingTop: 15,
        justifyContent: 'space-between',
    } as CSSProperties,
    craftMinionButton: {
        position: 'absolute',
        bottom: 5,
        height: 20,
    } as CSSProperties,
    minionIcon: {
        position: 'absolute',
        right: 15,
        top: 0,
        height: 80,
        width: 60,
        objectFit: 'contain',
        marginLeft: 10,
        marginTop: -4,
    } as CSSProperties,
}
