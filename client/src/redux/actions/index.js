import axios from 'axios'

export function getPokemons(){
   
    return async function(dispatch)  {
        let result = await axios.get('http://localhost:3001/pokemons')
        return dispatch({
            type: "GET_POKEMONS",
            payload: result.data
        })
    }


}

export function getTypes(){
    return async function(dispatch){
        try {
            let result = await axios.get("http://localhost:3001/types")
            return dispatch({
                type: "GET_TYPES",
                payload : result.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function filterBySource(payload){

    return {
        type: "FILTER_BY_SOURCE",
        payload
    }
}

export function filterByTypes(payload){
    return{
        type: "FILTER_BY_TYPES",
        payload
    }
}

export function postPokemon(payload){
    return async function(){
        const info = await axios.post('http://localhost:3001/pokemons', payload);
        return info
    }
}

export function ordByName(payload){
    return {
        type: "ORDER_BY_NAME",
        payload
    }
}

export function ordByStr(payload){
    return{
        type: "ORDER_BY_STR",
        payload
    }
}

export function getPokByName(payload){
    return async function(dispatch){
        try {
            let result =  await axios.get('http://localhost:3001/pokemons?name=' + payload)
            return dispatch({
                type: "GET_BY_NAME",
                payload: result.data
            })

        } catch (error) {
            console.log(error)
        }
    }
}

export function getDetails(id){
    return async function(dispatch){
        try {
            let pokeID = await axios.get('http://localhost:3001/pokemons/' + id)
            return dispatch({
                type: "GET_DETAIL",
                payload: pokeID.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function cleanDetails(){
    return{
        type: "CLEAR_DETAIL",
        payload : []
    }
}