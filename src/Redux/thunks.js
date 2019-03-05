/*----------------THUNK CREATORS---------------*/
import {
  loadMemes,
  postMeme,
  regUser,
  logUser,
  jwtLog,
  newCurrentGame
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
        console.log("this is local storage:", localStorage.getItem("token"));
        dispatch(regUser(res));
      })
      .catch(err => {
        console.error("this is the error:", err);
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
        console.log("this is local storage:", localStorage.getItem("token"));
        dispatch(logUser(res));
      })
      .catch(err => {
        console.error("this is the error:", err);
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

export const createNewGame = gameObj => {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({
        title: gameObj.title
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log("Create new game res:", res);
      });
  };
};
