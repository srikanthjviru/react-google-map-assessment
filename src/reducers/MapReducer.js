import {
  SET_PLACE_RESULTS,
  SET_SELECTED_PLACE,
} from './MapAction';

const initState = {
  places: [],
  selectedPlace: null,
};

const setPlaceResults = (state, action) => {
  return {
    ...state,
    places: action.places || [],
  };
};

const setSelectedPlace = (state, action) => {
  return {
    ...state,
    selectedPlace: action.place,
  };
};

const reducerMethods = {
  [SET_PLACE_RESULTS]: setPlaceResults,
  [SET_SELECTED_PLACE]: setSelectedPlace,
};

const MapReducer = (state = initState, action) => {
  if (reducerMethods[action.type]) {
    return reducerMethods[action.type](state, action);
  }

  return state;
};

export default MapReducer;
