import { useContext } from 'react';
import { useHistory } from "react-router-dom";
// Components
import PokemonCard from '../../../../components/PokemonCard';
import { PokemonContext } from '../../../../context/pokemonContext';
// Styles
import s from './style.module.css';

const BoardPage = () => {
    const {pokemons} = useContext(PokemonContext);
    const history = useHistory();

    if (Object.keys(pokemons).length === 0)
        history.replace("/game")

    return (
        <div className={s.root}>
						<div className={s.playerOne}>
                            {
                                Object.entries(pokemons)
                                .map(([key, {id, name, img, type, values, isSelected}]) => (
                                    <PokemonCard
                                        className={s.card}
                                        key={key}
                                        uuid={key}
                                        id={id}
                                        name={name}
                                        img={img}
                                        type={type}
                                        values={values}
                                        isActive={true}
                                        minimize
                                        isSelected={isSelected}
                                    />
                                ))
                            }
						</div>
            <div className={s.board}>
                <div className={s.boardPlate}>1</div>
                <div className={s.boardPlate}>2</div>
                <div className={s.boardPlate}>3</div>
                <div className={s.boardPlate}>4</div>
                <div className={s.boardPlate}>5</div>
                <div className={s.boardPlate}>6</div>
                <div className={s.boardPlate}>7</div>
                <div className={s.boardPlate}>8</div>
                <div className={s.boardPlate}>9</div>
            </div>
        </div>
    );
};

export default BoardPage;