import { FC, useMemo } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { WordCardReduxProps } from "../../../types/props-types";
import { DictionaryState } from "../../../types/redux-types";
import { ROUTE } from "../../../utils/constants";
import { ErrorIndicator } from "../../error-indicator";
import { StarToggle } from "../../star-toggle";
import { Definitions } from "./definitions";
import { Pronunciation } from "./pronunciation";

const WordCardRedux: FC<WordCardReduxProps> = ({ match, filter, foundWords, starredWords }) => {
  const {
    params: { id },
    url,
  } = match;

  const isStarredPage = useMemo(() => url === `${ROUTE.STARRED_WORDS}${ROUTE.ROOT}${id}`, [id, url]);

  const findWord = useMemo(
    () => (id: string) => {
      return isStarredPage ? starredWords.find(({ name }) => name === id) : foundWords.find(({ name }) => name === id);
    },
    [foundWords, isStarredPage, starredWords]
  );

  const word = useMemo(() => findWord(id), [findWord, id]);

  return word ? (
    <section className="word-card">
      <div className="word-card__header">
        <StarToggle word={word} />
        <h2 className="word-card__name">{word.name}</h2>
      </div>
      <Pronunciation pronunciation={word.pronunciation} filter={filter} isStarredPage={isStarredPage} />
      <Definitions mainInfo={word.mainInfo} filter={filter} isStarredPage={isStarredPage} />
      <Link
        className="word-card__close btn-close"
        to={isStarredPage ? `${ROUTE.STARRED_WORDS}` : `${ROUTE.ROOT}`}
      ></Link>
    </section>
  ) : (
    <ErrorIndicator />
  );
};

const mapStateToProps = (state: DictionaryState) => {
  const { filter, foundWords, starredWords } = state;

  return { filter, foundWords, starredWords };
};

const WordCard = connect(mapStateToProps)(WordCardRedux);

export { WordCard };
