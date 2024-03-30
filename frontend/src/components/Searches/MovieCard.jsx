import { useNavigate } from "react-router-dom";

const generateRandomNumber = () => { 
  return Math.floor(Math.random() * 5) + 1;
 }

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  return (
    
      <div class=" rounded-md bg-gray-800 shadow-lg">
        <div class="md:flex px-4 leading-none max-w-4xl">
          <div class="flex-none ">
            <img
              src={movie.poster? movie.poster : "https://m.media-amazon.com/images/M/MV5BZWNkYmZiNWMtNDNjMS00ZWYzLWE4NDItOTc4MmE2ZjQ1ODgwL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SY1000_SX677_AL_.jpg"}
              alt="pic"
              class="h-72 w-56 rounded-md shadow-2xl transform -translate-y-4 border-4 border-gray-300 "
            />
          </div>

          <div class="flex-col text-gray-300">
            <p class="pt-4 text-2xl font-bold cursor-pointer hover:text-blue-500"
            onClick={()=>
              {
              var random_number = generateRandomNumber();
              navigate("/movie/"+movie._id+"/"+random_number)
              }
          }

            >{movie.title} ({movie.year})</p>

            <hr class="hr-text" data-content="" />
            <div class="text-md flex justify-between px-4 my-2">
              <span class="font-bold">{movie.runtime} mins | 
                {movie && movie.genres &&movie.genres.length>0 &&movie.genres.map((genre, index) => {
                    return (
                    <span key={index} className="text-gray-400">
                        {genre}
                        {index < movie.genres.length - 1 ? ", " : ""}
                    </span>
                    )
                })
            }
               </span>
              <span class="font-bold"></span>
            </div>
            <p class="hidden md:block px-4 my-4 text-sm text-left">
             {movie.plot}
            </p>

            <p class="flex text-md px-4 my-2">
              Imdb Rating: {movie.imdb.rating} | Votes: {movie.imdb.votes} | Mflix Comments: {movie.num_mflix_comments}
            </p>

            <div class="text-xs">
                <p class="px-4 my-2">
                    <span class="font-bold">Directors: </span>
                    {movie && movie.directors &&movie.directors.length>0 && movie.directors.map((director, index) => {
                        return (
                        <span key={index} className="text-gray-400">
                            {director}
                            {index < movie.directors.length - 1 ? ", " : ""}
                        </span>
                        )
                    })
                }
                </p>
                <p class="px-4 my-2">
                    <span class="font-bold">Writers: </span>
                    {movie && movie.writers &&movie.writers.length>0 && movie.writers.map((writer, index) => {
                        return (
                        <span key={index} className="text-gray-400">
                            {writer}
                            {index < movie.writers.length - 1 ? ", " : ""}
                        </span>
                        )
                    })
                }
                </p>
                <p class="px-4 my-2">
                    <span class="font-bold">Cast: </span>
                    {movie && movie.cast && movie.cast.length>0 && movie.cast.map((cast, index) => {
                        return (
                        <span key={index} className="text-gray-400">
                            {cast}
                            {index < movie.cast.length - 1 ? ", " : ""}
                        </span>
                        )
                    })
                }
                </p>
            </div>
          </div>
        </div>
        <div class="flex justify-between items-center px-4 mb-4 w-full">
          <div class="flex">
            <i class="material-icons mr-2 text-red-600">favorite_border</i>
            <i class="material-icons text-blue-600">remove_red_eye</i>
          </div>
          <div class="flex">
            <i class="material-icons ml-2 text-yellow-600">
              sentiment_very_satisfied
            </i>
            <i class="material-icons ml-2 text-yellow-600">sentiment_neutral</i>
            <i class="material-icons ml-2 text-yellow-600">
              sentiment_very_dissatisfied
            </i>
            <i class="material-icons ml-2 text-yellow-600">star_outline</i>
            <i class="material-icons ml-2 text-yellow-600">star_half</i>
            <i class="material-icons ml-2 text-yellow-600">star</i>
          </div>
        </div>
      </div>
    
  );
}
