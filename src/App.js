import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Input from './components/Input';
import List from './components/List';


function App() {
  const [toDo, setToDo] = useState([])
  const [icon, setIcon] = useState(false)
  const [emptyList, setEmptyList] = useState(true)

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setToDo([...toDo, event.target.value]);
      event.target.value = "";
      if (!toDo) {
        setEmptyList(true)
      }
      else {
        setEmptyList(false)
      }
      setIcon(false)
    }
  }

  const handleMouseOver = () => {
    setIcon(true)
  }

  const handleMouseOut = () => {
    setIcon(false)
  }

  const deleted = (id) => {
    let updatedTodos = toDo.filter(todo => todo !== toDo[id.index]);
    setToDo(updatedTodos);
    if (updatedTodos.length === 0) {
      setEmptyList(true)
    }
    else {
      setEmptyList(false)
    }
  }

  return (
    <div className='container m-5 d-flex flex-column w-50 mx-auto p-5'>
      <h1 className='mx-auto mb-4 fw-bolder'>TO DO LIST</h1>
      <Input placeholder='What needs to be done?' className='mx-auto' onKeyPress={handleKeyPress} ></Input>
      {emptyList ? <p className='mx-auto mt-3'>Write something and press enter...</p> : null}
      <div className="mt-3">
        <List toDo={toDo} deleted={deleted} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className={!icon ? "hidden" : ""} />
      </div>
      <div className='mt-2 mx-auto'>{toDo.length} {toDo.length === 1 ? "to-do" : "to-dos"} left</div>
    </div>
  );
}

export default App;
