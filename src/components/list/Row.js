import React, { Fragment } from 'react';
import {Popup} from "../../commons/Popup/Popup"
import Calendar from 'react-input-calendar'


export class Row extends React.Component {
    state = {
        isEdit : "",
        model: this.props.transaction,
        simpleCategories: [],
        popupSimpleCategories: [],
        showPopup : false,
        pickedCategory : [2,3]
    }

    componentDidMount() {
        this.setState({simpleCategories: this.props.categories.map(elem=>elem.label)})
    }

    updateDate(event) {
        console.log('update');
    }

    toggleCell(field) {
        if (field ===""){
            this.saveRecord();
        }
        this.setState({isEdit : field});
    
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
    handleChangeDate = (event) => {
        // const isDate = this.toDate(event.target.value);
        // const inputValue = isDate.toString() === 'Invalid Date' ?  event.target.value: isDate;
        this.setState({model : {...this.state.model , userDate: event.target.value}});
    }
    getDateCell() {
        return this.state.isEdit === "date"? 
            <Fragment> 
                <Calendar onChange={this.handleChangeDate.bind(this)}
                          format='DD-MM-YYYY' 
                          date={this.toDate(this.state.model.userDate)} />
                {/* <input onChange={this.handleChangeDate.bind(this)}  */}
                       {/* value={this.toDate(this.state.model.userDate)}/> */}
                <button  onClick={this.toggleCell.bind(this , "")}>OK</button> 
            </Fragment>
           : <div className="list-date" onClick={this.toggleCell.bind(this , "date")}> 
                {this.toDate(this.state.model.userDate)}
             </div>; 
    }

    toDate(date) {
        return new Date(date).toLocaleDateString();
    }

    onClickChangeCell(value, field){
       return this.state.isEdit === "category"?
        <div>
            <select value={value} onChange={this.handleChange}>
                {this.state.simpleCategories.map(category=><option value={category}>{category}</option>)}
            </select> 
            <button  onClick={this.toggleCell.bind(this , "")}>OK</button> 
        </div>
        : <div onClick={this.toggleCell.bind(this , field)}> {value} </div>
    }

    toggleCategoryDialog = () => {
        this.setState({showPopup:!this.state.showPopup});
    }

    getBankColor(bank){
        const banksMap = {
            "Millenium": "#c82059",
            "ING": "#ff6200"
        }
        return {color: banksMap[bank], fontWeight: "bold"};
    }

    render(){
        return (
             <div className="list-headers table-row">
                <div className="list-lp">1</div>
                <div className="list-bank" style={this.getBankColor(this.state.model.bank)}>
                    {this.state.model.bank}
                </div>
                {this.getDateCell()}
                <div className="list-amount">{this.state.model.amount}</div>
                <div className="list-description">{this.state.model.description}</div>
                <div className="list-category">
                    {this.onClickChangeCell(this.state.model.userCategory, "category")}
                </div>
                <div className="list-actions">
                    <button onClick={this.props.toggleRaw}>Szczegóły</button>
                    <button onClick={this.toggleCategoryDialog}>Kategorie</button>
                </div>
                {this.state.showPopup ?
                <Popup categories={this.props.categories}
                       model = {this.state.model}
                       closePopup = {this.toggleCategoryDialog}/>
                : null
                } 
            </div>
        );
    }
}