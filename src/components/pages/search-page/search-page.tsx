import { FC } from "react";
import { useLocation } from "react-router-dom";
import { ROUTE } from "../../../utils/constants";
import { Filters } from "../../filters";
import { SearchForm } from "../../search-form";
import { WordsList } from "../../words-list";

const SearchPage: FC = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <section className="search-page">
      {pathname === ROUTE.STARRED_WORDS ? <h2 className="search-page__title">Starred Words</h2> : null}
      <div className="search-page__container">
        <div className="search-page__left-column">
          <SearchForm />
          {pathname === ROUTE.STARRED_WORDS ? <Filters /> : null}
        </div>
        <div className="search-page__right-column">
          <WordsList />
        </div>
      </div>
    </section>
  );
};

export { SearchPage };
