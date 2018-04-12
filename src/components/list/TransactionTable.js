import React from 'react';
import {Category} from './Category';

export class TransactionTable extends React.Component {
    state = {
        categories: {}
    }
    render(){
        const categoriesIds = Object.keys(this.props.categories);
        return (
            <div>
                {categoriesIds.map((key, index)=>(
                    <Category index={key} data={this.props.categories[key]} key={`cat_${key}`}/>
                ))}
            </div>
        );
    }
}