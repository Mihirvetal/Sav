/* eslint-disable react/prop-types */


const Book = ({ title, subtitle, authors, image }) => {
    
    return (
      <div className="bookCard">
        <img 
          src={image} 
          alt={subtitle} 
          className="bookImage" 
        />
        <div className="bookInfo">
          <h1 className="bookTitle">{title}</h1>
          <h2 className="bookSubtitle">{subtitle }</h2>
          <h3 className="bookAuthors">{authors}</h3>
        </div>
      </div>
    );
  };
  
  export default Book;
  