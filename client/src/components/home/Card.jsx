import React from 'react';
import { Link } from 'react-router-dom';
import './css/card.css';

export default function Card ({image, name, types, id/*, weight*/}) {
    return (
        <div className='card'>
            <img className='card_image' src={image} alt='img not found' width="170px" height="180px"/>
            <div className='card_content'>
                <h5 className='title_name'>NAME</h5>
                <h3>{name}</h3>
                <h4 className='title_types'>TYPES</h4>
                {/* <h5>weight: {weight}</h5> */}
                <h5>{types.map(t => t.name + " ")}</h5>
                <Link className='read_more' to={"/pokemons/" + id}>Read More</Link>
            </div>        
        </div>
    );
};