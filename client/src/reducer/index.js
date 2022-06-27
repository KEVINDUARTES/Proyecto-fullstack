const initialState = {
  characters: [],
  detail: [],
  allCharacters: [],
  occupations: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_CHARACTERS":
      return {
        ...state,
        characters: action.payload,
        allCharacters: action.payload,
      };

    case "GET_NAME_CHARACTERS":
      return {
        ...state,
        characters: action.payload,
      };

    case "GET_OCCUPATIONS":
      return {
        ...state,
        occupations: action.payload,
      };

    case "FILTER_BY_STATUS":
      const allCharacters = state.allCharacters;
      const statusFiltered =
        action.payload === "All"
          ? allCharacters
          : allCharacters.filter((el) => el.status === action.payload);
      return {
        ...state,
        characters: statusFiltered,
      };

    case "POST_CHARACTER":
      return {
        ...state,
      };

    case "FILTER_CREATED":
      const allCharacters2 = state.allCharacters;
      const createdFiltered =
        action.payload === "created"
          ? allCharacters2.filter((el) => el.createdAtDb)
          : allCharacters2.filter((el) => !el.createdAtDb);
      return {
        ...state,
        characters:
          action.payload === "All" ? state.allCharacters : createdFiltered,
      };

    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "asc"
          ? state.characters.sort(function (a, b) {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            })
          : state.characters.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (a.name < b.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        characters: sortedArr,
      };

    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };

    case "GET_DELETE_DETAIL":
      return {
        ...state,
        detail: [],
      };

    default:
      return state;
  }
}

export default rootReducer;
