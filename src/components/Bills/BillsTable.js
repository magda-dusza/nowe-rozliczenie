import React from 'react';
import './billsTable.css';

export class BillsTable extends React.Component{

    monthsRender(){
        let months = ["Styczeń", "luty", "marzec","kwiecień","maj","czerwiec","lipiec","sierpień","wrzesień","październik","listopad","grudzień"];
        return months.map((month) => <tr className="bills-header"><td>{month}</td></tr>)
    }

    categoriesRender(){
        let categories = ["","Komorne","Prąd","Gaz","Orange"];
        return categories.map((category)=> <td className="bills-header">{category}</td>)
    }
    render(){

        return(
            <table className="bills-table">
                <thead>
                    <tr>
                        <th>2018</th>
                    </tr>        
                </thead>
                <tbody>
                    <tr>{this.categoriesRender()}</tr>
                    {this.monthsRender()}            
                </tbody>
            </table>
        )
    }
    }