import { DictionaryState, DictionaryAction } from "../types/redux-types";
import { EMPTY, FILTER_ALL } from "../utils/constants";
import { findIndex } from "../utils/helpers";
import { arrayMoveImmutable } from "array-move";
import { ErrorValue } from "../types/data-types";

const initialState: DictionaryState = {
  foundWords: [],
  starredWords: [],
  filter: FILTER_ALL,
  searchWord: EMPTY.STRING,
  isLoading: false,
  error: ErrorValue.noError,
};

const reducer = (state = initialState, action: DictionaryAction) => {
  switch (action.type) {
    case "WORDS_LOADED": {
      return {
        ...state,
        foundWords: action.payload,
      };
    }

    case "ADD_WORD_TO_STARRED": {
      const { starredWords, foundWords } = state;
      const { name } = action.payload;
      const idx = findIndex(name, foundWords);

      if (idx !== -1) {
        return {
          ...state,
          foundWords: [
            ...foundWords.slice(0, idx),
            { ...action.payload, isWordStarred: true },
            ...foundWords.slice(idx + 1),
          ],
          starredWords: [...starredWords, { ...action.payload, isWordStarred: true }],
        };
      }

      return {
        ...state,
        starredWords: [...starredWords, { ...action.payload, isWordStarred: true }],
      };
    }

    case "DELETE_WORD_FROM_STARRED": {
      const { starredWords, foundWords } = state;
      const { name } = action.payload;

      const idxSW = findIndex(name, starredWords);

      const idxFW = findIndex(name, foundWords);

      if (idxFW !== -1) {
        return {
          ...state,
          foundWords: [
            ...foundWords.slice(0, idxFW),
            { ...action.payload, isWordStarred: false },
            ...foundWords.slice(idxFW + 1),
          ],
          starredWords: [...starredWords.slice(0, idxSW), ...starredWords.slice(idxSW + 1)],
        };
      }

      return {
        ...state,
        starredWords: [...starredWords.slice(0, idxSW), ...starredWords.slice(idxSW + 1)],
      };
    }

    case "FILTER_STARRED_WORDS": {
      return {
        ...state,
        filter: action.payload,
      };
    }

    case "SEARCH_STARRED_WORDS": {
      return {
        ...state,
        searchWord: action.payload,
      };
    }

    case "SORT_STARRED_WORDS": {
      const { starredWords } = state;
      const { oldIndex, newIndex } = action.payload;

      return {
        ...state,
        starredWords: arrayMoveImmutable(starredWords, oldIndex, newIndex),
      };
    }

    case "TOGGLE_LOADING": {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case "SET_ERROR": {
      return {
        ...state,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};

export { reducer, initialState };
