import { FC, ReactNodeArray } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { SortIndexes, WordDataWithPropStarred } from "../../types/data-types";
import { WordsListReduxProps } from "../../types/props-types";
import { DictionaryState } from "../../types/redux-types";
import { sortStarredWords } from "../../actions";
import { EMPTY, FILTER_ALL, ROUTE } from "../../utils/constants";
import { WordsListItem } from "../words-list-item";
import { SortableWordsList } from "./sortble-words-list";
import { Spinner } from "../spinner";
import { ErrorIndicator } from "../error-indicator";

const WordsListRedux: FC<WordsListReduxProps> = ({
  foundWords,
  starredWords,
  filter,
  searchWord,
  sortStarredWords,
  isLoading,
  error,
}) => {
  const location = useLocation();

  const renderWords = (words: WordDataWithPropStarred[]): ReactNodeArray => {
    return words.map((word: WordDataWithPropStarred, index: number) => (
      <WordsListItem word={word} key={word.name} index={index} />
    ));
  };

  const filterStarredWords = (words: WordDataWithPropStarred[], filter: string): WordDataWithPropStarred[] => {
    if (filter === FILTER_ALL) return words;

    const filteredWords = words.reduce((accum: WordDataWithPropStarred[], word) => {
      const { mainInfo } = word;

      if (mainInfo) {
        const filteredInfo = mainInfo.filter(({ partOfSpeech }) => partOfSpeech === filter);

        if (filteredInfo.length) {
          const newWord = { ...word, mainInfo: filteredInfo };

          return [...accum, newWord];
        }
      }

      return [...accum];
    }, []);

    return filteredWords;
  };

  const searchStarredWords = (words: WordDataWithPropStarred[], searchWord: string): WordDataWithPropStarred[] => {
    if (searchWord === EMPTY.STRING) return words;

    const foundWords = words.filter(({ name }) => {
      const regexp = new RegExp(`^${searchWord}[\\w]*\\b$`, "i");

      return regexp.test(name);
    });

    return foundWords;
  };

  const words =
    location.pathname === ROUTE.ROOT
      ? renderWords(foundWords)
      : renderWords(filterStarredWords(searchStarredWords(starredWords, searchWord), filter));

  const onSortWordsList = (sortIndexes: SortIndexes): void => {
    sortStarredWords(sortIndexes);
  };

  const spinner = isLoading && location.pathname === ROUTE.ROOT ? <Spinner /> : null;

  const errorIndicator = error && location.pathname === ROUTE.ROOT ? <ErrorIndicator /> : null;
  
  return (
    <SortableWordsList onSortEnd={onSortWordsList} useDragHandle>
      <ul className="word-list list-group">
        {words}
        {spinner}
        {errorIndicator}
      </ul>
    </SortableWordsList>
  );
};

const mapStateToProps = (state: DictionaryState) => {
  const { foundWords, starredWords, filter, searchWord, isLoading, error } = state;
  return { foundWords, starredWords, filter, searchWord, isLoading, error };
};

const mapDispatchToProps = {
  sortStarredWords
};

const WordsList = connect(mapStateToProps, mapDispatchToProps)(WordsListRedux);

export { WordsList };
