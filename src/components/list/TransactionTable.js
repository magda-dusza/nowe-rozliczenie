import React from 'react';
import {Category} from './Category';

import './styles/TransactionTable.css';

export class TransactionTable extends React.Component {
    state = {
        categories: {}
    }
    render(){
        const categoriesIds = Object.keys(this.props.categories);
        return (
            <div className="list-content">
                {categoriesIds.map((key, index)=>(
                    <Category 
                        index={key} 
                        data={this.props.categories[key]} 
                        key={`cat_${key}`} 
                        categories={this.props.catConfig}/>
                ))}
            </div>
        );
    }
}