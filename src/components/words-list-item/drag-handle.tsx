import { SortableHandle } from "react-sortable-hoc";
import { ReactComponent as DragIcon } from "./drag-icon.svg";

const DragHandle = SortableHandle(() => (
  <button className="word-list-item__drag-handle" type="button">
    <DragIcon/>
  </button>
));

export { DragHandle };
