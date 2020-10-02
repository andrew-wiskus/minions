import { observer } from 'mobx-react';
import React, { CSSProperties } from 'react';
import BankBG from '../../images/bank_bg.png';
import { BankItem } from '../../models/Item';

@observer
export class BankSlot extends React.Component<{ item: BankItem }> {
    public render() {
        return (
            <div style={styles.bankSlotContainer}>
                <img alt='todo' style={styles.bankSlotIcon} src={this.props.item.icon} />
                <div style={styles.bankSlotValueText}>{numberWithCommas(this.props.item.count)}</div>
            </div>
        );
    }
}

const styles = {
    pageBackground: {
        padding: 10,
        width: 'calc(100% - 10px)',
        display: 'flex',
        flexWrap: 'wrap',
    } as CSSProperties,
    bankSlotContainer: {
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
    } as CSSProperties,
    bankSlotIcon: {
        height: 45,
        width: 45,
        objectFit: 'contain',
    } as CSSProperties,
    bankSlotValueText: {
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
    } as CSSProperties,
};

function numberWithCommas(x) {
    if (x > 999999) {
        return Math.floor((x / 1000000) * 10) / 10 + 'm';
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
