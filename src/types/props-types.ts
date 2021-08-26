import { Definition, ErrorValue, PronunciationType, SortIndexes, WordDataWithPropStarred } from "./data-types";
import { DictionaryAction, DictionaryState } from "./redux-types";
import { ReactElement } from "react";

interface WordsListItemProps {
  word: WordDataWithPropStarred;
  index: number;
}

interface WordListItemState {
  filter: string;
  searchWord: string;
}

type WordsListItemReduxProps = WordsListItemProps & WordListItemState;

interface WordListState {
  foundWords: DictionaryState["foundWords"];
  starredWords: DictionaryState["starredWords"];
  filter: string;
  searchWord: string;
  isLoading: Boolean;
  error: ErrorValue;
}

interface WordListDispatchProps {
  sortStarredWords: (payload: SortIndexes) => DictionaryAction;
}

type WordsListReduxProps = WordListState & WordListDispatchProps;

interface SearchFormState {
  starredWords: DictionaryState["starredWords"];
  searchWord: string;
}

interface SearchFormDispatchProps {
  wordsLoaded: (foundWords: WordDataWithPropStarred[]) => DictionaryAction;
  searchStarredWords: (word: string) => DictionaryAction;
  toggleLoading: (loading: Boolean) => DictionaryAction;
  setError: (errorValue: ErrorValue) => DictionaryAction;
}

type SearchFormReduxProps = SearchFormState & SearchFormDispatchProps;

interface FilterInputProps {
  filterName: string;
}

interface FiltersInputState {
  filter: string;
}

interface FilterInputDispathProps {
  filterStarredWords: (partOfSpeech: string | undefined) => DictionaryAction;
}

type FilterInputReduxProps = FilterInputProps & FiltersInputState & FilterInputDispathProps;

interface WordCardProps {
  match: any;
}

interface WordCardState {
  foundWords: DictionaryState["foundWords"];
  starredWords: DictionaryState["starredWords"];
  filter: string;
}

type WordCardReduxProps = WordCardProps & WordCardState;

interface PronunciationProps {
  pronunciation: PronunciationType;
  filter: string;
  isStarredPage: boolean;
}

interface DefinitionsProps {
  mainInfo?: Definition[];
  filter: string;
  isStarredPage: boolean;
}

interface StarToggleProps {
  word: WordDataWithPropStarred;
}

interface StarToggleDispatchProps {
  addWordToStarred: (word: WordDataWithPropStarred) => DictionaryAction;
  deleteWordFromStarrred: (word: WordDataWithPropStarred) => DictionaryAction;
}

type StarToggleReduxProps = StarToggleProps & StarToggleDispatchProps;

interface SortableWordsListProps {
  children: ReactElement;
}

interface SortableWordsListItemProps {
  children: ReactElement;
}

interface ErrorIndicatorPropsRedux {
  error: ErrorValue;
}

export type {
  WordsListItemReduxProps,
  WordsListReduxProps,
  SearchFormState,
  SearchFormReduxProps,
  FilterInputReduxProps,
  WordCardReduxProps,
  PronunciationProps,
  DefinitionsProps,
  StarToggleReduxProps,
  SortableWordsListProps,
  SortableWordsListItemProps,
  ErrorIndicatorPropsRedux,
};
