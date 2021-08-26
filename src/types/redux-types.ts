import { ErrorValue, SortIndexes, WordDataWithPropStarred } from "./data-types";

interface DictionaryState {
  foundWords: WordDataWithPropStarred[];
  starredWords: WordDataWithPropStarred[];
  filter: string;
  searchWord: string;
  isLoading: Boolean;
  error: ErrorValue;
}

interface ActionWordsLoaded {
  type: "WORDS_LOADED";
  payload: WordDataWithPropStarred[];
}

interface ActionAddWordToStarred {
  type: "ADD_WORD_TO_STARRED";
  payload: WordDataWithPropStarred;
}

interface ActionDeleteWordFromStarred {
  type: "DELETE_WORD_FROM_STARRED";
  payload: WordDataWithPropStarred;
}

interface ActionFilterStarredWords {
  type: "FILTER_STARRED_WORDS";
  payload: string;
}

interface ActionSearchStarredWords {
  type: "SEARCH_STARRED_WORDS";
  payload: string;
}

interface ActionSortStarredWords {
  type: "SORT_STARRED_WORDS";
  payload: SortIndexes;
}

interface ActionToggleLoading {
  type: "TOGGLE_LOADING";
  payload: Boolean;
}

interface ActionSetError {
  type: "SET_ERROR";
  payload: ErrorValue;
}

type DictionaryAction =
  | ActionWordsLoaded
  | ActionAddWordToStarred
  | ActionDeleteWordFromStarred
  | ActionFilterStarredWords
  | ActionSearchStarredWords
  | ActionSortStarredWords
  | ActionToggleLoading
  | ActionSetError;

export type { DictionaryState, DictionaryAction };
