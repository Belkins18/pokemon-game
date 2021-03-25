import { useContext, useEffect, useState } from "react";
import {useHistory} from "react-router-dom";
// Components
import PokemonCard from "../../../../components/PokemonCard";
// Context
import {PokemonContext} from "../../../../context/pokemonContext";
import {FirebaseContext} from "../../../../context/firebaseContext";
// Styles
import s from "./style.module.css";
import cn from "classnames";

const FinishPage = () => {
    const pokemonsContext = useContext(PokemonContext);
    const firebaseContext = useContext(FirebaseContext);
    const [enemyPokemons, setEnemyPokemons] = useState(pokemonsContext.enemyPopemons)
    const [selectedPokemon, setSelectedPokemon] = useState(null)

    const history = useHistory();

    const myCards =  Object.values(pokemonsContext.pokemons);

    const handleEndGameClick = () => {
        console.log(selectedPokemon);
        if (selectedPokemon) {
            delete selectedPokemon.isSelected;
            
            firebaseContext.addPokenon(selectedPokemon, () => {
                pokemonsContext.onClearContext();
                history.push({pathname: "/game/"});
            });
        } else {
            pokemonsContext.onClearContext();
            history.push({pathname: "/game/"});
        }
    }

    const handleChangeActiveSelected = (id, isSelected) => {
        const copyState = enemyPokemons;
        const newState = copyState.map((item, index) => {
            if(item.id === id) {
                item.isSelected = !isSelected;
                setSelectedPokemon(item);
            } else {
                item.isSelected = false;
            }
        })
        console.log(selectedPokemon);
        pokemonsContext.onEnemyPokemons(newState);
    };

    // useEffect(() => {
    //   if (!myCards.length) {
    //     history.push({pathname: "/game/"});
    //   }
    // } [myCards]);
    return (
        <>
            <div className="flex">
                {
                    myCards.map(({id, name, img, type, values}) => (
                        <div
                            key={id}>
                            <PokemonCard
                                className={cn(s.card, s.noSelected)}
                                key={id}
                                id={id}
                                name={name}
                                img={img}
                                type={type}
                                values={values}
                                isActive={true}
                            />
                        </div>
                    ))
                }
            </div>
            <div className={s.buttonWrap}>
                <h1>You {pokemonsContext.statusGame}</h1>
                <button 
                    onClick={handleEndGameClick}
                    // disabled={}
                >END GAME</button>
            </div>
            <div className="flex">
                {
                    enemyPokemons.map(({id, name, img, type, values, isSelected}) => (
                        <div
                            key={id}>
                            <PokemonCard
                                className={cn(s.card, {[s.noSelected]:pokemonsContext.statusGame !== "WIN", [s.isSelected]: isSelected})}
                                id={id}
                                name={name}
                                img={img}
                                type={type}
                                values={values}
                                isActive={true}
                                isSelected={isSelected}
                                onChangeParentState={ () => {
                                    if (pokemonsContext.statusGame === "WIN") {
                                        console.log("click")
                                        handleChangeActiveSelected(id, isSelected)
                                    }
                                }}
                            />
                        </div>
                        
                    ))
                }
            </div>
        </>
    )
}
export default FinishPage;