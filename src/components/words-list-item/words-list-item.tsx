import { FC } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { WordsListItemReduxProps } from "../../types/props-types";
import { DictionaryState } from "../../types/redux-types";
import { EMPTY, FILTER_ALL, ROUTE } from "../../utils/constants";
import { StarToggle } from "../star-toggle";
import { DragHandle } from "./drag-handle";
import { SortableWordsListItem } from "./sortable-words-list-item";

const WordsListItemRedux: FC<WordsListItemReduxProps> = ({ word, searchWord, filter, index }) => {
  const location = useLocation();
  const { pathname } = location;

  const { name, mainInfo } = word;

  const mainDefinition = mainInfo && mainInfo.length ? mainInfo[0] : EMPTY.INFO;

  const { definition, partOfSpeech } = mainDefinition;

  const isDragged = filter === FILTER_ALL && searchWord === EMPTY.STRING && pathname === ROUTE.STARRED_WORDS;

  return (
    <SortableWordsListItem index={index}>
      <li className="word-list-item list-group-item list-group-item-action">
        <Link
          to={pathname === ROUTE.ROOT ? `${ROUTE.ROOT}${name}` : `${ROUTE.STARRED_WORDS}${ROUTE.ROOT}${name}`}
          className="word-list-item__link"
        >
          {isDragged && <DragHandle />}
          <span className="word-list-item__name">{name}</span>
          <span className="word-list-item__speech-part">{partOfSpeech || EMPTY.PART}</span>
          <span className="word-list-item__definition">{definition || EMPTY.DEFINITION}</span>
        </Link>
        <StarToggle word={word} />
      </li>
    </SortableWordsListItem>
  );
};

const mapStateToProps = (state: DictionaryState) => {
  const { filter, searchWord } = state;
  return { filter, searchWord };
};

const WordsListItem = connect(mapStateToProps)(WordsListItemRedux);

export { WordsListItem };
