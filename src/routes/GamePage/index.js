import {useState} from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import StartPage from "./routes/Start";
import BoardPage from "./routes/Board";
import FinishPage from "./routes/Finish";
import {PokemonContext} from "../../context/pokemonContext";

const GamePage = () => {
    const [selectedPokemons, setSelectedPokemons] = useState({});
    console.log("£££: selectedPokemons: ", selectedPokemons);

    const match = useRouteMatch();

    const handleSelectedPokemons = (uuid, pokemon) => {
        setSelectedPokemons(prevState => {
            if (prevState[uuid]) {
                const copyState = {...prevState};
                delete copyState[uuid];

                return copyState;
            }
            return {
                ...prevState,
                [uuid]: pokemon
            }
        })
    }
    return (
        <PokemonContext.Provider value={{
            pokemons: selectedPokemons,
            onSelectedPokemons: handleSelectedPokemons
        }}>
            <Switch>
                <Route path={`${match.path}/`} exact component={StartPage}/>
                <Route path={`${match.path}/board`} component={BoardPage}/>
                <Route path={`${match.path}/finish`} component={FinishPage}/>
            </Switch>
        </PokemonContext.Provider>

    );
};
export default GamePage;
