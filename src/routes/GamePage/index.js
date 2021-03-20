import { useHistory } from "react-router-dom";
import PokemonCard from "../../components/PokemonCard";
import { useState, useEffect } from "react";
import { url } from "../../api";

const GamePage = () => {
  const history = useHistory();
  const handleBackToHomePage = () => history.push("/");
  const isDev = `${process.env.NODE_ENV}` === "development";
  const [pokemons, setPokemons] = useState([]);

  const getPokemons = () => {
    if (isDev) {
      fetch(url + "/pokemons", {
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
          console.error("ERROR:", error.message)
        });
    } else {
      fetch(`https://api.jsonbin.io/b/6052bfc17ffeba41c07cd14b`, {
        headers: {
          "content-type": "application/json",
          "secret-key": `$2b$10$uYn8sNZhJJ0i0S${process.env.REACT_APP_JSONBIN_API_KEY}`,
        },
        method: "GET",
        mode: "cors",
      })
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          console.log(myJson.pokemons);
          setPokemons(myJson.pokemons);
        })
        .catch((error) => {
          console.error("ERROR:", error.message);
        });
    }
  };
  useEffect(() => {
    getPokemons();
  }, []);

  const handleChangeParentState = ({ id, isActive }) => {
    const newCards = pokemons.map((card) => {
      if (card.id === id) {
        card.isActive = !isActive;
      }
      return card;
    });

    setPokemons(newCards);
  };

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
