/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import axios from "axios";
import BooksData from "./components/booksData/BooksData";
import Pagination from "./components/Pagination/Pagination";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

function App() {
  const [books, setBooks] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (isVerified) {
      async function fetchBooks() {
        try {
          const response = await axios.get("https://www.dbooks.org/api/recent");
          setBooks(response.data.books);
        } catch (error) {
          console.error("Error fetching books:", error);
        }
      }
      fetchBooks();
    }
  }, [isVerified]);

  const handleReCAPTCHAVerify = (token) => {
    if (token) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(query.toLowerCase())
  );

  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setBooks((prevBooks) => {
      const oldIndex = prevBooks.findIndex((book) => book.id === active.id);
      const newIndex = prevBooks.findIndex((book) => book.id === over.id);
      return arrayMove(prevBooks, oldIndex, newIndex);
    });
  }

  if (!isVerified) {
    return (
      <div className="recaptcha-container">
        <ReCAPTCHA
          sitekey="6LfIW6gqAAAAAMGYMmMuNaAThiO57hZq-oA-1ptT" 
          onChange={handleReCAPTCHAVerify}
        />
        <p>Please complete the CAPTCHA to access the application.</p>
      </div>
    );
  }

  return (
    <div className="main_container">
      <Navbar setQuery={setQuery} />
      <DndContext
        collisionDetection={closestCorners}
        sensors={sensors}
        onDragEnd={handleDragEnd}
      >
        <BooksData getBook={paginatedBooks} />
      </DndContext>
      <Pagination
        itemPerPage={itemsPerPage}
        dataLength={filteredBooks.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;
