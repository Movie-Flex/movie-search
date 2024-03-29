import MovieCard from "./MovieCard";

export default function FuzzySearch({ searchResult }) {
    return(
        <div class="min-h-screen grid place-items-center font-mono bg-gray-900">
        
            <h1 class="text-3xl text-center text-white">Fuzzy Search</h1>
           {
            (searchResult && searchResult.length >0 ) ? (
              <div class="grid grid-cols-1 gap-4 mt-4">
              {searchResult.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
              ))}
              </div>
            ) :
            (
              <h1 class="text-3xl text-center text-white">No results found</h1>
            )
           }
        </div>
    )
}