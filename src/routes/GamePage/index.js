import {useHistory} from "react-router-dom";
import {useState, useEffect} from "react";
// Database
import {database, DT_POKEMONS} from "../../service/firebase";
// Components
import PokemonCard from "../../components/PokemonCard";

console.log(DT_POKEMONS);

const GamePage = () => {
    const history = useHistory();
    const handleBackToHomePage = () => history.push("/");

    const [pokemons, setPokemons] = useState({});

    const getPokemons = () => {
        database.ref(DT_POKEMONS).once('value', (snapshot) => {
            setPokemons(snapshot.val());
        })
    }

    useEffect(() => {
        getPokemons();
    },[]);

    const handleChangeActive = ({uuid, isActive}) => {
        if (pokemons[uuid]) {
            const copyState = {...pokemons};
            copyState[uuid]["isActive"] = !isActive

            database.ref(`${DT_POKEMONS}/${uuid}`).set({
                ...copyState[uuid]
            })
                .then(() => {
                    setPokemons(copyState);
                })
                .catch(e => {console.error(e.message())})
        }
    };

    const handleAddNewPokemons = () => {
        const newPokemon = {
            "abilities": [
                "intimidate",
                "shed-skin",
                "unnerve"
            ],
            "base_experience": 157,
            "height": 35,
            "id": 24,
            "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/24.png",
            "name": "arbok",
            "stats": {
                "attack": 95,
                "defense": 69,
                "hp": 60,
                "special-attack": 65,
                "special-defense": 79,
                "speed": 80
            },
            "type": "poison",
            "values": {
                "bottom": 2,
                "left": 8,
                "right": "A",
                "top": 6
            },
            "weight": 650
        }

        const newKey = database.ref().child('pokemons').push().key;
        database.ref('pokemons/' + newKey).set({...newPokemon})
            .then(() => getPokemons())
            .catch((error) => {console.error(error.message())})
    }

    return (
        <div>
            <div className="flex">
                <button onClick={handleBackToHomePage}>Back to HomePage</button>
                <button onClick={handleAddNewPokemons}>Add new pokemons</button>
            </div>
            <div className="flex">
                {
                    Object.entries(pokemons).map(([key, {id, name, img, type, values, isActive}]) => (
                        <PokemonCard
                            key={key}
                            uuid={key}
                            id={id}
                            name={name}
                            img={img}
                            type={type}
                            values={values}
                            isActive={isActive}
                            onChangeParentState={handleChangeActive}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default GamePage;
