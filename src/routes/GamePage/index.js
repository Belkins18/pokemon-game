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
    }, []);

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
                return copyState;
            }
        });


    };



    return (
        <div>
            <button onClick={handleBackToHomePage}>Back to HomePage</button>
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
