import React, { useState } from 'react'

export default function ShoppingForm(props) {

    //setInput is a function used to change input
    const [input, setInput] = useState("")

    //handleSubmit is a function used to submit the input from the user
    //*preventDefault is used to prevent constant refresh when form is updated
    const handleSubmit = (event) => {
        event.preventDefault()
        props.addItem(input)
        setInput("")
    }

    //-onChange function is used to change the 
    //state of the input whenever something is typed
    return (
        <form onSubmit={handleSubmit} 
            className='shopping-form'>
            <input value={input}
                onChange={(event) => setInput(event.target.value)}
                className='shopping-input'
                placeholder='Add Item To List' />
            <button type="submit"
                className='shopping-btn'> Add Item To List</button>
        </form>
    )
}
