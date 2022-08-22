import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";


const Game = (props) => {
  const navigate = useNavigate();
  const aGame = props.game;
  const onLocalGameClicked = (e) => {
    e.preventDefault();
    props.onGameClicked(props.game, e);
  };

  const onEditGameClicked = (e) => {
    e.preventDefault();
    const stateForTransports = { type: "GAME_VIEW", payload: aGame };
    navigate(`/Games/GameForm/${aGame}`, {
      state: stateForTransports,
    });
  };


  return (
    <div className="col-md-3">
      <div className="card h-100">
      <img
          src={aGame.url}
          className="card-img-top h-75"
          alt="text"
          onClick={onLocalGameClicked}
        />
        <div className="card-body">
          <h5 className="card-title">{aGame.publisher}</h5>
          <p className="card-text">{aGame.name}</p>
          <p className="card-text">{aGame.nickname}</p>
          <p className="card-text">{aGame.rating}</p>
          <button className="btn btn-primary" onClick={onLocalGameClicked}>
            Delete
          </button>
          <button className="btn btn-primary" onClick={onEditGameClicked}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

Game.propTypes = {
    aGame:PropTypes.shape ({
        publisher:PropTypes.string.isRequired,
        name:PropTypes.string.isRequired,
        nickname:PropTypes.string.isRequired,
        rating:PropTypes.string.isRequired,
    }),
};

export default Game;
