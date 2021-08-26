import { FC, MouseEvent, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { DictionaryState } from "../../types/redux-types";
import { filterStarredWords } from "../../actions";
import { FILTER_ALL } from "../../utils/constants";
import { FilterInputReduxProps } from "../../types/props-types";

const FilterInputRedux: FC<FilterInputReduxProps> = ({ filter, filterStarredWords, filterName }) => {
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.checked = filter === filterName;
    }
  }, [filter, filterName]);

  const onFilterClick = (e: MouseEvent) => {
    if (e.nativeEvent.target === inputEl.current) {
      if (inputEl.current?.value === filter) {
        filterStarredWords(FILTER_ALL);
        inputEl.current.checked = false;
      } else {
        filterStarredWords(inputEl.current?.value);
      }
    }
  };

  return (
    <input
      className="form-check-input"
      type="radio"
      name="filter"
      id={`filter-${filterName}`}
      value={filterName}
      onClick={onFilterClick}
      ref={inputEl}
    />
  );
};

const mapDispatchToProps = {
  filterStarredWords,
};

const mapStateToProps = (state: DictionaryState) => {
  const { filter } = state;
  return { filter };
};

const FilterInput = connect(mapStateToProps, mapDispatchToProps)(FilterInputRedux);

export { FilterInput };
