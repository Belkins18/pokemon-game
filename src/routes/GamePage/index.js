import {useState} from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom";

import StartPage from "./routes/Start";
import BoardPage from "./routes/Board";
import FinishPage from "./routes/Finish";

import {PokemonContext} from "../../context/pokemonContext";

const GamePage = () => {
    const [selectedPokemons, setSelectedPokemons] = useState({});
    const [enemyPopemons, setEnemyPopemons] = useState([]);
    const [statusGame, setStatusGame] = useState("");
    console.log("£££: selectedPokemons: ", selectedPokemons);
    console.log("£££: aiPopemons: ", enemyPopemons);

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

    const handleEnemyPokemons = (enemyPokemons) => {
        console.log(enemyPokemons);
        setEnemyPopemons(enemyPokemons);
    }

    const handleClearContext = () => {
        setSelectedPokemons({});
        setEnemyPopemons([]);
    };

    const handleStatusGame = (statusGame) => {
        setStatusGame(statusGame);
    }

    return (
        <PokemonContext.Provider value={{
            pokemons: selectedPokemons,
            enemyPopemons: enemyPopemons,
            statusGame: statusGame,
            onSelectedPokemons: handleSelectedPokemons,
            onEnemyPokemons: handleEnemyPokemons,
            onClearContext: handleClearContext,
            onSetStatusGame: handleStatusGame,

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
