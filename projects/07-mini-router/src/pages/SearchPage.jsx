import { useEffect } from "react";

const SearchPage = ({ routeParams }) => {
  useEffect(() => {
    document.title = `Seraching: ${routeParams.query}`
  }, [])
  
  return (
    <>
      <p>Seraching: {routeParams.query}</p>
    </>
  );
};

export default SearchPage;
// 