const Pagination = ({ itemPerPage, dataLength,currentPage }) => {
  // console.log(dataLength);
  // console.log(itemPerPage);
  let pageArray = [];
  for (let i = 1; i <= Math.ceil(dataLength / itemPerPage); i++) {
    pageArray.push(i);
    console.log(i);
  }

  return (
    <div className="pagination-btns">
      {pageArray.map((ele, i) => {
        return <button key={i} onClick={()=> currentPage(ele)}>{ele}</button>;
      })}
    </div>
  );
};

export default Pagination;

//
