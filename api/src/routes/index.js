const { default: axios } = require('axios');
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getAllInfo  } = require('../controllers/index');
const { Pokemon, Type } = require('../db.js')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokemons', async (req, res) => {
    try {
        const name = req.query.name;
        let pokeTotal = await getAllInfo();
        if (name) {
            let pokeName = await pokeTotal.filter(el => el.name.toLowerCase() === name.toLowerCase());
            if(pokeName.length){
                return res.status(200).send(pokeName)
            } else{
                return res.status(404).send('Pokemon not found (try to write the exact name)')
            }
            
            
        } else {
            //console.log('all pokemons: ', pokeTotal)
           return  res.status(200).send(pokeTotal)
        }
        } catch(e) {
            console.log(e)
        }  
})


router.post('/pokemons', async (req, res) => {
    try {
    let {
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        image,
        types,
        createdInDb
    } = req.body
    let findOnePokemon = await Pokemon.findOne({
        where: {
          name: name.toLowerCase(),
        },
      });
      //Primero verifico que el nombre este disponible.
      if (findOnePokemon)
        return res.json({ msg: "El Pokemon ya existe. Intenta crear otro." });
    let newPokemon = await Pokemon.create({
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        image: image ? image : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/769px-Pokebola-pokeball-png-0.png",
        createdInDb
    })
    let typesDb = await Type.findAll({
        where: {name: types}
    });

    newPokemon.addType(typesDb); // metodo sequelize
   
    return res.status(200).send('¡Pokemon Created!');
    
} catch(e) {
    console.log(e)
}  
});

router.get('/pokemons/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        let pokemon;
        if(typeof id === 'string' && id.length > 8) {
            const e = await Pokemon.findByPk(id, {include: Type})
            const pokemon = {
                id : e.id,
                name: e.name,
                hp : e.hp,
                attack: e.attack,
                defense: e.defense,
                speed: e.speed,
                height: e.height,
                weight: e.weight,
                sprite: e.sprite,
                createdInDb : e.createdInDb,
                types: e.types.map( t => t.name)

            }
            return res.send(pokemon)

        }else {
            const axiosPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const e = axiosPokemon.data
            pokemon = {
                id : e.id,
                name: e.name,
                hp : e.stats[0].base_stat,
                attack: e.stats[1].base_stat,
                defense: e.stats[2].base_stat,
                speed: e.stats[5].base_stat,
                height: e.height,
                weight: e.weight,
                sprite: e.sprites.other.dream_world.front_default,
                createdInDb : false,
                types: e.types.map(t => t.type.name)

            }

            return res.send(pokemon);

        }
        
    } catch (error) {
        next(error)
        
    }
})

router.get('/types', async (req, res) => {
    try {
    let typesApi = await axios.get('https://pokeapi.co/api/v2/type');
    let types = typesApi.data.results.map(p => p.name);
    //console.log('ALL TYPES: ', types);
    types.forEach(t => {
        Type.findOrCreate({
            where: { name: t }
        })
    })
    let allTypes = await Type.findAll();
   return  res.status(200).send(allTypes);
} catch(e) {
    console.log(e)
}  
});


module.exports = router;