import React from 'react'
import { INNER_COLOR, OUTER_COLOR, LEVEL_GREEN } from '../constants'
import { MinionCounter } from './woodcutting/ResourcePanel'

export class FarmingPlotPanel extends React.Component {
    public render() {
        return (
            <div
                style={{
                    width: `90%`,
                    height: 80,
                    backgroundColor: INNER_COLOR,
                    marginLeft: `5%`,
                    borderRadius: 8,
                    position: 'relative',
                }}
            >
                <p style={{ paddingTop: 10, paddingLeft: 20, color: 'white' }}>
                    plot 1: EMPTY
                    <br />
                    minion speed: 10%
                </p>
                <div
                    style={{
                        position: 'absolute',
                        bottom: 10,
                        left: 20,
                        width: 280,
                        height: 20,
                        backgroundColor: OUTER_COLOR,
                        borderRadius: 4,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: LEVEL_GREEN,
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: '33%',
                            position: 'absolute',
                        }}
                    ></div>
                    <p style={{ width: `100%`, marginTop: 2, color: 'white', textAlign: 'center' }}>24s</p>
                </div>
                <div
                    style={{
                        position: 'absolute',
                        top: 5,
                        right: 0,
                        display: 'flex',
                        flexDirection: 'row',
                        height: 70,
                        width: 100,
                        zIndex: 99,
                    }}
                >
                    <MinionCounter onChangeMinion={() => {}} resource={{} as any} />
                </div>
            </div>
        )
    }
}
