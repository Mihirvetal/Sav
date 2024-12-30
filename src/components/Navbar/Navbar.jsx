/* eslint-disable react/prop-types */
import Search from "../Search/Search";


const Navbar = ({setQuery}) => {
  return (
    <div >
      <h1 className="heading">Book World </h1>

      <Search setQuery={setQuery} />
    </div>
  );
};

export default Navbar;
