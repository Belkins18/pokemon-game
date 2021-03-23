import {useState, useEffect, useContext} from "react";
// Components
import PokemonCard from "../../../../components/PokemonCard";
// Context
import {FirebaseContext} from "../../../../context/firebaseContext";
import {PokemonContext} from "../../../../context/pokemonContext";
// Styles
import s from "./style.module.css";

const StartPage = () => {
    const firebaseContext = useContext(FirebaseContext);
    const pokemonsContext = useContext(PokemonContext);

    const [pokemons, setPokemons] = useState({});

    useEffect(() => {
        firebaseContext.getPokemonsSocket((pokemons) => {
            setPokemons(pokemons);
        });
        return () => firebaseContext.offPokemonsSocket()
    },[]);

    const handleChangeActiveSelected = (uuid, isSelected) => {
        const pokemon = {...pokemons[uuid]}
        pokemonsContext.onSelectedPokemons(uuid, pokemon);

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
                            onChangeParentState={ () => {
                                if (Object.keys(pokemonsContext.pokemons).length < 5 || isSelected) {
                                    handleChangeActiveSelected(key, isSelected)
                                }
                            }}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default StartPage;
