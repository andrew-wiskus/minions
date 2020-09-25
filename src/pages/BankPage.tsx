import React, { CSSProperties } from 'react'
import BankBG from '../images/bank_bg.png'
import { inject, observer } from 'mobx-react'
import { ApplicationStore } from '../data/applicationStore'
import { InventoryItem } from '../data/bankStore'

interface State {
    bankItems: BankItem[]
}

interface BankItem {
    name: string
    icon: string
    count: number
}

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

@observer
export class BankSlot extends React.Component<{ item: InventoryItem }> {
    public render() {
        return (
            <div
                style={{
                    height: 65,
                    width: 65,
                    backgroundImage: `url(${BankBG})`,
                    border: '3px solid #333',
                    borderRadius: 6,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                    marginBottom: 20,
                    position: 'relative',
                }}
            >
                <img alt="todo" style={{ height: 45, width: 45 }} src={this.props.item.icon} />
                <div
                    style={{
                        position: 'absolute',
                        bottom: -10,
                        paddingTop: 1,
                        backgroundColor: '#CCC',
                        color: '#333',
                        fontWeight: 900,
                        minWidth: 50,
                        textAlign: 'center',
                        borderRadius: 10,
                        paddingLeft: 5,
                        paddingRight: 5,
                        letterSpacing: 0.1,
                        fontSize: 12,
                    }}
                >
                    {numberWithCommas(this.props.item.count)}
                </div>
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

function numberWithCommas(x) {
    if (x > 999999) {
        return Math.floor((x / 1000000) * 10) / 10 + 'm'
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
