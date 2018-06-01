import React from 'react';
import {ActionBar} from './list/ActionBar';
import {TransactionTable} from './list/TransactionTable';
import {processMillenium, processIng} from './helpers/processors';


export class TransactionList extends React.Component {
    state = {
        transactions: [],
        categories: {},
        categoriesConfig: []
    }
    componentDidMount(){
       this.fetchData();
       this.fetchCategoriesConfig();
    }
    fetchData() {
        fetch("http://localhost:3000/actions")
        .then((result)=>result.json())
        .then(resultJSON=>{
            this.setState({transactions : resultJSON});
            this.changeList();
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    fetchCategoriesConfig(){
        fetch("http://localhost:3000/categories")
        .then((result)=>result.json())
        .then(resultJSON=>{
            this.setState({categoriesConfig : resultJSON});
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    changeList() {
        let categoriesCopy = {...this.state.categories};
        this.state.transactions.forEach((action)=>{
            if(categoriesCopy[action.category]){
                categoriesCopy[action.category] = categoriesCopy[action.category].concat([action]);
            } else {
                const newCategory = Object.assign({}, {[action.category] : [action]});
                categoriesCopy = Object.assign(categoriesCopy, newCategory);
            }
        });
        this.setState({categories: categoriesCopy});
    }
    update = (data)=>{
        data.forEach((elem)=>{
            const unique = {date: elem.date, description: elem.description, amount: elem.amount}
            fetch("http://localhost:3000/actions", 
            {
                method: 'post',    
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
              },
              body: JSON.stringify(unique)})
            .then((result)=>result.json())
            .then((resultJSON)=>{
                if(resultJSON.length===0){
                    fetch("http://localhost:3000/actions/new", 
                    {
                        method: 'post',    
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(elem)})
                }
            });
        });
        this.fetchData();
    }
    fileLoaded = (name, file)=>{
        const processor = name.indexOf('Historia')>-1 ? processMillenium : processIng;
        const processedData = processor(file, this.state.categoriesConfig);
        this.update(processedData);
    }
    render(){
        return (
            <div>
                <ActionBar fileLoaded={this.fileLoaded}/>
                <TransactionTable transactions={this.state.transactions} categories={this.state.categories}/>
            </div>
        );
    }
}