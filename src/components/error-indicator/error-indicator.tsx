import { FC } from "react";
import { connect } from "react-redux";
import { ErrorValue } from "../../types/data-types";
import { ErrorIndicatorPropsRedux } from "../../types/props-types";
import { DictionaryState } from "../../types/redux-types";

const ErrorIndicatorRedux: FC<ErrorIndicatorPropsRedux> = ({ error }) => {
  return (
    <div className="error-indicator">
      {error === ErrorValue.emptyResponse ? (
        <span className="error-indicator__no-words">Words were not found</span>
      ) : (
        <span className="error-indicator__404">404 Something went wrong &#128579;</span>
      )}
    </div>
  );
};

const mapStateToProps = (state: DictionaryState) => {
  const { error } = state;
  return { error };
};

const ErrorIndicator = connect(mapStateToProps)(ErrorIndicatorRedux);

export { ErrorIndicator };
