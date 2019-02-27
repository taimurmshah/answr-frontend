/*----------------THUNK CREATORS---------------*/
import { loadMemes, postMeme } from "./actions";

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
        console.log("Here is the response:", res);
        dispatch(postMeme(meme));
      });
  };
};
