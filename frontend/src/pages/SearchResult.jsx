import { Skeleton } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import AdvancedSearch from "../components/Searches/AdvancedSearch";
import FuzzySearch from "../components/Searches/FuzzySearch";
import DiamondFigures from "../utils/DiamondFigures";
import SearchPageNavbar from "../components/Navbars/SearchPageNavbar";

const SearchResult = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const query = queryParams.get("query");
  const isAdvSearch = queryParams.get("isAdvSearch");
  const genre = queryParams.get("genre");
  
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSearchResults = async () => {
    console.log("query, isAdvSearch", "isTitle", query, isAdvSearch);
    if (isAdvSearch === "true") {
      if(genre===null || genre===" "){
        axios.post(`http://localhost:3002/api/semantic?q=${query}`)
        .then((response) => {
          console.log("response", response);
          setSearchResult(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("err", err.message);
          toast.error(err.message);
        });
      }
      else{
        axios.post(`http://localhost:3002/api/semantic?q=${query}&g=${genre}`)
        .then((response) => {
          console.log("response", response);
          setSearchResult(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("err", err.message);
          toast.error(err.message);
        });
      }
    } else if (isAdvSearch === "false") {
      if(genre===null || genre===" "){
        axios.post(`http://localhost:3002/api/fuzzySearch?q=${query}`)
        .then((response) => {
          console.log("response", response);
          setSearchResult(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("err", err.message);
          toast.error(err.message);
        });
      }
      else{
        axios.post(`http://localhost:3002/api/fuzzySearch?q=${query}&g=${genre}`)
        .then((response) => {
          console.log("response", response);
          setSearchResult(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("err", err.message);
          toast.error(err.message);
        });
    }
  };
}

  useEffect(() => {
    getSearchResults();
  }, []);

  return (
    <>
      <div className="bg-[#171D21] min-h-[100vh] flex flex-col justify-between">
        <SearchPageNavbar />
        {loading ? (
          <DiamondFigures />
        ) : (
          <>
            {isAdvSearch === "true" && (
              <AdvancedSearch searchResult={searchResult} />
            )}
            {isAdvSearch === "false" && (
              <FuzzySearch searchResult={searchResult} />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default SearchResult;
