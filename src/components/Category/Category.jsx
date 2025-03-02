import React from 'react'
import "./Category.scss"

function Category(props) {
  return (
    <>
        <button className='category-btn'>
            {props.text}
        </button>
    </>
  )
}

export default Category