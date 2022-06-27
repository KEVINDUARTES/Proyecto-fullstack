import axios from "axios";

export function getCharacters() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/characters");
    return dispatch({
      type: "GET_CHARACTERS",
      payload: json.data,
    });
  };
}

export function getNameCharacters(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get(
        "http://localhost:3001/characters?name=" + name
      );
      return dispatch({
        type: "GET_NAME_CHARACTERS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getOccupations() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/occupation");
    return dispatch({
      type: "GET_OCCUPATIONS",
      payload: json.data,
    });
  };
}

export function postCharacter(payload) {
  return async function (dispatch) {
    let json = await axios.post("http://localhost:3001/characters", payload);
    return json;
  };
}

export function filterCharacterByStatus(payload) {
  return {
    type: "FILTER_BY_STATUS",
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get("http://localhost:3001/characters/" + id);
      return dispatch({
        type: "GET_DETAIL",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDeleteDetail() {
  return {
    type: "GET_DELETE_DETAIL",
  };
}
