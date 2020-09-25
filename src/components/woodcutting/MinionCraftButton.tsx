import { inject } from 'mobx-react'
import { CSSProperties } from 'react'
import { INNER_COLOR } from '../../constants'
import { ApplicationStore } from '../../data/applicationStore'
import React from 'react'

@inject('applicationStore')
export class CraftMinionButton extends React.Component<{ applicationStore?: ApplicationStore }, { hover: boolean }> {
    public state = {
        hover: false,
    }

    public render() {
        return (
            <div
                onClick={this.props.applicationStore!.woodcuttingStore.craftMinion}
                style={{
                    ...styles.craftMinionButton,
                    backgroundColor: this.state.hover ? '#999' : INNER_COLOR,
                    transform: this.state.hover ? 'scale(1.1)' : 'scale(1)',
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

const styles = {
    craftMinionButton: {
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
        transition: 'transform 0.2s, background-color 0.5s ease',
        cursor: 'pointer',
        marginTop: -7,
    } as CSSProperties,
}
