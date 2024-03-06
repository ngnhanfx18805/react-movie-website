import React from "react";
import { useState } from "react";
import SearchForm from "./SearchForm";
import NavBar from "../browse/NavBar";
import ResultList from "./ResultList";
const Search = () => {
  const [inputData, setInputData] = useState(null);

  const getInputData = (data) => {
    setInputData(data);
  };

  return (
    <div className="app">
      <NavBar />
      <SearchForm getInputData={getInputData} />
      <ResultList input={inputData === !inputData ? "" : inputData} />
    </div>
  );
};

export default Search;
