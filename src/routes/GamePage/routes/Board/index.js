import {useContext, useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
// Components
import PokemonCard from '../../../../components/PokemonCard';
import { PokemonContext } from '../../../../context/pokemonContext';
// Styles
import s from './style.module.css';
// Api
import API_RESPONSE from "../../../../api";


const BoardPage = () => {
    const [board, setBoard] = useState([]);

    const {pokemons} = useContext(PokemonContext);
    // const history = useHistory();

    useEffect( () => {
        async function fetchData() {
            const boardResponse = await fetch(API_RESPONSE.board.url, API_RESPONSE.board.headers);
            const boardRequest = await boardResponse.json();
            return boardRequest;
        }
        fetchData().then(({data}) => {
            setBoard(data);
        });
    }, [])

    // if (Object.keys(pokemons).length === 0)
    //     history.replace("/game")

    const handleClickBoardPlate = (position) => {
        console.log("pos: ", position);
    }

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
                {
                    board.map(item => {
                        console.log(item)
                        return(
                            <div
                                key={item.position}
                                className={s.boardPlate}
                                onClick={() => !item.card && handleClickBoardPlate(item.position)}
                            >
                                {
                                    item.card && <PokemonCard {...item} minimize/>
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default BoardPage;