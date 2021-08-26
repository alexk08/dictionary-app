import { SortableElement } from "react-sortable-hoc";
import { SortableWordsListItemProps } from "../../types/props-types";

const SortableWordsListItem = SortableElement(
  ({ children }: SortableWordsListItemProps) => <>{children}</>
);

export { SortableWordsListItem };