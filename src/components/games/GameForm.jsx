import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import toastr from "toastr";
import * as gamesService from "../../services/gamesService";

function GameForm() {
  const { state } = useLocation();
  const [gameData, setGameData] = useState({
    publisher: "",
    name: "",
    nickname: "",
    rating: "",
    url: "",
  });

  useEffect(() => {
    if (state?.type === "GAME_VIEW" && state.payload) {
      const payload = state.payload;

      setGameData((prevState) => {
        const gameToUpdate = { ...payload };
        gameToUpdate.name = payload.name;
        return { ...prevState, ...gameToUpdate };
      });
    }
  }, [state]);

  const onGameFieldChange = (event) => {
    console.log("onChange", { syntheticEvent: event });

    const target = event.target;
    const value = target.value;
    const name = target.name;

    setGameData((prevState) => {
      console.log("updater onChange");
      const newGameData = {
        ...prevState,
      };
      newGameData[name] = value;
      return newGameData;
    });
  };

  const onAddGameClicked = (e) => {
    e.preventDefault();

    const currentGameData = gameData;
    currentGameData.slug = `IYKYK ${gameData.name}`;
    console.log(
      "identifing current id after click but before running the call",
      currentGameData.id,
      gameData
    );

    gamesService.addGame(currentGameData).then(onAddSuccess).catch(onAddError);
  };

  const onAddSuccess = (response) => {
    console.log(response, "onAddSuccess");
    toastr.success(`Entity was added successfully`);

    setGameData((prevState) => {
      const addGame = { ...prevState };
      addGame.nickname = response.nickname;
      return addGame;
    });
  };

  const onAddError = (response) => {
    console.log(response, "onAddError");
    toastr.error("Entity was NOT added successfully");
  };

  return (
    <React.Fragment>
      <h1>Adding New Games</h1>
      <hr />
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <form>
              <div className="mb-3">
                <label
                  htmlFor="Publisher"
                  className="form-label"
                >
                  Publisher
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="publisher"
                  name="publisher"
                  value={gameData.publisher}
                  onChange={onGameFieldChange}
                ></input>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="Name"
                  className="form-label"
                >
                  Name
                </label>
                <input
                  type="name"
                  className="form-control"
                  id="name"
                  name="name"
                  value={gameData.name}
                  onChange={onGameFieldChange}
                ></input>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="Nickname"
                  className="form-label"
                >
                  Nickname
                </label>
                <input
                  type="nickname"
                  className="form-control"
                  id="nickname"
                  name="nickname"
                  value={gameData.nickname}
                  onChange={onGameFieldChange}
                ></input>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="Rating"
                  className="form-label"
                >
                  Rating
                </label>
                <input
                  type="rating"
                  className="form-control"
                  id="rating"
                  name="rating"
                  value={gameData.rating}
                  onChange={onGameFieldChange}
                ></input>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="imageUrl"
                  className="form-label"
                  placeholder="Provide a Url to an Image"
                >
                  Image Url
                </label>
                <input
                  type="imageUrl"
                  className="form-control"
                  id="imageUrl"
                  name="imageUrl"
                  value={gameData.url}
                  onChange={onGameFieldChange}
                ></input>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onAddGameClicked}
                ></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default GameForm;
