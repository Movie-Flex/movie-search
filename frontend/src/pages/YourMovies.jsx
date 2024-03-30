import React, { useEffect } from "react";
import { useYourMovies } from "../hooks/useYourMovies.jsx";
import { useState } from "react";
import CardProvider from "../providers/CardProvider.jsx";
import CardProviderOnHover from "../providers/YourMoviesCardProviderOnHover.jsx";
import ModalProvider from "../providers/ModalProvider.jsx";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { set } from "react-hook-form";
import DiamondFigures from "../utils/DiamondFigures.jsx";

function YourMovies() {
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const [watchLaterMovies, setWatchLaterMovies] = useState([]);
  const { fetchFavouriteMovies, fetchwatchLaterMovies } = useYourMovies();
  const [showMovies, setShowMovies] = useState(true); // Initialize showMovies to true to show both types initially
  const [modalMovie, setModalMovie] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loaderCompletepage, setLoaderCompletepage] = useState(false);

  const navigate = useNavigate();

  const handleBackToProfile = () => {
    navigate("/profile");
  };

  const handleButtonClick = () => {
    setShowMovies(!showMovies);
  };
  useEffect(() => {
    setLoaderCompletepage(true);
    const pageLoading = () => {
      try {
         fetchFavouriteMovies().then((responseFavouriteMovies) => {
         setFavouriteMovies(responseFavouriteMovies);
         });

      
         
         fetchwatchLaterMovies().then((responseWatchLaterMovies) => {
        setWatchLaterMovies(responseWatchLaterMovies);
         })
      } catch (err) {
        console.log(err);
      }
    };
    setLoaderCompletepage(false);
    pageLoading();
  }, []);

  return (
    <>
    {loaderCompletepage?(
      
      <div className="bg-[#171D21] min-h-[100vh] flex flex-col items-center justify-end">
      <DiamondFigures/>
   </div>

):(
  <>
    <div style={{ background: "black", padding: "20px" }}>
      <h1 style={{ color: "white", textAlign: "center", fontSize: "3rem" }}>
        Your Movies
      </h1>
      <button
        onClick={handleBackToProfile}
        style={{
          color: "white",
          textAlign: "center",
          fontSize: "1.2rem",
          position: "absolute",
          top: "30px",
          right: "20px",
          transition: "background-color 0.3s ease",
          borderRadius: "40px",
          padding: "8px",
          flexDirection: "row-reverse",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(211, 211, 211, 0.5)")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "")}
        >
        Back to Profile
      </button>
      <div className="mt-5">
        {showMovies && (
          <div className="w-full p-5 flex flex-col">
          <div className="text-3xl text-white font-bold">
              Favourite Movies
            </div>
            <div className="flex justify-start overflow-y-hidden overflow-x-scroll gap-5 m-3">
              {favouriteMovies &&
                favouriteMovies.length > 0 &&
                favouriteMovies.map(
                  (movie) =>
                  movie.poster && (
                    <div className="movieCard relative">
                        <div className="cardInitially">
                          <CardProvider
                            poster={movie.poster}
                            title={movie.title}
                            year={movie.year}
                            runtime={movie.runtime}
                            rating={movie.rating}
                            />
                        </div>

                        <div className="cardOnHover">
                          <CardProviderOnHover
                            movie={movie}
                            poster={movie.poster}
                            title={movie.title}
                            plot={movie.plot}
                            genres={movie.genres}
                            year={movie.year}
                            runtime={movie.runtime}
                            rating={movie.imdb.rating}
                            setModalMovie={setModalMovie}
                            setIsModalOpen={setIsModalOpen}
                            />
                        </div>
                      </div>
                    )
                    )}
            </div>

            <div className="mt-5">
              {showMovies && (
                <div className="w-full p-5 flex flex-col">
                  <div className="text-3xl text-white font-bold">
                    Watch Later Movies
                  </div>
                  <div className="flex justify-start overflow-y-hidden overflow-x-scroll gap-5 m-3">
                    {watchLaterMovies &&
                      watchLaterMovies.length > 0 &&
                      watchLaterMovies.map(
                        (movie) =>
                        movie.poster && (
                          <div className="movieCard relative">
                              <div className="cardInitially">
                                <CardProvider
                                  poster={movie.poster}
                                  title={movie.title}
                                  year={movie.year}
                                  runtime={movie.runtime}
                                  rating={movie.rating}
                                  />
                              </div>

                              <div className="cardOnHover">
                                <CardProviderOnHover
                                  movie={movie}
                                  poster={movie.poster}
                                  title={movie.title}
                                  plot={movie.plot}
                                  genres={movie.genres}
                                  year={movie.year}
                                  runtime={movie.runtime}
                                  rating={movie.imdb.rating}
                                  setModalMovie={setModalMovie}
                                  setIsModalOpen={setIsModalOpen}
                                  />
                              </div>
                            </div>
                          )
                      )}
                  </div>
                </div>
              )}
              {!favouriteMovies && (
                <div className="">
                  <ModalProvider
                    movie={modalMovie}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                  />
                </div>
              )}
            </div>
          </div>
        )}
        {!favouriteMovies && (
          <div className="">
            <ModalProvider
              movie={modalMovie}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              />
          </div>
        )}
      </div>
    </div>
    </>
  )
  
}
  </>
  )
}

export default YourMovies;
