import React, { CSSProperties } from 'react'
import woodCutBG from '../images/woodcut_bg.png'
import BankBG from '../images/bank_bg.png'
import oakLogIcon from '../images/logs_oak.png'
import teakLogIcon from '../images/logs_teak.png'
import magicLogIcon from '../images/logs_magic.png'
import mahoganyLogIcon from '../images/logs_mahogany.png'
import mapleLogIcon from '../images/logs_maple.png'
import bushLogIcon from '../images/bush.png'
import willowLogIcon from '../images/logs_willow.png'
import yewLogIcon from '../images/logs_yew.png'

interface State {
    bankItems: BankItem[]
}

interface BankItem {
    name: string
    icon: string
    count: number
}
export class BankPage extends React.Component {
    public state: State = {
        bankItems: [
            {
                name: 'oak log',
                icon: oakLogIcon,
                count: 47,
            },
            {
                name: 'willow log',
                icon: willowLogIcon,
                count: 2,
            },
            {
                name: 'teak log',
                icon: teakLogIcon,
                count: 24,
            },
            {
                name: 'magic log',
                icon: magicLogIcon,
                count: 392,
            },
            {
                name: 'mahogany log',
                icon: mahoganyLogIcon,
                count: 39218,
            },
            {
                name: 'maple log',
                icon: mapleLogIcon,
                count: 4819497,
            },
            {
                name: 'yew log',
                icon: yewLogIcon,
                count: 4391,
            },
        ],
    }

    public render(): JSX.Element {
        return (
            <div style={styles.pageBackground}>
                {this.state.bankItems.map((item) => {
                    return <BankSlot item={item} />
                })}
            </div>
        )
    }
}

export class BankSlot extends React.Component<{ item: BankItem }> {
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
                    marginBottom: 10,
                    position: 'relative',
                }}
            >
                <img style={{ height: 45, width: 45 }} src={this.props.item.icon} />
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
        padding: 25,
        height: '100%',
        width: '100%',
        // backgroundImage: `url(${woodCutBG})`,
        display: 'flex',
        flexWrap: 'wrap',
        // paddingTop: 500,
    } as CSSProperties,
}

function numberWithCommas(x) {
    if (x > 999999) {
        return Math.floor((x / 1000000) * 10) / 10 + 'm'
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
