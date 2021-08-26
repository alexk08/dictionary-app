import { FC } from "react";
import { PronunciationProps } from "../../../types/props-types";
import { EMPTY, FILTER_ALL } from "../../../utils/constants";

const Pronunciation: FC<PronunciationProps> = ({ pronunciation, filter, isStarredPage }) => {
  const filterPronunciation = (items: Array<string[]>, filter: string): Array<string[]> => {
    return filter === FILTER_ALL || !isStarredPage
      ? items
      : items.filter((item) => item[0] === filter || item[0] === FILTER_ALL);
  };

  const items: Array<string[]> = !pronunciation
    ? [[EMPTY.PRONUNCIATION.NOT_SPECIFIED, EMPTY.STRING]]
    : typeof pronunciation === "string"
    ? [[EMPTY.PRONUNCIATION.ALL, pronunciation]]
    : filterPronunciation(Object.entries(pronunciation), filter);

  const renderedItems = items.map((item, idx) => (
    <li key={idx}>
      <span>{[item[0]]} </span>
      <span>{item[1] && `[ ${item[1]} ]`}</span>
    </li>
  ));

  return (
    <div className="word-card__pronunciation">
      <h4 className="word-card__pronunciation-title">pronunciation:</h4>
      <ul className="word-card__pronunciation-list">{renderedItems}</ul>
    </div>
  );
};

export { Pronunciation };
