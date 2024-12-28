import Search from "../Search/Search";


const Navbar = ({setQuery}) => {
  return (
    <div>
      <h1>Book World </h1>

      <Search setQuery={setQuery} />
    </div>
  );
};

export default Navbar;
