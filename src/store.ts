import { createStore } from "redux";
import { initialState, reducer } from "./reducers";
import { ErrorValue } from "./types/data-types";
import { DictionaryState } from "./types/redux-types";
import { LOCAL_STORAGE_ITEM } from "./utils/constants";

const serializedState = localStorage.getItem(LOCAL_STORAGE_ITEM);

const persistedState: DictionaryState = serializedState
  ? { ...JSON.parse(serializedState), isLoading: false, error: ErrorValue.noError }
  : initialState;

const store = createStore(reducer, persistedState);

store.subscribe(() => {
  const { filter, foundWords, searchWord, starredWords } = store.getState();
  const persistedState = { filter, foundWords, searchWord, starredWords };

  localStorage.setItem(LOCAL_STORAGE_ITEM, JSON.stringify(persistedState));
});

export { store };
