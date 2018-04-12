import React from 'react';

export class Row extends React.Component {
    render(){
        return (
            <div className="list-headers table-row">
                <div className="list-bank">{this.props.transaction.bank}</div>
                <div className="list-date">{new Date(this.props.transaction.date).toLocaleDateString()}</div>
                <div className="list-amount">{this.props.transaction.amount}</div>
                <div className="list-description">{this.props.transaction.description}</div>
                <div className="list-category">{this.props.transaction.category}</div>
                <div className="list-actions"><button onClick={this.props.toggleRaw}>Szczegóły</button></div>
            </div>
        );
    }
}