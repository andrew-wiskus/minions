import React, { CSSProperties } from 'react'
import { inject, observer } from 'mobx-react'
import { ApplicationStore } from '../data/applicationStore'
import { BankSlot } from '../components/bank/BankSlot'

interface Props {
    applicationStore?: ApplicationStore
}
@inject('applicationStore')
@observer
export class BankPage extends React.Component<Props> {
    private bankStore = this.props.applicationStore!.bankStore

    public render(): JSX.Element {
        let bankItems = this.bankStore.items

        return (
            <div style={styles.pageBackground}>
                {Object.keys(bankItems).map((key, index) => {
                    if (bankItems[key].count === 0) {
                        return null
                    }

                    return <BankSlot key={index} item={bankItems[key]} />
                })}
            </div>
        )
    }
}

const styles = {
    pageBackground: {
        padding: 10,
        width: 'calc(100% - 10px)',
        display: 'flex',
        flexWrap: 'wrap',
    } as CSSProperties,
}
