import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails, cleanDetails } from '../../redux/actions';
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import './css/details.css';


export default function Detail () {
    const dispatch = useDispatch();
    const params = useParams();
   
    
    useEffect(() => {
        dispatch(getDetails(params.id))
    }, [params.id, dispatch]);  
    
    const myPokemon = useSelector((state) => state.details)

    useEffect(() => {
        return function (){
          dispatch(cleanDetails())
        }
      },[dispatch])
   


    return (
        <div>
            {
                myPokemon.length > 0 ?
                <div className='details_container'>                   
                    <div className='left_details'>
                        <h1 className='name1'>NAME <br /> {myPokemon[0].name.toUpperCase()}</h1>
                        <img src={myPokemon[0].image} alt="pokemon" width='380px' height='450px' />
                    </div>
                        <div className="right_details">
                        <h4>TYPES: {myPokemon[0].types.map(t => t.name + ' ')}</h4>
                        <h4>HP: {myPokemon[0].hp}</h4>
                        <h4>ATTACK: {myPokemon[0].attack}</h4>
                        <h4>DEFENSE: {myPokemon[0].defense}</h4>
                        <h4>SPEED: {myPokemon[0].speed}</h4>
                        <h4>HEIGHT: {myPokemon[0].height}</h4>
                        <h4>WEIGHT: {myPokemon[0].weight}</h4>
                        <h3 className='id1'>ID <br /> {myPokemon[0].id}</h3>
                    </div>
                    <div className="btn">
                        <Link to = '/home'>
                            <button  className='btn_home'>Return to Home</button>    
                        </Link>
                    </div>
                </div>
                :
                <div className="loading_container">
                        <h1 className="loading_title">Cargando...</h1>
                        <h4 className="please_w">Espere un momento por favor</h4>
                </div>
            }
            
        </div>
    )

}