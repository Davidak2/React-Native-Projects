import React from 'react'
import { MdDeleteForever } from "react-icons/md"

export default function ShopItem(props) {

    //onclick calls delete function 
    //used to delete items from array
    const { item, removeItem } = props

    return (
        <div className='shopping-row'>
            {item.text}
            <div className='iconsContainer'>
                <MdDeleteForever className='icon'
                    onClick ={() => removeItem(item.id)} />
            </div>
        </div>
    )
}