
import React from 'react';
import './Calendar.css';

export class Calendar extends React.Component{
    constructor(){
        super();
        this.locale = "pl";
        //TODAY
        this.today = new Date();
        
       
       this.state = { 
        //CHOSEN DATE
            chosenDate: this.today, 
        //ACTUAL MONTH
            actualNumMonth: this.today.getMonth(),
            actualStrMonth: this.today.toLocaleString("pl",{month:"long"}),
            actualYear: this.today.getFullYear(),
            firstDayRaw:new Date(this.today.getFullYear(),this.today.getMonth(),1).getDay(),
            firstDay:0,
            lastDay: new Date(this.today.getFullYear(),this.today.getMonth()+1,0).getDate()
        };
        //FirstDay first value
        this.state.firstDay = this.state.firstDayRaw===0? 7:this.state.firstDayRaw;
        //DATE FORMAT
        this.dateOptions = {year: 'numeric', month: 'numeric', day: 'numeric' };
        
        this.nextMonth=this.nextMonth.bind(this);
        this.prevMonth=this.prevMonth.bind(this);
        this.save=this.save.bind(this);
        
    }
  
    //Creating calendar and coloring
    createCell(day,week){
        let preparedDay = this.prepareDay(day,week);
        return (
            <td key={week*100+day}
                onClick={()=>{this.setActualDate(preparedDay)}} 
                style={this.colorDate(preparedDay)}
                className="calendar-cell">
                {preparedDay>0 && this.prepareDay(day,week)<=this.state.lastDay && preparedDay} 
            </td>
        )
    }

    prepareDay(day,week){
        return day+week*7-this.state.firstDay+1;
    }

    setActualDate(day){
        this.setState({chosenDate: new Date(this.state.actualYear,this.state.actualNumMonth,day)});
    }

    colorDate(day){ 
        if(this.today.getFullYear()===this.state.actualYear && this.today.getMonth()===this.state.actualNumMonth && this.today.getDate() === day){
               return {backgroundColor: "rgb(143, 159, 167)"}
        };
        let actualDate = new Date (this.state.actualYear,this.state.actualNumMonth,day);
        if(this.today.getTime()<= actualDate.getTime()){
            return {backgroundColor: "rgb(209, 209, 209)"}
        };
        if(new Date(this.state.actualYear,this.state.actualNumMonth,day).getTime()===this.state.chosenDate.getTime()){
            return {backgroundColor: "rgb(90, 189, 235)"}
        }
    }

    //Chenging month
    nextMonth(){
        let newMonth = this.state.actualNumMonth + 1;
        if (newMonth>11){
            newMonth = 0;
            this.setState({actualYear: this.state.actualYear+1});
        }
        this.setState({actualNumMonth: newMonth}, this.update);
    }

    prevMonth(){
        let newMonth = this.state.actualNumMonth - 1;
        if (newMonth<0){
            newMonth = 12;
            this.setState({actualYear: this.state.actualYear-1});
        }
        this.setState({actualNumMonth: newMonth}, this.update);
    }

    update(){    
        let newDate = new Date(this.state.actualYear,this.state.actualNumMonth,1);
        this.setState({actualStrMonth: newDate.toLocaleString(this.locale,{month:"long"}) });
        this.setState({ firstDayRaw: newDate.getDay() }, this.prepareFristDay);
        this.setState({ lastDay: new Date(this.state.actualYear,this.state.actualNumMonth+1,0).getDate() 
             }, this.display);
            }
    prepareFristDay(){
        this.setState({firstDay: this.state.firstDayRaw===0? 7:this.state.firstDayRaw});
    }
    //Save ChosenDate to Parrent
    save(){
        this.props.setChosenDate(this.state.chosenDate.toLocaleDateString(this.locale, this.dateOptions));
        this.props.save();
    }

    render(){
        let weeks = [0,1,2,3,4,5];
        let days = [1,2,3,4,5,6,7];
        
        
        return(

            <table className="calendar-table">
                <tbody>
                    <tr>
                        <td colSpan="7">{this.state.chosenDate.toLocaleDateString(this.locale, this.dateOptions)}</td>
                    </tr>

                    <tr className="calendar-header"> 
                        <td onClick={this.prevMonth} >&lt;</td>
                        <td colSpan="3"> {this.state.actualStrMonth} </td>
                        <td colSpan="2"> {this.state.actualYear} </td>
                        <td onClick={this.nextMonth}>&gt;</td>
                    </tr>
                    <tr className="calendar-dayweek"> 
                        <td> Pon </td>
                        <td> Wt </td>
                        <td> Sr </td>
                        <td> Czw </td>
                        <td> Pt </td>
                        <td> Sb </td>
                        <td> Nd </td>
                    </tr>
                    {
                        weeks.map(week=>
                            <tr key={week}> 
                                {
                                    days.map((day)=> 
                                        this.createCell(day, week))
                                }        
                            </tr>)
                    }
                    <tr>
                        <td colSpan="2"> <button onClick={this.props.cancel}>Cancel</button> </td>
                        <td colSpan="3"> </td>
                        <td colSpan="2"> <button onClick={this.save}>Save</button></td>
                    </tr>
                </tbody>
            </table>
        );
    }

}