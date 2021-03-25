import { useContext, useEffect } from "react";
import {useHistory} from "react-router-dom";
// Components
import PokemonCard from "../../../../components/PokemonCard";
// Context
import {PokemonContext} from "../../../../context/pokemonContext";
// Styles
import s from "./style.module.css";

const FinishPage = () => {
    const pokemonsContext = useContext(PokemonContext);
    const history = useHistory();

    const myCards =  Object.values(pokemonsContext.pokemons);
    const enemyCards = pokemonsContext.enemyPopemons;

    const handleEndtGameClick = () => {
        console.log(pokemonsContext);
        pokemonsContext.onClearContext();
        history.push({pathname: "/game/"});
    }

    useEffect(() => {
      if (!myCards.length) {
        history.push({pathname: "/game/"});
      }
    })
    return (
        <>
            <div className="flex">
                {
                    myCards.map(({id, name, img, type, values}) => (
                        <div
                            key={id}>
                            <PokemonCard
                                className={s.card}
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
                <button onClick={handleEndtGameClick}>END GAME</button>
            </div>
            <div className="flex">
                {
                    enemyCards.map(({id, name, img, type, values, isSelected}) => (
                        <div
                            key={id}>
                            <PokemonCard
                                className={s.card}
                                id={id}
                                name={name}
                                img={img}
                                type={type}
                                values={values}
                                isActive={true}
                                isSelected={isSelected}
                            />
                        </div>
                        
                    ))
                }
            </div>
        </>
    )
}
export default FinishPage;