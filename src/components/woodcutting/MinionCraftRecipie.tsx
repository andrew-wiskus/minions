import { inject, observer } from 'mobx-react'
import { ApplicationStore } from '../../data/applicationStore'
import { truncLargeNumber } from '../../models/levelXpData'
import React from 'react'

@inject('applicationStore')
@observer
export class MinionCraftRecipie extends React.Component<{ applicationStore?: ApplicationStore }> {
    public render() {
        const store = this.props.applicationStore!
        const recipie = store.woodcuttingStore.nextMinionCraft

        return (
            <>
                {Object.keys(recipie).map((key, index) => {
                    let req = recipie[key]
                    let bankItem = store.bankStore.getItem(key)
                    let amount = bankItem.count
                    let color = amount >= req ? '#FFD05B' : 'red'

                    return (
                        <div key={index}>
                            <span style={{ color: color }}>{`
                            ${truncLargeNumber(amount, 1)}
                            /
                            ${truncLargeNumber(req, 1)}
                            ${key.toLowerCase().replace('_', '').replace('log', '')}
                            
                            `}</span>
                            {index !== Object.keys(recipie).length - 1 && <br />}
                        </div>
                    )
                })}
            </>
        )
    }
}
