import {useState} from "react";
import {Route, Switch, useRouteMatch, useLocation, Redirect} from "react-router-dom";

import StartPage from "./routes/Start";
import BoardPage from "./routes/Board";
import FinishPage from "./routes/Finish";

import {PokemonContext} from "../../context/pokemonContext";

const GamePage = () => {
    const [selectedPokemons, setSelectedPokemons] = useState({});
    const [aiPopemons, setAiPopemons] = useState([]);
    console.log("£££: selectedPokemons: ", selectedPokemons);
    console.log("£££: aiPopemons: ", aiPopemons);

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

    const handleAiPokemons = (p2Pokemons) => {
        console.log(p2Pokemons);
        setAiPopemons(p2Pokemons);
    }


    const location = useLocation();
    console.log(location.pathname);


    const isEmpty = () => {
        return (
            Object.keys(selectedPokemons).length !== 5 && aiPopemons.length !== 5
        )
    }
    console.log(isEmpty());

    return (
        <PokemonContext.Provider value={{
            pokemons: selectedPokemons,
            aiPopemons: aiPopemons,
            onSelectedPokemons: handleSelectedPokemons,
            onAiPokemons: handleAiPokemons
        }}>
            <Switch>
                <Route path={`${match.path}/`} exact component={StartPage}/>
                <Route path={`${match.path}/board`} component={BoardPage}/>
                <Route path={`${match.path}/finish`} render={() => {
                    debugger;
                    if (isEmpty()) {
                        return <Redirect to={
                            {pathname: '/game/', state:{selectedPokemons: {}, aiPopemons: []}}
                        }/>
                    } else {
                        return <FinishPage/>
                    }
                }}/>
            </Switch>
        </PokemonContext.Provider>

    );
};
export default GamePage;
