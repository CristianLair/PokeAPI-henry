import React from 'react';
import { useState } from 'react';
//import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPokByName } from '../../redux/actions';
import './css/serchBar.css';

export default function SearchBar () {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    
    function handleInputChange (e) {
        e.preventDefault();
        setName('')
        setName(e.target.value);
    }

    function handleSubmit (e) {
        e.preventDefault();
        if (name.length > 0) {
            dispatch(getPokByName(name));
            setName('');
            document.getElementById("search").value = ""
        }else{
            alert('¡ Ingresa un nombre de pokemon!')
        }          
    }  


    return (
        <div className="search_bar">
            <input id='search' type="text" placeholder='Find a Pokemon...' onChange={(e) => handleInputChange(e)}/>
            <button className='btn_search' type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}