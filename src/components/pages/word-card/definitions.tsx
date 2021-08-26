import { FC } from "react";
import { Definition } from "../../../types/data-types";
import { DefinitionsProps } from "../../../types/props-types";
import { EMPTY, FILTER_ALL } from "../../../utils/constants";

const Definitions: FC<DefinitionsProps> = ({ mainInfo, filter, isStarredPage }) => {
  //TODO: взять на заметку при рефакторе: делать не переменную items, а renderItems. Удобно необязательные массивы обрабатывать в return

  const filterDefinitions = (definitions: Definition[], filter: string) => {
    return filter === FILTER_ALL || !isStarredPage
      ? definitions
      : definitions.filter(({ partOfSpeech }) => partOfSpeech === filter);
  };

  const renderDefinitions = (definitions: Definition[]) => {
    return definitions.map(({ definition, partOfSpeech }, idx) => (
      <li className="word-card__definition-item list-group-item" key={idx}>
        <span className="word-card__def-number">{idx + 1}. </span>
        <div>
          <span className="word-card__speech-part">{partOfSpeech} </span>
          <span className="word-card__definition">{definition}</span>
        </div>
      </li>
    ));
  };

  return (
    <div className="word-card__definitions">
      {mainInfo && mainInfo.length ? (
        <ul className="word-card__definition-list list-group list-group-flush">
          {renderDefinitions(filterDefinitions(mainInfo, filter))}
        </ul>
      ) : (
        EMPTY.DEFINITION
      )}
    </div>
  );
};

export { Definitions };
