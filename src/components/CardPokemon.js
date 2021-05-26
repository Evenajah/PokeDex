import { ProgressBar } from "primereact/progressbar";
import React from "react";
import CuteImage from "../cute.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

const CardPokemon = (props) => {
  const getDamage = () => {
    var count = 0;
    props.pokemon.attacks?.forEach((item) => {
      count += +item.damage.replace(/\D/g, "");
    });
    return count;
  };

  const status = {
    hp: props.pokemon.hp > 100 ? 100 : props.pokemon.hp,
    strength: props.pokemon.attacks?.length * 50,
    weaknesses: props.pokemon.weaknesses?.length * 100,
    damage: getDamage(),
    happiness: Math.round(
      (props.pokemon.hp / 10 +
        getDamage() / 10 +
        10 -
        props.pokemon.weaknesses?.length) /
        5
    ),
  };

  const happinesShow = () => {
    let item = [];
    for (let index = 0; index < status.happiness; index++) {
      item.push(
        <LazyLoadImage
          src={CuteImage}
          loading="lazy"
          effect="opacity"
          alt={index}
          style={{ width: "30px", margin: "5px" }}
        />
      );
    }

    return item;
  };
  return (
    <div className="card-pokemon">
      <button
        className="button-card-pokemon p-button-rounded"
        onClick={() => props.onClick(props.pokemon)}
      >
        {props.buttonText}
      </button>
      <div className="p-grid"></div>
      <div className="p-grid">
        <div className="p-col-3">
          <LazyLoadImage
            src={props.pokemon.imageUrl}
            loading="lazy"
            effect="opacity"
            style={{ width: "100%" }}
            alt="imagePokemon"
          />
        </div>
        <div className="p-col" style={{ marginLeft: "30px" }}>
          <div className="p-grid">
            <div className="p-col-11">
              <h2 className="header-card-pokemon">{props.pokemon.name}</h2>
            </div>
            <div className="p-col-1"></div>
          </div>

          <div className="p-grid">
            <div className="p-col-3">HP</div>
            <div className="p-col-9">
              <ProgressBar value={status.hp}></ProgressBar>
            </div>
          </div>
          <div className="p-grid">
            <div className="p-col-3">STR</div>
            <div className="p-col-9">
              <ProgressBar value={status.strength}></ProgressBar>
            </div>
          </div>

          <div className="p-grid">
            <div className="p-col-3">WEAK</div>
            <div className="p-col-9">
              <ProgressBar value={status.weaknesses}></ProgressBar>
            </div>
          </div>
          <div className="p-grid">
            <div className="p-col">{happinesShow()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPokemon;
