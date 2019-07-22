const initialState = {
  currentGame: {},
  users: [],
  friends: [],
  rounds: {},
  //migrate above four.
  currentRound: 1,
  currentPrompt: 0,
  answerForm: false,
  isJudge: false,
  judge1: null,
  judge2: null,
  judge3: null,
  currentJudge: null,
  answers: {
    1: { 0: [], 1: [], 2: [] },
    2: { 0: [], 1: [], 2: [] },
    3: { 0: [], 1: [], 2: [] }
  },
  currentPromptAnswers: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "NEW_CURRENT_GAME":
      return {
        ...state,
        currentGame: action.payload
      };

    case "PUT_ROUNDS":
      return { ...state, rounds: action.payload };

    case "ADD_USERS":
      if (action.payload.length === 1 && state.users.length === 0)
        return { ...state, users: action.payload };
      else if (action.payload.length === 2 || (3 && state.users.length === 0)) {
        return { ...state, users: action.payload };
      } else {
        let checker = {};
        for (let i = 0; i < state.users.length; i++) {
          checker[state.users[i].id] = true;
        }
        for (let i = 0; i < action.payload.length; i++) {
          if (!checker[action.payload[i].id]) {
            let newArray = [...state.users, action.payload[i]];
            return { ...state, users: newArray };
          }
        }
        break;
      }
    case "PLAYER_TWO_ADDS_CURRENT_GAME":
      return { ...state, currentGame: action.payload };
    case "ADD_FRIEND":
      return { ...state, friends: action.payload };

    case "SET_CURRENT_ROUND":
      return { ...state, currentRound: action.payload };

    case "LOAD_JUDGES":
      return {
        ...state,
        judge1: state.users[2],
        judge2: state.users[1],
        judge3: state.users[0]
      };

    case "UPDATE_JUDGE":
      if (state.currentRound === 1) {
        return { ...state, currentJudge: state.judge1 };
      } else if (state.currentRound === 2) {
        return { ...state, currentJudge: state.judge2 };
      } else {
        return { ...state, currentJudge: state.judge3 };
      }

    case "TOGGLE_ANSWER_FORM":
     return { ...state, answerForm: !state.answerForm };

    case "JUDGE_ANSWER_FORM":
      return {...state, answerForm: false, isJudge: true};
    case "INCREMENT_ROUND":
      let newRound = state.currentRound + 1;
      return { ...state, currentRound: newRound };

    case "ADD_ANSWERS":
      // debugger;
      let newAnswers = { ...state.answers };
      newAnswers[state.currentRound][state.currentPrompt].push(action.payload);
      let newCurrentAnswers = [...state.currentPromptAnswers, action.payload];
      return {
        ...state,
        answers: newAnswers,
        currentPromptAnswers: newCurrentAnswers
      };
    case "GAME_EXIT":
      return {
        ...state,
        users: [],
        friends: [],
        rounds: {},
        currentRound: 1,
        currentPrompt: 0,
        answerForm: false,
        isJudge: false,
        judge1: null,
        judge2: null,
        judge3: null,
        currentJudge: null,
        answers: {
          1: { 0: [], 1: [], 2: [] },
          2: { 0: [], 1: [], 2: [] },
          3: { 0: [], 1: [], 2: [] }
        },
        currentPromptAnswers: []
      };
    default:
      return state;
  }
}
