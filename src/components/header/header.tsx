import { FC } from "react";
import { NavLink } from "react-router-dom";
import { LINK_TITLE, PAGE_NAMES, ROUTE } from "../../utils/constants";

const Header: FC = () => {
  const items = PAGE_NAMES.map((name, idx) => (
    <li className="header__nav-item" key={idx}>
      {name === LINK_TITLE.STARRED_WORDS ? (
        <NavLink activeClassName="active" to={ROUTE.STARRED_WORDS}>
          {name}
        </NavLink>
      ) : (
        <NavLink
          activeClassName="active"
          to={ROUTE.ROOT}
          isActive={(match, { pathname }) => !new RegExp(`^${ROUTE.STARRED_WORDS}.*\\b$`, "i").test(pathname)}
        >
          {name}
        </NavLink>
      )}
    </li>
  ));

  return (
    <header className="header">
      <nav className="header__nav">
        <ul className="header__nav-list">{items}</ul>
      </nav>
    </header>
  );
};

export { Header };
