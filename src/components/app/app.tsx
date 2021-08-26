import { FC, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { SearchPage } from "../pages/search-page/search-page";
import { Header } from "../header";
import { WordCard } from "../pages/word-card";
import { ROUTE } from "../../utils/constants";

const App: FC = () => {
  useEffect(() => {
    const savedState = localStorage.getItem("dictionaryState");
    savedState && JSON.parse(savedState);
  }, []);

  return (
    <div className="app">
      <Header />
      <main className="main">
        <Switch>
          <Route path={`${ROUTE.ROOT}`} exact component={SearchPage} />
          <Route path={`${ROUTE.STARRED_WORDS}`} exact component={SearchPage} />
          <Route path={`${ROUTE.ID}`} exact component={WordCard} />
          <Route path={`${ROUTE.STARRED_WORDS}${ROUTE.ID}`} component={WordCard} />
        </Switch>
      </main>
    </div>
  );
};

export { App };
