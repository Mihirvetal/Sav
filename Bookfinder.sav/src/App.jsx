/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import axios from "axios";
import BooksData from "./components/booksData/BooksData";
import Pagination from "./components/Pagination/Pagination";
import Search from "./components/Search/Search";
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
  const [getBook, setGetBook] = useState([]); //for getting data
  const [itemPerPage, setItemPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagBook, setPagBook] = useState([]);
  const [query, setQuery] = useState("");
  const [cryptonite, setCryptonite] = useState([]);

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

  //  search functionality
  // const searchFn = () =>{
  //   getBook.filter((book) =>
  //   book.title.toLowerCase().includes(query)
  // );
  // }

  const searchFn = getBook.filter((book) =>
    book.title.toLowerCase().includes(query)
  );

  // Set up drag-and-drop sensors
  let sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag-and-drop logic
  function handleDragEnd(event) {
    let { active, over } = event;
    if (active.id === over.id) return;

    setcryptonite((cryptonite) => {
      let startIndex = position(active.id);
      let endIndex = position(over.id);
      return arrayMove(cryptonite, startIndex, endIndex);
    });
  }

  // Find the index of the dragged item
  function position(id) {
    return cryptonite.findIndex((crypt) => crypt.id === id);
  }

  return (
    <div className="main_container">
      <Navbar setQuery={setQuery} />
      <DndContext
        collisionDetection={closestCorners} // collisionDetection defines how items interact during drag (move to closest)
        sensors={sensors} // sensors define the input methods for dragging
        onDragEnd={handleDragEnd} // onDragEnd handles the logic when the dragging ends
      >
        {/* <CryptoData cryptoData={cryptonite} /> */}
        <BooksData getBook={searchFn} />
      </DndContext>
      <Pagination
        itemPerPage={itemPerPage}
        dataLength={getBook.length}
        currentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;
