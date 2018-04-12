import React from 'react';
import {Row} from './Row'
import {RawRow} from './RawRow'

export class Transaction extends React.Component {
    state = {
        isRawVisible : false
    }
    toggleRaw = ()=> {
        const newValue = !this.state.isRawVisible;
        this.setState({isRawVisible: newValue});
    }
    render(){
        console.log(this.props.transaction.raw);
        return (
            <div>
                <Row toggleRaw={this.toggleRaw} transaction={this.props.transaction}/>
                <RawRow raw={this.props.transaction.raw} isVisible={this.state.isRawVisible}/>
            </div>
        );
    }
}