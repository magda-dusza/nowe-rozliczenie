import React, { Fragment } from 'react';

export class Row extends React.Component {
    state = {
        isEdit : false,
        model: this.props.transaction,
        simpleCategories: [],
    }

    componentDidMount() {
        this.setState({simpleCategories: this.props.categories.map(elem=>elem.label)})
    }

    updateDate(event) {
        console.log('update');
    }

    toggleCell() {
        if (this.state.isEdit){
            this.saveRecord();
        }
        this.setState({isEdit : !this.state.isEdit});
    
    }    
    saveRecord(){

        fetch('http://localhost:3000/actions/'+this.state.model._id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                
            body: JSON.stringify(this.state.model)
        });
    }
    handleChange = (event) => {
        this.setState({model : {...this.state.model , userCategory: event.target.value}});
    }
    getDateCell() {
        let dateFormatted = new Date(this.state.model.date).toLocaleDateString();
        return this.state.editDate ? 
            <Fragment> <input onChange={this.handleChange.bind(this)} value={dateFormatted}/><button  onClick={this.toggleCell.bind(this)}>OK</button> </Fragment>
           : <div className="list-date" onClick={this.toggleCell.bind(this)}> 
                {dateFormatted}
             </div>; 
    }

    onClickChangeCell(value){
       return this.state.isEdit ?
        <div>
            <select value={value} onChange={this.handleChange}>
                {this.state.simpleCategories.map(category=><option value={category}>{category}</option>)}
            </select> 
            <button  onClick={this.toggleCell.bind(this)}>OK</button> 
        </div>
        : <div onClick={this.toggleCell.bind(this)}> {value} </div>
    }

    render(){
        return (
            <div className="list-headers table-row">
                <div className="list-bank">{this.state.model.bank}</div>
                {this.getDateCell()}
                <div className="list-amount">{this.state.model.amount}</div>
                <div className="list-description">{this.state.model.description}</div>
                <div className="list-category">{this.onClickChangeCell(this.state.model.userCategory)}</div>
                <div className="list-actions"><button onClick={this.props.toggleRaw}>Szczegóły</button></div>
            </div>
        );
    }
}