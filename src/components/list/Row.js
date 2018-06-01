import React, { Fragment } from 'react';

export class Row extends React.Component {
    state = {
        editDate : false,
        model: this.props.transaction
    }

    updateDate(event) {
        console.log('update');
    }

    toggleCell(newDate) {
        if(this.state.editDate){
            this.props.transaction.date = newDate; 
            this.saveRecord();
        }
        this.setState({editDate : !this.state.editDate});
    }    
    saveRecord(){
        
    }
    handleChange(event) {
        this.setState({model : {date : event.target.value}});
    }
    getDateCell() {
        let dateFormatted = new Date(this.state.model.date).toLocaleDateString();
        return this.state.editDate ? 
            <Fragment> <input onChange={this.handleChange.bind(this)} value={dateFormatted}/><button  onClick={this.toggleCell.bind(this)}>OK</button> </Fragment>
           : <div className="list-date" onClick={this.toggleCell.bind(this)}> 
                {dateFormatted}
             </div>;
    }
    render(){
        return (
            <div className="list-headers table-row">
                <div className="list-bank">{this.state.model.bank}</div>
                {this.getDateCell()}
                <div className="list-amount">{this.state.model.amount}</div>
                <div className="list-description">{this.state.model.description}</div>
                <div className="list-category">{this.state.model.category}</div>
                <div className="list-actions"><button onClick={this.props.toggleRaw}>Szczegóły</button></div>
            </div>
        );
    }
}