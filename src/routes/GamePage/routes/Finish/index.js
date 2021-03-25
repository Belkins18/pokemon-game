import { useContext } from "react";
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

    const handleEndtGameClick = () => {
        history.push({pathname: "/game/", state:{selectedPokemons: {}, aiPopemons: []}});
    }
    return (
        <>
            <div className="flex">
                {
                    Object.values(pokemonsContext.pokemons).map(({id, name, img, type, values}) => (
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
                    pokemonsContext.aiPopemons.map(({id, name, img, type, values, isSelected}) => (
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