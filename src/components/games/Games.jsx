import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import Pagination from "rc-pagination";
import * as gamesService from '../../services/gamesService';
import Game from "../games/gameCard";


const Games = () => {
  const [gameData, setGameData] = useState({
    arrayOfGames: [],
    gamesComponents: [],
    pageIndex: 0,
    pageSize: 5,
  });

  const [count, setCount] = useState(0);
  const [onShow, setOnShow] = useState(false);
  

  const [currentPage, setCurrentPage] = useState(false);

  false && console.log(gameData.arrayOfGames);

  const navigate = useNavigate();

  const onPageChange = (page) => {
    console.log(page);
    setCurrentPage(page);
  };

  const onDeleteRequested = useCallback((myGame, eObj) => {
    console.log(myGame.name, { myGame, eObj });

    const handler = getDeleteSuccessHandler(myGame.name);

    gamesService.deleteGame(myGame.name).then(handler).catch(onDeleteError);
  }, []);

  const getDeleteSuccessHandler = (nameToBeDeleted) => {
    console.log("getDeleteSuccessHandler", nameToBeDeleted);
    return () => {
      console.log("onDeleteSuccess", nameToBeDeleted);

      setGameData((prevState) => {
        const fd = { ...prevState };
        fd.arrayOfGames = [...fd.arrayOfGames];

        const idxOf = fd.arrayOfGames.findIndex((game) => {
          let result = false;

          if (game.name === nameToBeDeleted) {
            result = true;
          }

          return result;
        });

        if (idxOf >= 0) {
          fd.arrayOfGames.splice(idxOf, 1);
          fd.gamesComponents = fd.arrayOfGames.map(mapGames);
        }
        return fd;
      });
    };
  };

  const onDeleteError = (err) => {
    console.error(err);
  };

  const mapGames = (aGame) => {
    console.log("mapping", aGame);
    return (
      <Game
        game={aGame}
        key={"ListA-" + aGame.name}
        onGameClicked={onDeleteRequested}
      />
    );
  };

  useEffect(() => {
    console.log("firing useEffect on getGames");

    gamesService
      .paginateGame(currentPage, gameData.pageSize)
      .then(onGetGamesSuccess)
      .catch(onGetGamesError);
  }, []);

  const onGetGamesSuccess = (data) => {
    console.log(data);
    let arrayOfGame = data.item.pagedItems;
    console.log({ arrayOfGame });

    setGameData((prevState) => {
      const gd = { ...prevState };
      gd.arrayOfGames = arrayOfGame;
      gd.gamesComponents = arrayOfGame.map(mapGames);
      return gd;
    });
  };

  const onGetGamesError = (err) => {
    console.error(err);
  };

  const onHeaderClicked = () => {
    setCount((prevState) => {
      return prevState + 1;
    });
  };

  const handleShowGames = () => {
    setOnShow((prevState) => !prevState);
  };

  const onAdd = (e) => {
    e.preventDefault();
    navigate("/Games/GameForm");
  };

  const onSearch = (e) => {
    e.preventDefault();
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="input-group">
            <div className="form-outline">
              <input type="search" id="form1" className="form-control" />
            </div>
            <form>
              <button
                type="button"
                className="btn btn-primary h-10"
                onClick={onSearch}
              >
                Search
              </button>
            </form>
          </div>
        </div>
        <h3 onClick={onHeaderClicked}>Games {count} </h3>
        <div>
          <button className="btn btn-primary" onClick={handleShowGames}>
            Toggle Games
          </button>
        </div>
        <div>
          <button className="btn btn-primary" onClick={onAdd}>
            Add Games
          </button>
        </div>
        <div className="container">
          <div className="row">
            <Pagination
              locale={locale}
              defaultPageSize={1}
              total={5}
              onChange={onPageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
        <div className="row">
          {onShow && gameData.arrayOfGames.map(mapGames)}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Games;
