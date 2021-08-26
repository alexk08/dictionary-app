import { ErrorValue, SortIndexes, WordDataWithPropStarred } from "../types/data-types";
import { DictionaryAction } from "../types/redux-types";
import { FILTER_ALL } from "../utils/constants";

const wordsLoaded = (foundWords: WordDataWithPropStarred[]): DictionaryAction => {
  return {
    type: "WORDS_LOADED",
    payload: foundWords,
  };
};

const addWordToStarred = (word: WordDataWithPropStarred): DictionaryAction => {
  return {
    type: "ADD_WORD_TO_STARRED",
    payload: word,
  };
};

const deleteWordFromStarrred = (word: WordDataWithPropStarred): DictionaryAction => {
  return {
    type: "DELETE_WORD_FROM_STARRED",
    payload: word,
  };
};

const filterStarredWords = (partOfSpeech: string | undefined = FILTER_ALL): DictionaryAction => {
  return {
    type: "FILTER_STARRED_WORDS",
    payload: partOfSpeech,
  };
};

const searchStarredWords = (word: string): DictionaryAction => {
  return {
    type: "SEARCH_STARRED_WORDS",
    payload: word,
  };
};

const sortStarredWords = (payload: SortIndexes): DictionaryAction => {
  return {
    type: "SORT_STARRED_WORDS",
    payload,
  };
};

const toggleLoading = (loading: Boolean): DictionaryAction => {
  return {
    type: "TOGGLE_LOADING",
    payload: loading,
  };
};

const setError = (errorValue: ErrorValue): DictionaryAction => {
  return {
    type: "SET_ERROR",
    payload: errorValue
  }
}

export {
  wordsLoaded,
  addWordToStarred,
  deleteWordFromStarrred,
  filterStarredWords,
  searchStarredWords,
  sortStarredWords,
  toggleLoading,
  setError
};
