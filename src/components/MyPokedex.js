import Dialog from "@material-ui/core/Dialog";
import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import CardPokemon from "./CardPokemon";
import Header from "./core/Header";
// import { Dialog } from 'primereact/dialog';

const MyPokedex = () => {
  const url = "http://localhost:3030/api/cards";
  const [displayPokeDex, setDisplayPokeDex] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [myPokemons, setMyPokemons] = useState([]);

  useEffect(() => {
    GetPokemon();
  }, []);

  useEffect(() => {}, [pokemons]);

  const AddPokemon = (pokemon) => {
    setMyPokemons([...myPokemons, pokemon]);
    const index = pokemons.findIndex((item) => item.id === pokemon.id);
    setPokemons((pokemons) =>
      pokemons.filter((item) => item.id !== pokemon.id)
    );
  };

  const RemovePokemon = (pokemon) => {
    const index = myPokemons.findIndex((item) => item.id === pokemon.id);
    setMyPokemons((myPokemons) =>
      myPokemons.filter((item) => item.id !== pokemon.id)
    );
  };
  const SearchPokemon = async (e) => {
    try {
      console.log(e.target.value);
      const request = await axios.get(`${url}?name=${e.target.value}&limit=20`);
      const response = await request;
      if (response.status === 200) {
        console.log(myPokemons);

        var filterSearch = response.data.cards.filter(
          (responseItems) =>
            !myPokemons.some(
              (pokemonItems) => pokemonItems.id === responseItems.id
            )
        );

        setPokemons(filterSearch);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const listPokemon =
    pokemons &&
    pokemons.map((pokemonItem, index) => {
      return (
        <div style={{ margin: "20px" }}>
          <CardPokemon
            key={pokemonItem.id}
            buttonText="Add"
            pokemon={pokemonItem}
            onClick={AddPokemon}
          ></CardPokemon>
        </div>
      );
    });

  const myPokemon =
    myPokemons &&
    myPokemons.map((pokemonItem, index) => {
      return (
        <div className="p-col-6">
          <CardPokemon
            buttonText="X"
            key={pokemonItem.id}
            pokemon={pokemonItem}
            onClick={RemovePokemon}
          ></CardPokemon>
        </div>
      );
    });

  const GetPokemon = async () => {
    try {
      const request = await axios.get(`${url}`);
      const response = await request;
      if (response.status === 200) {
        setPokemons(response.data.cards);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="wrap-content" style={{ height: "500px" }}>
        <div className="p-grid p-bottom">
          <div className="p-col">
            <center>
              <Button
                label="+"
                className="button-add"
                onClick={() => setDisplayPokeDex(true)}
              />
            </center>
          </div>
        </div>
        <div className="p-grid">
          <div className="p-col">
            <center>
              <Header />
            </center>
          </div>
        </div>
        <div className="p-grid">{myPokemon}</div>
      </div>
      <Dialog
        onClose={() => setDisplayPokeDex(false)}
        aria-labelledby="simple-dialog-title"
        open={displayPokeDex}
        max
      >
        <div className="p-grid">
          <div className="p-col">
            <span className="p-input search-input">
              <InputText
                placeholder="Find Pokemon!"
                onChange={(e) => SearchPokemon(e)}
                className="search-input"
              />
            </span>
          </div>
        </div>
        <br />
        <br />
        {listPokemon}
      </Dialog>
      {/* <Dialog
        header={null}
        visible={displayPokeDex}
        modal={false}
        style={{ width: "800px", height: "550px", background: "white" }}
      >
        <div className="p-grid">
          <div className="p-col">
            <span className="p-input-icon-right search-input">
              <InputText
                placeholder="Find Pokemon!"
                onChange={(e) => SearchPokemon(e)}
                className="search-input"
              />
            </span>
          </div>
        </div>
        <br />
        <br />
        {listPokemon}
      </Dialog> */}
    </>
  );
};

export default MyPokedex;
