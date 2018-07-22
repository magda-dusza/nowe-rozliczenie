import React from "react";
import "./Popup.css";

export class Popup extends React.Component {
    
    state = {
         selectedCategory : "",
         tagsList : [] ,
         simpleCategories : [],
         newTag: "" ,
         isTagEdit: false
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

    handleNewTagChange(event){
       this.setState({newTag : event.target.value});
    }

    addNewTag(){
        const category = this.props.categories.find(elem => elem.label === this.state.selectedCategory);
        const isValid = this.isTagValid(category);
        if(!isValid){
            console.log("element juz istnieje lub pusty");
            return;
        }
        category.keyWords = [this.state.newTag, ...this.state.tagsList];
        fetch('http://localhost:3000/categories/'+category._id, {
            method: 'put',    
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
          },
          body: JSON.stringify(category)});
        this.setState({tagsList : [this.state.newTag, ...this.state.tagsList]});
        this.setState({newTag : ""});
    }

    isTagValid(category) {
        const isEmpty = this.state.newTag.trim() === "";
        const isDuplicate = typeof category.keyWords.find(elem => elem === this.state.newTag) !== 'undefined';
        return !isEmpty && !isDuplicate;
    }

    getTag(tag, index) {
        return this.state.isTagEdit === index ?
        <span>
            <input value={tag} onChange={this.handleEdit.bind(this, index)}/>
            <button onClick={this.updateTag.bind(this)}>OK</button>
        </span>
        :<span onClick={()=>{this.setState({isTagEdit : index})}}>{tag}</span>;
    }

    handleEdit(index, event) {
        this.setState({tagsList: [...this.state.tagsList.slice(0, index),event.target.value,...this.state.tagsList.slice(index+1)]});
    }

    updateTag() {
        this.setState({isTagEdit : false}); 

        let foundCategory=this.props.categories.find(category=>category.label===this.state.selectedCategory);
        foundCategory.keyWords = this.state.tagsList;
        fetch('http://localhost:3000/categories/'+foundCategory._id, {
            method: 'put',    
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
          },
          body: JSON.stringify(foundCategory)}
        );
    }

    deleteTag(tagIndex){
        let foundCategory=this.props.categories.find(category=>category.label===this.state.selectedCategory);
        foundCategory.keyWords.splice(tagIndex,1);
        fetch('http://localhost:3000/categories/'+foundCategory._id, {
            method: 'put',    
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
          },
          body: JSON.stringify(foundCategory)}
        );
        this.setState({tagsList:foundCategory.keyWords})
    }
    
    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <h1 className="popup_inner--title">
                        Edycja kategorii
                        <button className="popup_inner--close"onClick={this.props.closePopup}>Zamknij</button></h1>
                    <hr/>
                    <div className="popup_inner--selector">
                        <div className="label">Zmień kategorię: </div>
                        {this.popupCategorySelect(this.props.model.category)}
                    </div>

                    <div className="label">Lista słów:</div>
                    <div className="popup_inner--new-tag">
                        <input value={this.state.newTag} onChange={this.handleNewTagChange.bind(this)}/>
                        <button onClick={this.addNewTag.bind(this)}>+ Dodaj</button>
                        <div>Wielkość liter nie ma znaczenia</div>
                    </div>
                    <ul className="popup_inner--list">    
                        {this.state.tagsList.map((tag, index)=>(
                            <li key={index}>
                                {this.getTag(tag, index)}
                                <button onClick={this.deleteTag.bind(this, index)}>Usuń</button> 
                            </li>
                        )) }
                    </ul>
                    
                </div>
            </div>
      );
    }
  }