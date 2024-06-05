import './App.css';
import { useState } from 'react';
import ShoppingForm from './components/ShoppingForm';
import ShopItem from './components/ShopItem';

function App() {

  //creates an array of items
  const [items, setItems] = useState([])

  //function to add an item using user input
  //id is used to be able to delete items
  const addItem = (text) => {
    let id = 1

    //if statement used to give id 
    //to items add to array
    if(items.length > 0)
    {
      id = items[0].id + 1
    }

    //add items to to array
    //new one add on top
    let item = {id: id, text: text}
    let newItem = [item, ...items]
    setItems(newItem)
  }

  //function recive item id to delete item.
  //filter function create new array in order to delete item
  const removeItem = (id) => {
    let UpdatedItem = [...items].filter((item) => item.id !== id)
    setItems(UpdatedItem)
  }

  return (
    <div className='shopping-app'>
      <h1> Shopping List</h1>
      <ShoppingForm addItem={addItem} />
      {items.map((item) => {
        return(
          <ShopItem item = {item} key = {item.id}
            removeItem={removeItem}/>
        )
      })}
    </div>
  );
}

export default App;