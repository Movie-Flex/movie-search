import { Skeleton } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import AdvancedSearch from "../components/Searches/AdvancedSearch";
import FuzzySearch from "../components/Searches/FuzzySearch";
import DiamondFigures from "../utils/DiamondFigures";
import SearchPageNavbar from "../components/Navbars/SearchPageNavbar";

const SearchResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
        axios.post(`https://movie-flex-open-soft2024-backend.vercel.app//api/semantic?q=${query}`)
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
        axios.post(`https://movie-flex-open-soft2024-backend.vercel.app//api/semantic?q=${query}&g=${genre}`)
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
        axios.post(`https://movie-flex-open-soft2024-backend.vercel.app//api/fuzzySearch?q=${query}`)
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
        axios.post(`https://movie-flex-open-soft2024-backend.vercel.app//api/fuzzySearch?q=${query}&g=${genre}`)
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
          <div className="flex bg-gray-900 py-4 px-4 lg:py-6 lg:px-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-gray-200 hover:text-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Back</span>
          </button>
        </div>
          <div className="flex bg-gray-900 py-4 px-4 lg:py-6 lg:px-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-200 hover:text-gray-100"
          >
            <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  class="w-5 h-5 text-inherit"
                >
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
                </svg>
            <span>Home</span>
          </button>
        </div>
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
