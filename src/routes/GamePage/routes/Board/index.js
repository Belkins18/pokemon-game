import {useContext, useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
// Components
import PokemonCard from '../../../../components/PokemonCard';
import { PokemonContext } from '../../../../context/pokemonContext';
// Styles
import s from './style.module.css';
// Api
import API_RESPONSE from "../../../../api";

const BoardPage = () => {
    const [board, setBoard] = useState([]);
    const [player2, setPlayer2] = useState([]);

    const {pokemons} = useContext(PokemonContext);
    const history = useHistory();

    useEffect( () => {
        let cleanupFunction = false;
        async function fetchBoardData() {
            try{
                const boardResponse = await fetch(API_RESPONSE.board.url, API_RESPONSE.board.options);
                const boardRequest = await boardResponse.json();
                return boardRequest;
            } catch (e) {
                console.error(e.message)
            }

        }
        fetchBoardData().then(({data}) => {
            if(!cleanupFunction) setBoard(data)
        });

        async function fetchPlayer2Data() {
            const player2Response = await fetch(API_RESPONSE.createPlayer.url, API_RESPONSE.createPlayer.options);
            const player2Request = await player2Response.json();
            return player2Request;
        }

        fetchPlayer2Data().then(({data}) => {
            if(!cleanupFunction) setPlayer2(data)
        });
        // функция очистки useEffect
        return () => cleanupFunction = true;
    }, []);
    if (Object.keys(pokemons).length === 0)
        history.replace("/game")

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
            <div className={s.playerTwo}>
                {
                    player2
                        .map(({id, name, img, type, values}) => (
                            <PokemonCard
                                key={uuidv4()}
                                className={s.card}
                                id={id}
                                name={name}
                                img={img}
                                type={type}
                                values={values}
                                isActive={true}
                                minimize
                            />
                        ))
                }
            </div>
        </div>
    );
};

export default BoardPage;