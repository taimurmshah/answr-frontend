import { combineReducers } from "redux";
import auth from "./auth";
import pregame from "./pregame";
import game from "./game";

const rootReducer = combineReducers({ auth, pregame, game });

export default rootReducer;

/* todo i'm breaking up my original "EXIT_GAME" into two reducer actions,
    so I've got to make sure I create those actions
   */
