import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import style from './css/landing.module.css'

import { useDispatch } from 'react-redux';
import { getPokemons } from '../../redux/actions';

export default function LandingPage() {    
    const dispatch = useDispatch()

    useEffect(() => {
        document.title = "Pokemon Page"
        dispatch(getPokemons())
        
    }, [])

  return (
    <div className={style.container}>
      <h1 className={style.title}>Pokemon Page</h1>
      <br />
      <Link className={style.boton} to='/home'>Explore!</Link>
      <br />
      
    </div>
  )
}