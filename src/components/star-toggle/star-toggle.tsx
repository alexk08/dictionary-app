import { FC, useMemo } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { addWordToStarred, deleteWordFromStarrred } from "../../actions";
import { StarToggleReduxProps } from "../../types/props-types";
import { ROUTE } from "../../utils/constants";

const StarToggleRedux: FC<StarToggleReduxProps> = ({ addWordToStarred, deleteWordFromStarrred, word }) => {
  const { isWordStarred, name } = word;

  const history = useHistory();

  const isStarredCard = useMemo(() => {
    const {
      location: { pathname },
    } = history;

    return pathname === `${ROUTE.STARRED_WORDS}${ROUTE.ROOT}${name}`;
  }, [history, name]);

  const isCard = useMemo(() => {
    const {
      location: { pathname },
    } = history;

    return isStarredCard || pathname === `${ROUTE.ROOT}${name}`;
  }, [history, isStarredCard, name]);

  const onStarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      addWordToStarred(word);
    } else {
      deleteWordFromStarrred(word);

      isStarredCard && history.push(ROUTE.STARRED_WORDS);
    }
  };

  const modificator = isCard ? "star-toggle--card" : "";

  return (
    <input
      className={`star-toggle ${modificator}`}
      type="checkbox"
      title="Add to starred words"
      checked={isWordStarred}
      onChange={onStarChange}
    />
  );
};

const mapDispatchToProps = {
  addWordToStarred,
  deleteWordFromStarrred,
};

const StarToggle = connect(null, mapDispatchToProps)(StarToggleRedux);

export { StarToggle };
