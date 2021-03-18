import { useHistory } from "react-router-dom";
import PokemonCard from "../../components/PokemonCard";
import { useState, useEffect } from "react";

// Api
import { url } from "../../api";

const GamePage = () => {
  const history = useHistory();
  const handleBackToHomePage = () => history.push("/");

  const [pokemons, setPokemons] = useState([]);

  const getPokemons = () => {
    fetch("https://api.jsonbin.io/b/6052bfc17ffeba41c07cd14b", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) =>  {
        return response.json();
      })
      .then((myJson) => {
        console.log(myJson);
        setPokemons(myJson);
      })
      .catch((error) => {
        console.error("ERROR:", error.message);
      })
    
  };
  useEffect(() => {
    getPokemons();
  }, [])

  const handleChangeParentState = ({id, isActive}) => {
    const newCards = pokemons.map(card => {
      if (card.id === id) {
        card.isActive = !isActive
      }
      return card
    });
    
    setPokemons(newCards);
  }

  return (
    <div>
      <button onClick={handleBackToHomePage}>Back to HomePage</button>
      <div className="flex">
        {pokemons.map((item) => (
          <PokemonCard
            key={item.id}
            id={item.id}
            name={item.name}
            img={item.img}
            type={item.type}
            values={item.values}
            isActive={item.isActive}
            onChangeParentState={handleChangeParentState}
          />
        ))}
      </div>
    </div>
  );
};

export default GamePage;
