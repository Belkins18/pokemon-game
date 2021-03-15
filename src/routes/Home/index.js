import React from "react";
// Components
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import Footer from "../../components/Footer";
import PokemonCard from "../../components/PokemonCard";

// Images
import bg1 from "../../assets/images/bg1.jpg";
import bg3 from "../../assets/images/bg3.jpg";

// Api
import POKEMONS from "../../api/pokemon.json";
import MenuHeader from "../../components/MenuHeader";

function HomePage({ onChangePage }) {
  const handleClickButton = (pageName) => {
    console.log("££££: <HomePage/>");
    onChangePage && onChangePage(pageName);
  };

  return (
    <React.Fragment>
      <MenuHeader></MenuHeader>
      <Header onClickButton={handleClickButton} />
      <Layout title="Rules" urlBg={bg1}>
        <p>
          In the game two players face off against one another, one side playing
          as "blue", the other as "red" on a 3x3 grid. Each player has five
          cards in a hand and the aim is to capture the opponent's cards by
          turning them into the player's own color of red or blue.
        </p>
        <p>
          To win, a majority of the total ten cards played (including the one
          card that is not placed on the board) must be of the player's card
          color. To do this, the player must capture cards by placing a card
          adjacent to an opponent's card whereupon the 'ranks' of the sides
          where the two cards touch will be compared. If the rank of the
          opponent's card is higher than the player's card, the player's card
          will be captured and turned into the opponent's color. If the player's
          rank is higher, the opponent's card will be captured and changed into
          the player's color instead.
        </p>
      </Layout>
      <Layout title="Pokemon Cards" colorBg="transparent">
        <div className="flex">
          {POKEMONS.map((item) => (
            <PokemonCard
              key={item.id}
              id={item.id}
              name={item.name}
              img={item.img}
              type={item.type}
              values={item.values}
            />
          ))}
        </div>
      </Layout>
      <Layout title="Layout" desc="Description" urlBg={bg3} />
      <Footer />
    </React.Fragment>
  );
}
export default HomePage;
