import React from "react";
import "./Popup.css";



export class Popup extends React.Component {
    
    state = {
         selectedCategory : "",
         tagsList : [] ,
         simpleCategories : []      
    }

    
    componentDidMount() {
        this.setState({simpleCategories: this.props.categories.map(elem=>elem.label)});
        this.updateCategory(this.props.model.userCategory);
    }

    updateCategory(categoryName){
        if(categoryName === "Pozostałe"){
            this.state.tagsList = [];
            this.state.selectedCategory
        } else {
            const category = this.props.categories
                .find((elem)=> elem.label === categoryName);
            this.setState({tagsList :[...category.keyWords] });
            this.state.selectedCategory = categoryName;
        }
    }


    popupCategorySelect(value){
        return(
            <div>
                <select value={this.state.selectedCategory} onChange={this.handleChange.bind(this)} >
                    {this.state.simpleCategories.map(category=><option key={category} value={category}>{category}</option>)}
                </select> 
            </div>
        );
    }
    
    handleChange(event){
        this.updateCategory(event.target.value)
    }
    
    render() {
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <h1>{this.popupCategorySelect(this.props.model.category)}</h1>
            <ul>    
                {this.state.tagsList.map((tag, index)=><li key={index}> {tag} </li>)}
            </ul>
          <button onClick={this.props.closePopup}>close me</button>
          </div>
        </div>
      );
    }
  }