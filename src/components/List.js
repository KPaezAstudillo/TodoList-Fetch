import React from 'react'
import { FaTrash } from 'react-icons/fa';


export default function List({ toDo, deleted, onMouseOver, onMouseOut, className }) {
  return (
    <>
      <ul className='list-group'>
        {
          toDo.map((todo, index) => {
            return (<li key={index} className="list-group-item" id={todo.id} onMouseOver={onMouseOver} onMouseOut={onMouseOut}> {todo} <FaTrash className={className} onClick={() => deleted()} /></li>)
          })}

      </ul>
    </>
  )
}
