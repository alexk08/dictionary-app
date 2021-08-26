import { FC, SyntheticEvent, useEffect, useMemo, useRef, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { wordsLoaded, searchStarredWords, toggleLoading, setError } from "../../actions";
import { getWords, searchWords } from "../../services/dictionary-service";
import { ErrorValue, FoundWords, InputWordData } from "../../types/data-types";
import { SearchFormReduxProps } from "../../types/props-types";
import { DictionaryState } from "../../types/redux-types";
import { EMPTY, ROUTE } from "../../utils/constants";
import { addStarredWordInfo, transformFoundWords, transformWordData } from "../../utils/helpers";

const SearchFormRedux: FC<SearchFormReduxProps> = ({
  wordsLoaded,
  starredWords,
  searchWord,
  searchStarredWords,
  toggleLoading,
  setError,
}) => {
  const [inputState, setInputState] = useState<string>("");

  const searchEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchEl.current?.focus();
  }, []);

  const location = useLocation();
  const isStarredWords = useMemo(() => {
    const { pathname } = location;

    return pathname === ROUTE.STARRED_WORDS;
  }, [location]);

  const onDataLoaded = (inputData: FoundWords): Promise<InputWordData[]> => {
    const data = transformFoundWords(inputData);

    if (!data.length) {
      throw new Error(ErrorValue[2]);
    }

    return getWords(data);
  };

  const onCompleteDataLoaded = (data: InputWordData[]): void => {
    const pureWords = transformWordData(data);
    const words = addStarredWordInfo(pureWords, starredWords);

    if (!words.length) {
      throw new Error(ErrorValue[2]);
    }

    toggleLoading(false);
    wordsLoaded(words);
  };

  const onError = (e: ErrorEvent): void => {
    toggleLoading(false);
    e.message === ErrorValue[2] ? setError(ErrorValue.emptyResponse) : setError(ErrorValue.net);
  };

  const onFormSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();

    if (isStarredWords) {
      searchStarredWords(inputState.toLowerCase());
    } else {
      setError(ErrorValue.noError);
      toggleLoading(true);
      wordsLoaded(EMPTY.ARRAY);

      searchWords(inputState.toLowerCase()).then(onDataLoaded).then(onCompleteDataLoaded).catch(onError);
    }
    setInputState("");
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputState(e.target.value);
  };

  const onShowWordsClick = (): void => {
    searchStarredWords(EMPTY.STRING);
  };

  const showButton = (): JSX.Element | null =>
    isStarredWords && searchWord ? (
      <button type="button" className={`btn btn-success search-form__show-button`} onClick={onShowWordsClick}>
        Show all the starred words
      </button>
    ) : null;

  return (
    <form className="search-form" onSubmit={onFormSubmit}>
      <div className="mb-3 search-form__input">
        <input
          type="text"
          className="form-control"
          id="search"
          placeholder="Type a word"
          autoComplete="off"
          value={inputState}
          onChange={onSearchChange}
          ref={searchEl}
          required
          pattern="[A-Za-z-]*"
        />
      </div>
      <button type="submit" className="btn btn-primary search-form__search-button">
        Search
      </button>
      {showButton()}
    </form>
  );
};

const mapDispatchToProps = {
  wordsLoaded,
  searchStarredWords,
  toggleLoading,
  setError,
};

const mapStateToProps = (state: DictionaryState) => {
  const { starredWords, searchWord } = state;
  return { starredWords, searchWord };
};

const SearchForm = connect(mapStateToProps, mapDispatchToProps)(SearchFormRedux);

export { SearchForm };
