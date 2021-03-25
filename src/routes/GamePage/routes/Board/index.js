import {useContext, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
// Components
import PokemonCard from '../../../../components/PokemonCard';
import {PokemonContext} from '../../../../context/pokemonContext';
// Styles
import s from './style.module.css';
// Api
import API_RESPONSE from "../../../../api";
import PlayerBoard from "./component/PlayerBoard";


const counterWin = (board, player1, player2) => {
    let player1Count = player1.length;
    let player2Count = player2.length;

    board.forEach(item => {
        if (item.card.possession === "red") {
            player2Count++
        }

        if(item.card.possession === "blue") {
            player1Count++
        }

    });

    return [player1Count, player2Count];
}

const BoardPage = () => {
    const pokemonsContext = useContext(PokemonContext);
    const {pokemons, onEnemyPokemons} = pokemonsContext;

    const [board, setBoard] = useState([]);
    const [player1, setPlayer1] = useState(() => {
        return Object.values(pokemons).map(item => {
            return {
                ...item,
                possession: "blue"
            }
        })
    });
    const [player2, setPlayer2] = useState([]);
    const [choiceCard, setChoiceCard] = useState(null);
    const [steps, setSteps] = useState(0);

    const history = useHistory();

    useEffect(() => {
        let cleanupFunction = false;

        async function fetchBoardData() {
            try {
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
            try {
                const player2Response = await fetch(API_RESPONSE.createPlayer.url, API_RESPONSE.createPlayer.options);
                const player2Request = await player2Response.json();
                return player2Request;
            } catch (e) {
                console.error(e.message)
            }
        }

        fetchPlayer2Data().then(({data}) => {
            if (!cleanupFunction) {
                setPlayer2(
                    data.map(item => {
                        return {
                            ...item,
                            possession: "red"
                        }
                    })
                )
                //set player2 cards to pokemonContextProvider
                onEnemyPokemons(data);
            }
        });
        // функция очистки useEffect
        return () => cleanupFunction = true;
    }, []);

    if (Object.keys(pokemons).length === 0)
        history.replace({pathname: '/game', state:{selectedPokemons: {}, aiPopemons: []}})

    const handleClickBoardPlate = async (position) => {
        console.log("pos: ", position);
        console.log("choiceCard: ", choiceCard);

        if (choiceCard) {
            const params = {
                position,
                card: choiceCard,
                board
            }

            console.log(
                API_RESPONSE.playersTurn.url, {
                    ...API_RESPONSE.playersTurn.options,
                    body: JSON.stringify(params),
                }
            )
            async function magicReq(cardParams) {
                try {
                    const res = await fetch(API_RESPONSE.playersTurn.url, {
                        ...API_RESPONSE.playersTurn.options,
                        body: JSON.stringify(cardParams),
                    });
                    const request = await res.json();
                    return request;
                } catch (e) {
                    console.error(e.message());
                }
            }

            const {data} = await magicReq(params);

            if (choiceCard.player === 1) {
                setPlayer1(prevState => prevState.filter(item => item.id !== choiceCard.id))
            }

            if (choiceCard.player === 2) {
                setPlayer2(prevState => prevState.filter(item => item.id !== choiceCard.id))
            }

            setBoard(data);
            setSteps(prevState => {
                const count = prevState + 1;
                return count;
            })

        }
    }

    useEffect(() => {
        if(steps === 9) {
            const [player1Count, player2Count] = counterWin(board, player1, player2);

            if (player1Count > player2Count) {
                alert("WIN")
            } else if (player1Count < player2Count) {
                alert("LOSE")
            } else alert("DRAW");
            
            history.push("/game/finish")
        }
    }, [steps])

    return (
        <div className={s.root}>
            <div className={s.playerOne}>
                <PlayerBoard
                    player={1}
                    cards={player1}
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
                                    item.card && <PokemonCard {...item.card} isActive minimize/>
                                }
                            </div>
                        )
                    })
                }
            </div>
            <div className={s.playerTwo}>
                <PlayerBoard
                    player={2}
                    cards={player2}
                    onClickCard={(card) => setChoiceCard(card)}/>
            </div>
        </div>
    );
};

export default BoardPage;