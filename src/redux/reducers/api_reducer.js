import {
  FETCH_API_START,
  FETCH_API_SUCCESS,
  FETCH_API_FAILURE,
  FETCH_USER_PINS_START,
  FETCH_USER_PINS_SUCCES,
  FETCH_USER_PINS_FAILURE,
  FETCH_USER_BOOK_START,
  FETCH_USER_BOOK_FAILURE,
  FETCH_USER_BOOK_SUCCESS,
  FETCH_LESSON_DATA,
  FETCH_SEARCH_DATA,
  FETCH_VK_GROUP_SUCCESS,
  FETCH_VK_GROUP_FAILURE
} from "../actions/action_types";

export const initialState = {
  loading: false,
  data: false,
  userPins: [],
  errorMessage: null,
  bookmarks: [],
  searchTimetable: [],
  lessonTimetable: [],
  text: '',
  vkData: []
};

export function APIReducer(state = initialState, action) {
  const { type, payload, text } = action;
  switch (type) {
    case FETCH_API_START:
      return { ...state, loading: true };
    case FETCH_API_SUCCESS:
      return { ...state, loading: false, data: payload };
    case FETCH_API_FAILURE:
      return { ...state, loading: false, data: "Not found Data" };
    case FETCH_USER_PINS_START:
      return { ...state, loading: true, errorMessage: null };
    case FETCH_USER_PINS_SUCCES:
      return { ...state, loading: false, userPins: payload };
    case FETCH_USER_PINS_FAILURE:
      return { ...state, loading: false, errorMessage: payload };
    case FETCH_USER_BOOK_SUCCESS:
      return { ...state, bookmarks: payload };
    case FETCH_USER_BOOK_FAILURE:
      return { ...state, errorBook: payload };
    case FETCH_USER_BOOK_START:
      return { ...state };
    case FETCH_SEARCH_DATA:
      return { ...state, searchTimetable: payload };
    case FETCH_LESSON_DATA:
      return { ...state, lessonTimetable: payload, text: text };
    case FETCH_VK_GROUP_FAILURE:
      return { ...state, vkData: 'failed'};
    case FETCH_VK_GROUP_SUCCESS:
      return { ...state, vkData: payload };
    default:
      return state;
  }
}