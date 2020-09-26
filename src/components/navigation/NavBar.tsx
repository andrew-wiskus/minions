import React from 'react'
import { PageRoute, GATHER_SKILLS } from '../../config/skillConfig'
import { OUTER_COLOR, INNER_COLOR } from '../../constants'
import { SkillDisplayButton } from './SkillDisplayButton'
import { SkillTab } from './SkillTab'
import MenuIcon from '../../images/menuIcon.png'
import BankIcon from '../../images/BankIcon.png'
import TrophyIcon from '../../images/TrophyIcon.png'

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
                    {GATHER_SKILLS.map((skill, index) => {
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
