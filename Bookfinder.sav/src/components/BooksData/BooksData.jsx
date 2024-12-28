import Book from "../Book/Book";

// eslint-disable-next-line react/prop-types
const BooksData = ({ getBook }) => {
   
  return (
    <div className="bookGrid">
      {getBook.map((book) => (
        <Book
          key={book.id}
          title={book.title}
          subtitle={book.subtitle}
          authors={book.authors}
          image={book.image}
        />
      ))}
    </div>
  );
};

export default BooksData;
