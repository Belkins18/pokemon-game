import {useState, useEffect, useContext} from "react";
// Components
import PokemonCard from "../../../../components/PokemonCard";
// Context
import {FirebaseContext} from "../../../../context/firebaseContext";
// Styles
import s from "./style.module.css";

const StartPage = () => {
    const firebase = useContext(FirebaseContext);
    const [pokemons, setPokemons] = useState({});

    useEffect(() => {
        firebase.getPokemonsSocket((pokemons) => {
            setPokemons(pokemons);
        });
        return () => firebase.offPokemonsSocket()
    },[]);

    const handleChangeActiveSelected = (uuid, isSelected) => {
        console.log(uuid);
        if (pokemons[uuid]) {
            const copyState = {...pokemons};
            copyState[uuid]["isSelected"] = !isSelected

            setPokemons(copyState);
        }
    };

    return (
        <div>
            <div className={s.buttonWrap}>
                <button>Start Game</button>
            </div>
            <div className="flex">
                {
                    Object.entries(pokemons).map(([key, {id, name, img, type, values, isSelected}]) => (
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
                            isSelected={isSelected}
                            onChangeParentState={handleChangeActiveSelected}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default StartPage;
