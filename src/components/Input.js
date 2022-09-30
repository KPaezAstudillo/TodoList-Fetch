import React from 'react'

export default function Input({ placeholder, className, onKeyPress }) {
  return (
    <form className={className} onKeyPress={onKeyPress}>
      <input type="text" placeholder={placeholder} ></input>
    </form>
  )
}
