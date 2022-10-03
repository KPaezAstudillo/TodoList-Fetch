import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Input from './components/Input';
import List from './components/List';


function App() {
  const [toDo, setToDo] = useState([])
  const [icon, setIcon] = useState(false)

  //Post Method 
  const createTodo = async () => {
    try {
      return await fetch(
        "https://assets.breatheco.de/apis/fake/todos/user/karinapaez",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify([]),
          redirect: "follow"
        }
      ).then(response => response.json());

    } catch (error) {
      console.log(error);
      return { result: "Error al actualizar" };
    }
  };

  //Get method 
  const getTodo = async () => {
    try {
      return await fetch(
        "https://assets.breatheco.de/apis/fake/todos/user/karinapaez",
        {
          method: "GET",
          redirect: "follow"
        }
      ).then(response => response.json());
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  //put method 
  const putTodo = async (data = []) => {
    try {
      return await fetch(
        "https://assets.breatheco.de/apis/fake/todos/user/karinapaez",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          redirect: "follow"
        }
      ).then(response => response.json());
    } catch (error) {
      console.log(error);
      return { result: "Error al actualizar" };
    }
  };

  //delete method
  const deleteTodo = async () => {
    try {
      return await fetch(
        "https://assets.breatheco.de/apis/fake/todos/user/karinapaez",
        {
          method: "DELETE",
          redirect: "follow"
        }
      ).then(response => response.json());
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (toDo.length === 0) { //si no hay nada en .json, crea la api, luego inserta el event.target.value y lo muestra en pantalla
        createTodo().then(() => {
          let dato = [];
          [...toDo, event.target.value].forEach(value => {
            dato.push({
              label: value,
              done: false
            });
          });

          putTodo(dato).then(() => {
            getTodo().then(data => {
              setToDo(
                data.map(
                  dato => dato.label
                )
              );
            });
          });
          event.target.value = "";
        });
      }

      else { //si ya hay registros (no crea, solo ingresa y obtiene listado de tareas)
        let dato = [];
        [...toDo, event.target.value].forEach(value => {
          dato.push({
            label: value,
            done: false
          });
        });

        putTodo(dato).then(() => {
          getTodo().then(data => {
            setToDo(
              data.map(
                dato => dato.label
              )
            );
          });
        });
        event.target.value = "";
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

  const deleted = () => {
    deleteTodo().then(() => { //borra todos los registros
      setToDo([]);
    });

  }


  return (
    <div className='container m-5 d-flex flex-column w-50 mx-auto p-5'>
      <h1 className='mx-auto mb-4 fw-bolder'>TO DO LIST</h1>
      <Input placeholder='What needs to be done?' className='mx-auto' onKeyPress={handleKeyPress} ></Input>
      {toDo.length === 0 ? <p className='mx-auto mt-3'>Write something and press enter...</p> : null}
      <div className="mt-3">
        <List toDo={toDo} deleted={deleted} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className={!icon ? "hidden" : ""} />
      </div>
      <div className='mt-2 mx-auto'>{toDo.length} {toDo.length === 1 ? "to-do" : "to-dos"} left</div>
    </div>
  );
}

export default App;
