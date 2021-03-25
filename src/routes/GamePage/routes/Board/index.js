import {useContext, useEffect, useState} from 'react';
// Components
import PokemonCard from '../../../../components/PokemonCard';
import {PokemonContext} from '../../../../context/pokemonContext';
// Styles
import s from './style.module.css';
// Api
import API_RESPONSE from "../../../../api";
import PlayerBoard from "./component/PlayerBoard";

const BoardPage = () => {
    const [board, setBoard] = useState([]);
    const [player2, setPlayer2] = useState([]);
    const [choiceCard, setChoiceCard] = useState(null);

    const {pokemons} = useContext(PokemonContext);
    // const history = useHistory();

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

    // if (Object.keys(pokemons).length === 0)
    //     history.replace("/game")

    const handleClickBoardPlate = (position) => {
        console.log("pos: ", position);
        console.log("choiceCard: ", choiceCard);
    }

    return (
        <div className={s.root}>
            <div className={s.playerOne}>
                <PlayerBoard card={Object.values(pokemons)}
                             onClickCard={(card) => setChoiceCard(card)}
                />
            </div>
            <div className={s.board}>
                {
                    board.map(item => {
                        return (
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
                <PlayerBoard card={ player2 }
                             onClickCard={(card) => setChoiceCard(card)}/>
            </div>
        </div>
    );
};

export default BoardPage;