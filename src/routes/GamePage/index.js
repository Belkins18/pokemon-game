import {useHistory} from "react-router-dom";
import {useState, useEffect} from "react";
// Database
import database from "../../service/firebase";
// Components
import PokemonCard from "../../components/PokemonCard";


const GamePage = () => {
    const history = useHistory();
    const handleBackToHomePage = () => history.push("/");

    const [pokemons, setPokemons] = useState({});

    useEffect(() => {
        database.ref('pokemons').once('value', (snapshot) => {
            setPokemons(snapshot.val());
        })
    }, [pokemons]);

    // const handleChangeActive = ({uuid, isActive}) => {
    //     let _pokemons = {...pokemons};
    //
    //     for (const key in _pokemons) {
    //         if (key === uuid) {
    //             _pokemons[key] = {
    //                 ..._pokemons[key],
    //                 isActive: !isActive
    //             };
    //         }
    //     }
    //     setPokemons(_pokemons);
    // };

    const handleChangeActive = ({uuid, isActive}) => {
        setPokemons(prevState => {
            if (prevState[uuid]) {
                const copyState = {...prevState};
                copyState[uuid]["isActive"] = !isActive
                database.ref('pokemons/' + uuid).set({
                    ...copyState[uuid]
                });
                console.log(JSON.stringify(copyState[uuid], null, 2));
                return copyState;
            }
        });
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
        database.ref('pokemons/' + newKey).set({...newPokemon});
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
