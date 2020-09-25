import React from 'react'
import { INNER_COLOR } from '../../constants'

export class SkillInfoButton extends React.Component<{ text: string }, { hover: boolean }> {
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
