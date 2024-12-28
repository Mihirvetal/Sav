/* eslint-disable react/prop-types */

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
const Book = ({ id, title, subtitle, authors, image }) => {
  // useSortable hook for drag-and-drop feature
  let { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  // Set style for the drag-and-drop transformation
  const style = {
    transition, // Smooth transition
    transform: CSS.Transform.toString(transform), // Convert the transform object to a CSS string
  };

  return (
    <div
      className="bookCard"
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
    >
      <img src={image} alt={subtitle} className="bookImage" />
      <div className="bookInfo">
        <h1 className="bookTitle">{title}</h1>
        <h2 className="bookSubtitle">{subtitle}</h2>
        <h3 className="bookAuthors">{authors}</h3>
      </div>
    </div>
  );
};

export default Book;
