import { FC } from "react";
import { FILTERS } from "../../utils/constants";
import { FilterInput } from "./filter-input";

const Filters: FC = () => {
  const filters = FILTERS.map((filterName, idx) => {
    return (
      <li className="filters__item form-check" key={idx}>
        <FilterInput filterName={filterName} />
        <label className="form-check-label" htmlFor={`filter-${filterName}`}>
          {filterName}
        </label>
      </li>
    );
  });

  return <ul className="filters">{filters}</ul>;
};

export { Filters };
