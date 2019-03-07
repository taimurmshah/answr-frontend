/*----------------THUNK CREATORS---------------*/
import {
  loadMemes,
  postMeme,
  regUser,
  logUser,
  jwtLog,
  newCurrentGame,
  addGames,
  putRounds,
  removeCurrentGame,
  playerTwoAddsCurrentGame
} from "./actions";

export const getMemes = () => {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/memes")
      .then(res => res.json())
      .then(res => {
        dispatch(loadMemes(res));
      });
  };
};

export const addMeme = meme => {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/memes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ meme })
    })
      .then(res => res.json())
      .then(res => {
        dispatch(postMeme(meme));
      });
  };
};

export const registerUser = userObj => {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user: {
          name: userObj.name,
          email: userObj.email,
          password: userObj.password
        }
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          let error = new Error("Registration unsuccessful. Please try again.");
          throw error;
        }
      })
      .then(res => {
        localStorage.setItem("token", `${res.jwt}`);
        dispatch(regUser(res));
      })
      .catch(err => {
        alert(err.message);
      });
  };
};

export const logUserIn = userObj => {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user: {
          email: userObj.email,
          password: userObj.password
        }
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          let error = new Error("Log in unsuccessful, please try again");
          throw error;
        }
      })
      .then(res => {
        localStorage.setItem("token", `${res.jwt}`);
        dispatch(logUser(res));
      })
      .catch(err => {
        alert(err.message);
      });
  };
};

export const logUserInWithToken = token => {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/user", {
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
        Authorization: `${token}`
      }
    })
      .then(res => res.json())
      .then(res => {
        dispatch(jwtLog(res));
      });
  };
};

export const createNewGame = (gameObj, userObj) => {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({
        title: gameObj.title,
        user_id: userObj.id
      })
    })
      .then(res => res.json())
      .then(res => {
        dispatch(newCurrentGame(res.game));
        dispatch(putRounds(res.rounds));
      });
  };
};

export const getGames = () => {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/games")
      .then(res => res.json())
      .then(res => {
        let availableGames = res.filter(game => {
          return game.is_game_in_play === false;
        });
        dispatch(addGames(availableGames));
      });
  };
};

export const deleteGame = gameObj => {
  return dispatch => {
    return fetch(`http://localhost:3000/api/v1/games/${gameObj.id}`, {
      method: "DELETE"
    }).then(dispatch(removeCurrentGame()));
  };
};

export const playerTwoJoinsGame = (gameId, userId) => {
  return dispatch => {
    return fetch(`http://localhost:3000/api/v1/games/${gameId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({
        game_id: gameId,
        user_id: userId
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log("User joining game thunk response:", res);
        dispatch(playerTwoAddsCurrentGame(res));
      });
  };
};
