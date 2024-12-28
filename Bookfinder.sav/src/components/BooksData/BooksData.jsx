import Book from "../Book/Book";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
// eslint-disable-next-line react/prop-types
const BooksData = ({ getBook }) => {
  return (
    <div className="bookGrid">
      <SortableContext items={getBook} strategy={rectSortingStrategy}>
        {getBook.map((book) => (
          <Book
            key={book.id}
            title={book.title}
            subtitle={book.subtitle}
            authors={book.authors}
            image={book.image}
            id={book.id}
          />
        ))}
      </SortableContext>
    </div>
  );
};

export default BooksData;
