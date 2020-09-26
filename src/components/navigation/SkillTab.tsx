import React, { CSSProperties } from 'react'
import { INNER_COLOR, OUTER_COLOR } from '../../constants'

export const SkillTab = (props: { isSelected: boolean; text: string; onClick: () => void }) => {
    return (
        <div
            onClick={props.onClick}
            style={{
                ...styles.tab,
                ...(props.isSelected ? styles.selectedTab : {}),
                cursor: 'pointer',
            }}
        >
            <p
                style={{
                    color: '#FFFFFF',
                    opacity: props.isSelected ? 1 : 0.4,
                    marginTop: 3,
                    width: `100%`,
                    textAlign: 'center',
                }}
            >
                {props.text}
            </p>
        </div>
    )
}

const styles = {
    tab: {
        border: '2px solid ' + INNER_COLOR,
        borderBottom: '4px solid ' + OUTER_COLOR,
        flex: 1,
        display: 'flex',
        height: 25,
        marginTop: 5,
    } as CSSProperties,
    selectedTab: {
        backgroundColor: INNER_COLOR,
        borderBottomColor: INNER_COLOR,
    } as CSSProperties,
}
