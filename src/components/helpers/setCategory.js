export function setCategory(description, categories){
    let foundCategories = []
    categories.forEach(category=>{
        category.keyWords.forEach(keyWord=>{
            if (description.toLowerCase().includes(keyWord.toLowerCase())){
                let found = {};
                found.name=category.label;
                found.word=keyWord;
                foundCategories.push(found)
                
            }

        })
        
    })
    if (foundCategories.length===0){
        foundCategories.push({name:"Pozostałe", keyWord:""});
    }

    
    return foundCategories[0];
} 