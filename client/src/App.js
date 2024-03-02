import { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [foodList, setFoodList] = useState([]);
  const [newFoodName, setNewFoodName] = useState("");

  useEffect(() => {
    Axios.get('http://localhost:5000/read').then((response) => setFoodList(response.data));
  }, [])

  const handleClick = () => {
    Axios.post('http://localhost:5000/insert', {
      foodName: foodName,
      quantity: quantity
    })    
  }

  const handleUpdate = (id) => {
    Axios.put('http://localhost:5000/update', {
    newFoodName: newFoodName,
    id: id
  })    
  }

  const handleDelete = (id) => {
    Axios.delete(`http://localhost:5000/delete/${id}`)    
  }

  return (
    <div className="App">
        <h1>CRUD Application</h1>
        <input type="text" placeholder="Food name" onChange={(event) => setFoodName(event.target.value)}/>
        <input type="Number" placeholder="Quantity" onChange={(event) => setQuantity(event.target.value)}/>
        <button onClick={handleClick}>Submit</button>
        {foodList.map((value) => {
          return (
            <div className='box'>
              <h1>{value.foodName}</h1>
              <h3>{value.quantity}</h3>
              <input type="text" placeholder='New Food name...' onChange={(event) => setNewFoodName(event.target.value)}/>
              <button onClick={() => handleUpdate(value._id)}>Update</button>
              <br />
              <button onClick={() => handleDelete(value._id)}>Delete</button>
            </div>
          )
        })}
    </div>
  );
}

export default App;
