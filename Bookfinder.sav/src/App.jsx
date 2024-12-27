import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import axios from "axios";
import BooksData from "./components/booksData/BooksData";
import Pagination from "./components/Pagination/Pagination";

function App() {
  const [getBook, setGetBook] = useState([]); //for getting data
  const [itemPerPage, setItemPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagBook, setPagBook] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await axios.get("https://www.dbooks.org/api/recent");
        let ans = res.data.books;
        setGetBook(ans);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  // Pagination
  useEffect(() => {
    let start = (currentPage - 1) * itemPerPage;
    let end = start + itemPerPage;
    setPagBook(getBook.slice(start, end));
  }, [currentPage, itemPerPage, getBook]);

  return (
    <div className="main_container">
      <Navbar />
      <BooksData getBook={pagBook} />
      <Pagination itemPerPage={itemPerPage} dataLength={getBook.length} currentPage={setCurrentPage} />
    </div>
  );
}

export default App;
