import { SortableContainer } from "react-sortable-hoc";
import { SortableWordsListProps } from "../../types/props-types";

const SortableWordsList = SortableContainer(({ children }: SortableWordsListProps) => <>{children}</>);

export { SortableWordsList };
