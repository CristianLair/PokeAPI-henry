import { Route } from "react-router-dom";
import LandingPage from './components/landing/LandingPage.jsx'
import Home from './components/home/Home.jsx';
import Detail from './components/home/Detail.jsx'
import CreatePokemon from './components/home/CreatePokemon.jsx'


function App() {
  return (
    <>
    <Route path='/' exact>
    <LandingPage />
  </Route>
  <Route path='/home' exact>
    <Home />
  </Route>
  <Route path='/pokemons/:id' exact>
    <Detail />
  </Route>
  <Route path="/pokemons" exact>
    <CreatePokemon />
  </Route>
        
  </>
      
  );
};

export default App;

