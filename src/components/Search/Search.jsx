/* eslint-disable react/prop-types */
// import { useState } from "react";

const Search = ({setQuery}) => {
// let [value , setValue] = useState("");

  // function searchData(val){
  //   if(!value) return;
    
  //   searchFn(val)
  //   setValue("")
  // }
    
    

  return (
    <div>
        <input type="search"  name="search" id="search" placeholder="Search the Books...." onChange={(e)=> setQuery(e.target.value)} />


    </div>
  )
}

export default Search