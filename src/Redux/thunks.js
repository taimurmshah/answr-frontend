/*----------------THUNK CREATORS---------------*/
import {
  regUser,
  logUser,
  jwtLog,
  newCurrentGame,
  addGames,
  putRounds,
  removeCurrentGame,
  playerTwoAddsCurrentGame,
  addFriend,
  addUsers
} from "./actions";

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
  console.log("hitting log user in with token");
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

export const createNewGame = (gameObj, userObj, historyObj) => {
  //is there a socket listening to see if new games are created?
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
        console.log("YO: here's the res:", res);
        dispatch(newCurrentGame(res.game));
        dispatch(addUsers(res.game.users));
        //what happens when I create a new game?
        dispatch(putRounds(res.rounds));
        historyObj.push("/play-game");
      });
  };
};

export const getGames = () => {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/games")
      .then(res => res.json())
      .then(res => {
        // let availableGames = res.filter(game => {
        //   return game.is_game_in_play === false;
        // });
        dispatch(addGames(res));
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

export const playerJoinsGame = (gameId, userId, historyObj) => {
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
        console.log("***");
        console.log("in here, here's the res:", res);
        console.log("***");
        let friends = res.users.filter(user => user.id !== userId);

        dispatch(putRounds(res.rounds));
        dispatch(addUsers(res.game.users));
        dispatch(addFriend(friends));
        dispatch(playerTwoAddsCurrentGame(res.game));
        historyObj.push("/play-game");
      });
  };
};

export const submitAnswer = (answerText, gameId, userId, roundId) => {
  console.log("here's the round id:", roundId);

  return dispatch => {
    return fetch("http://localhost:3000/api/v1/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({
        // round: {
        answer_text: answerText,
        game_id: gameId,
        user_id: userId,
        round_id: roundId
        // }
      })
    });
  };
};

export const incrementGameRound = gameId => {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/increment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({
        game_id: gameId
      })
    });
  };
};
