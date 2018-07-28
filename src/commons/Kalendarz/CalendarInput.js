import React, { Component } from 'react';
import {Calendar} from './Calendar';

class CalendarInput extends Component{
    constructor(){
        super();
        this.state ={
            isCalendarOpen : false,
            chosenDate : "" 
        };

        this.showCalendar=this.showCalendar.bind(this);
        this.saveChosenDate=this.saveChosenDate.bind(this);
        this.cancel=this.cancel.bind(this);
        this.setChosenDate=this.setChosenDate.bind(this);
        
    }

    componentWillMount() {
        this.setState({chosenDate: this.props.date});
    }

    handleChange(event) {
        this.setState({chosenDate: event.target.value})
    }

    setChosenDate(value){
        console.log('setChosenDate', value);
        this.setState({chosenDate: value}, this.props.getChosenDate(value))
        
    }

    showCalendar(){
        this.setState({isCalendarOpen : true})
    }

    saveChosenDate(){
        this.setState({isCalendarOpen : false})
    }

    cancel(){
        this.setState({isCalendarOpen : false})
    }

    render(){
        
        return(
           
           <div className="calendar-input">
                <div><input onClick={this.showCalendar} value={this.state.chosenDate} onChange={this.handleChange}/></div>
                {
                    this.state.isCalendarOpen && 
                    <div>
                        <Calendar 
                            save={this.saveChosenDate} 
                            cancel={this.cancel} 
                            setChosenDate={this.setChosenDate}
                        />
                        
                    </div>
                }                  
            </div>

        );
    }





    
}

export default CalendarInput;