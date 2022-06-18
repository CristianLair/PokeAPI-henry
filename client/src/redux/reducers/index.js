const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [],
    details: [],
}

export default function rootReducer (state = initialState, action){

switch (action.type) {
    case "GET_POKEMONS":
                    return{
                        ...state,
                        pokemons: action.payload,
                        allPokemons: action.payload
                    };

    case "GET_TYPES":
                    return{
                        ...state,
                        types: action.payload
                    };

    case "FILTER_BY_SOURCE":
        const allPokemons = state.allPokemons;
        const filtrado = action.payload === 'Created' ? allPokemons.filter(e => e.createdInDb) : allPokemons.filter(e => !e.createdInDb)

                    return{
                        ...state,
                        pokemons: action.payload === 'All'? state.allPokemons : filtrado

                    };

    case "FILTER_BY_TYPES":
        const filterTypes = state.types
        const type = action.payload === "All" ? filterTypes.filter(pok => pok.types.length > 0) : filterTypes.filter(pokemons => pokemons.types && pokemons.types.map((types)=> types.name.includes(action.payload)))

        return{
            ...state,
            pokemons : type
        };

    case "ORDER_BY_NAME":
        let ord = action.payload === 'asc' ?  state.pokemons.sort(function(a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
            }
            if (b.name.toLowerCase() > a.name.toLowerCase()) {
            return -1;
            }
            return 0;
        }) :
        state.pokemons.sort(function(a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return -1;
            }
            if (b.name.toLowerCase() > a.name.toLowerCase()) {
            return 1;
            }
            return 0;
        });
        return{
            ...state,
            pokemons: ord
        };

        case "ORDER_BY_STR":

        let ordStr =  action.payload === "higher-strength"
        ? state.pokemons.sort((a, b) => {
            return b.attack - a.attack;
            })
        : state.pokemons.sort((a, b) => {
            return a.attack - b.attack;
            });
    return {
        ...state,
        pokemons: ordStr,
    };

    case "GET_BY_NAME":

        return{
            ...state,
            pokemons: action.payload
        };

    case "GET_DETAIL":

        return{
            ...state,
            details: action.payload
        };

    case "CLEAR_DETAIL":

        return{
            details:action.payload
        }

    default:
       return  state;

}









}