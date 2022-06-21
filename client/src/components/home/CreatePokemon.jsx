import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {Link, Redirect} from 'react-router-dom'

import {getTypes,postPokemon} from '../../redux/actions'
import './css/createPokemon.css';

export default  function CreatePokemon() {

const dispatch = useDispatch();
const types = useSelector(state =>state.types )
const exist = useSelector(state=> state.pokemons)
const pattern = new RegExp('^[A-Z]+$', 'i')

const [errors, setErrors] = useState({})


const [input, setInput] = useState({

    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    image: "",
    types: []


})


useEffect(()=>{
    dispatch(getTypes)
},[dispatch])

function handleChange (e) {
    setInput({
        ...input,
        [e.target.name]: e.target.value
    })
    setErrors(validate({
        ...input,
        [e.target.name]: e.target.value
    }))
}


function handleSelect(e){

    setInput({
        ...input,
        types: [...input.types, e.target.value]
    })
    setErrors(validate({
        ...input,
        types: [...input.types, e.target.value]
    }))
}

function handleDelete(e) {
    setInput({
        ...input,
        types: input.types.filter(t => t !== e)
    })
}

function handleSubmit (e) {
    e.preventDefault();
    if(!input.name) {
        return alert("El nombre es requerido") 
    }
    else if (typeof input.name !== 'string' || input.name.length < 3) {
        return alert('Nombre de pokemon invalido')
    }
    else if (exist.find((p) => p.name.toLowerCase() === input.name.toLowerCase())) {
        return alert(`*El nombre ingresado -${input.name}- ya existe,ingrese otro`)
    }
    else if (!input.hp) {
        return alert("Ingrese un valor para los puntos de vida")
    } else if (input.hp < 0 || input.hp > 200) {
        return alert("El valor de los puntos de vida es invalido")
    }
    else if (!input.attack) {
        return alert("Ingrese un valor para los puntos de ataque")
    } else if (input.attack < 0 || input.attack > 150) {
        return alert("Los puntos de ataque del pokemon son invalidos")
    }
    else if (!input.defense) {
        return alert("Ingrese un valor para los puntos de defensa")
    } else if (input.defense < 0 || input.defense > 150) {
        return alert("Los puntos de defensa son invalidos")
    }
    else if (!input.speed) {
        return alert("Ingrese un valor para los puntos de velocidad")
    } else if (input.speed < 0 || input.speed > 110) {
        return alert("Los puntos de velocidad son invalidos")
    }
    else if (!input.height) {
        return alert("Ingrese un valor para la altura del pokemon")
    } else if (input.height < 0 || input.height > 100) {
        return alert("Los puntos de altura son invalidos")
    }
    else if (!input.weight) {
        return alert("Ingrese un valor para el peso del pokemon")
    } else if (input.weight < 0 || input.weight > 1000) {
        return alert("Los puntos de peso del pokemon son invalidos")
    } 
    dispatch(postPokemon(input));
    alert('¡Pokemon Created!')
    Redirect('/home')
    setInput({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        image: "",
        types: []
    })
}

function validate (input){

    let errors = {};
    if(!input.name) {
        errors.name = "El nombre es requerido";
    }
    else if (typeof input.name !== 'string' || input.name.length < 3 ) {
        errors.name = 'Nombre demaciado corto o invalido';
    }
    else if (exist.find((p) => p.name.toLowerCase() === input.name.toLowerCase())) {
        errors.name = `Nombre de pokemon ya existente, ingrese otro`;
    }
    else if (!input.hp) {
        errors.hp = "Valor incorrecto para la vida de pokemon."
    } else if (input.hp < 0 || input.hp > 200) {
        errors.hp = "Los valores de vida no pueden ser negativos o mayor a 200 hp"
    }
    else if (!input.attack) {
        errors.attack = "Es necesario ingresar un valor para el ataque del pokemon"
    } else if (input.attack < 0 || input.attack > 150) {
        errors.attack = "Los valores de ataque no pueden ser negativos o mayor a 150 de ataque"
    }
    else if (!input.defense) {
        errors.defense = "Es necesario un valor para la defensa del pokemon"
    } else if (input.defense < 0 || input.defense > 150) {
        errors.defense = "Los valores de ataque no pueden ser negativos o mayor a 150 de defensa"
    }
    else if (!input.speed) {
        errors.speed = "Es necesario un valor para la velocidad del pokemon"
    } else if (input.speed < 0 || input.speed > 110) {
        errors.speed = "Los valores de ataque no pueden ser negativos o mayor a 110 de velocidad"
    }
    else if (!input.height) {
        errors.height = "*Ingrese un valor para la altura del pokemon"
    } else if (input.height < 0 || input.height > 100) {
        errors.height = "Los valores de ataque no pueden ser negativos o mayor a 100 para la altura del pokemon"
    }
    else if (!input.weight) {
        errors.weight = "Ingrese un valor para el peso del pokemon"
    } else if (input.weight < 0 || input.weight > 1000) {
        errors.weight = "Los valores de ataque no pueden ser negativos o mayor a 1000 para el peso del pokemon"
    } else if (!input.image) {
        errors.image = "Ingrese una imagen, de lo contrario sera creado el pokemon con la imagen por defecto"
    }
    return errors;

}

return (
    <div className='container_all'>
        <Link to="/home">
            <button className='btn_home'>Return to Home</button>
        </Link>
        <h1>¡Create your Pokemon!</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
            <div>
                <div>
                    <label>Name: </label>
                    <input type="text" value={input.name}  pattern="^[A-Za-z]+$" name='name' onChange={(e) => handleChange(e)} className='input_form'/>
                    {
                        errors.name && (
                            <p className='error'>{errors.name}</p>
                        )
                    }
                </div>
                <div>
                    <label>HP: </label>
                    <input type="number"  min='0' max='200' value={input.hp} name='hp' onChange={(e) => handleChange(e)} className='input_form'/>
                    {
                        errors.hp && (
                            <p className='error'>{errors.hp}</p>
                        )
                    }
                </div>
                <div>
                    <label>Attack: </label>
                    <input type="number" min='0' max='150' value={input.attack} name='attack' onChange={(e) => handleChange(e)} className='input_form'/>
                    {
                        errors.attack && (
                            <p className='error'>{errors.attack}</p>
                        )
                    }
                </div>
                <div>
                    <label>Defense: </label>
                    <input type="number"  min='0' max='150' value={input.defense} name='defense' onChange={(e) => handleChange(e)} className='input_form'/>
                    {
                        errors.defense && (
                            <p className='error'>{errors.defense}</p>
                        )
                    }
                </div>
                <div>
                    <label>Speed: </label>
                    <input type="number" min='0' max='110' value={input.speed} name='speed' onChange={(e) => handleChange(e)} className='input_form'/>
                    {
                        errors.speed && (
                            <p className='error'>{errors.speed}</p>
                        )
                    }
                </div>
                <div>
                    <label>Height: </label>
                    <input type="number"  min='0' max='100' value={input.height} name='height' onChange={(e) => handleChange(e)} className='input_form'/>
                    {
                        errors.height && (
                            <p className='error'>{errors.height}</p>
                        )
                    }
                </div>
                <div>
                    <label>Weight: </label>
                    <input type="number" min='0' max='1000' value={input.weight} name='weight' onChange={(e) => handleChange(e)} className='input_form'/>
                    {
                        errors.weight && (
                            <p className='error'>{errors.weight}</p>
                        )
                    }
                </div>
                <div>
                    <label>Image: </label>
                    <input type="url" placeholder="https://example.com" value={input.image} name='image' onChange={(e) => handleChange(e)} className='input_form'/>
                    {
                        errors.image && (
                            <p className='error'>{errors.image}</p>
                        )
                    }
                </div>
                <div className='type_container'>
                    <label>Types: </label>
                    <select name="types" onChange={(e) => handleSelect(e)}>
                        {
                            types.map((t) => (
                                <option value={t.name} key={t.id}>{t.name}</option>
                            ))
                        }
                    </select>
                    
                    {/* {
                        errors.types && (
                            <p className='error'>{errors.types}</p>
                        )
                    } */}
                    {input.types.map(t => 
                    <div className="list_types" key={t}>
                        <p className='type'>- {t}</p>
                        <button className='btn_x' value={t} onClick={() => handleDelete(t)}>x</button>    
                    </div>
                    )}

                </div>
            </div>
            <button type='submit' className='btn_home'>Create Pokemon</button>
        </form>
    </div>
)



}
