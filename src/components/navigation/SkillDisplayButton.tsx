import { inject, observer } from 'mobx-react'
import React from 'react'
import { GatheringSkill } from '../../config/skillConfig'
import { ApplicationStore } from '../../data/applicationStore'
import SkillBG from '../../images/skill_level_bg.png'

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
