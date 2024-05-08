import React, { useState, useEffect, useContext } from 'react'
import { FaClock } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from 'swiper/modules';
import axios from 'axios';
import debounce from 'debounce';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { set, useForm } from 'react-hook-form';
import logo from "../assets/images/logo.png"
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CardProvider from '../providers/CardProvider.jsx';
import CardProviderOnHover from '../providers/CardProviderOnHover.jsx';
import ModalProvider from '../providers/ModalProvider.jsx';
import { UserContext } from '../context/UserContext.jsx';
import SubscriptionModal from '../components/Subscription/SubscriptionModal.jsx';
import DropDownHomeMenu from '../components/DropDownHomeMenu.jsx';
import { Checkbox, CircularProgress, Button } from '@chakra-ui/react';
import DiamondFigures from '../utils/DiamondFigures.jsx';

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
};

const Homee = () => {
    const navigate = useNavigate();

    const [genreSelected, setGenreSelected] = useState()
    const { user, isLoggedIn } = useContext(UserContext);
    const [isFirstTime, setIsFirstTime] = useState(JSON.parse(localStorage.getItem('isFirstTime')))

    const { register, handleSubmit, setValue } = useForm();
    const [currentValue, setCurrentValue] = useState('');
    const [autocompleteResults, setAutocompleteResults] = useState([]);
    const [selectedAutocompleteResultIndex, setSelectedAutocompleteResultIndex] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [recommendedMovies, setRecommendedMovies] = useState();
    const [loadingRecommended, setLoadingRecommended] = useState(true);
    const [modalMovie, setModalMovie] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userData = useContext(UserContext);

    const [movieLoading, setMovieLoading] = useState(null)
    const [actionMovies, setActionMovies] = useState([])
    const [horrorMovies, setHorrorMovies] = useState([])
    const [romanceMovies, setRomanceMovies] = useState([])
    const [dramaMovies, setDramaMovies] = useState([])
    const [comedyMovies, setComedyMovies] = useState([])
    const [topRatedMovie, setTopRatedMovie] = useState([])
    const [watchHistoryMovies, setWatchHistoryMovies] = useState([])
    const [isAdvancedSearchSelected, setIsAdvancedSearchSelected] = useState(false);
    const [loaderCompletepage, setLoaderCompletepage] = useState(false);
    console.log('user', user);
    //const arr = [1, 2, 3, 4, 5];

    const runOnCLick = async (query) =>{
        setLoading(true);
        setAutocompleteResults([]);
        //setValue('search', query);
        navigate(`/movie/${query}/${Math.floor(Math.random()*5)+1}`);
        setLoading(false);
    }

    

    const runSearch = async (query) => {
        
        setLoading(true);
        setAutocompleteResults([]);
        setValue('search', query);
        // navigate(`/movie/${query}`);
        navigate(`/searchResult?query=${query}&isAdvSearch=${isAdvancedSearchSelected}${genreSelected ? `&genre=${genreSelected}` : ''}`);
        setLoading(false);
    };

    const onFormSubmit = () => {
        console.log("[HEY]");
        if (selectedAutocompleteResultIndex !== null) {
            runSearch(autocompleteResults[selectedAutocompleteResultIndex].title);
        } else {
            runSearch(currentValue);
        }
    };

    const onInputChange = async (event) => {
        if (searchResults.length) {
            setSearchResults([]);
        }
        setSelectedAutocompleteResultIndex(null);
        const query = event.target.value;

        setCurrentValue(query);

        if (event.target.value == '') {
            setMovieLoading(null)
        }

        if (query) {
            setMovieLoading(true);
            const response = await axios.post(`https://movie-flex-open-soft2024-backend.vercel.app/api/autoSuggest`, {
                toSearch: genreSelected == null ? [] : [genreSelected]
            }, {
                params: {
                    q: query
                },
                headers: {
                    Authorization: `Bearer ${userData.token}`
                }
            }).then((response) => {
                console.log('response.data', response.data)
                setAutocompleteResults(response.data);
            }).catch((err) => {
                toast.error(err.message)
            }).finally(() => {
                setMovieLoading(false);
            })

        } else {
            setAutocompleteResults([]);
            setSearchResults([]);
        }
    };

    const onInputKeypress = (event) => {
        if (event.code === 'ArrowDown') {
            const current = selectedAutocompleteResultIndex === null ? -1 : selectedAutocompleteResultIndex;
            if (current === autocompleteResults.length - 1) {
                setSelectedAutocompleteResultIndex(0);
            } else {
                setSelectedAutocompleteResultIndex(current + 1);
            }
        }
        if (event.code === 'ArrowUp') {
            const current = selectedAutocompleteResultIndex === null ? autocompleteResults.length : selectedAutocompleteResultIndex;
            if (current === 0) {
                setSelectedAutocompleteResultIndex(autocompleteResults.length - 1);
            } else {
                setSelectedAutocompleteResultIndex(current - 1);
            }
        }
    };

    const handleWatchNow = (index, id) => {
        if(!userData.isLoggedIn){
            toast.error("User not logged in");
            navigate(`/login`);
            return;
        }
        setLoaderCompletepage(true);
        axios.post(`https://movie-flex-open-soft2024-backend.vercel.app/api/addToWatchHistory/${id}`, {}, {
            headers:{
                authorization : `Bearer ${userData.token}`
            }
        })
        .then((response)=>{
            console.log(response);
            setLoaderCompletepage(false);
            navigate(`/video/${index+1}`);
        })
        .catch((err)=>{
            toast.error(err.message);
            setLoaderCompletepage(false);
        })
    }

    useEffect(() => {
        setLoaderCompletepage(true);
        const getHomePageMovies = async () => 
        { axios.get("https://movie-flex-open-soft2024-backend.vercel.app/api/homeMovies")
             .then((response) => {
                 if (response.status === 200) {
                   console.log('response.data', response.data)
                     setTopRatedMovie(response.data.Top);
                     setDramaMovies(response.data.Drama);
                     setComedyMovies(response.data.Comedy);
                     setRomanceMovies(response.data.Romance);
                     setHorrorMovies(response.data.Horror);
                     setActionMovies(response.data.Action);
                 }
             })
             .catch((err) => {
                 toast.error(err.message);
             })}
 
            
 
        const getWatchHistory=async()=>{
            axios.post("https://movie-flex-open-soft2024-backend.vercel.app/api/getWatchHistory",{},
            {
                
                headers: {
                    'authorization': `Bearer ${userData.token}`
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    console.log('response.data 1', response.data)
                    setRecommendedMovies(response.data.watchHistory);
                }
            })
            .catch((err) => {
                toast.error(err.message);
            })
            .finally(() => {
                setLoadingRecommended(false)
            })
        }

        getWatchHistory();
        getHomePageMovies();

        setLoaderCompletepage(false);


    }, [])

  


    return (
        <>
       {loaderCompletepage?(
        
      <div className="bg-[#171D21] min-h-[100vh] flex flex-col items-center justify-end">
         <DiamondFigures/>
      </div>

       ):(
        <>
         <div className='bg-[#171D21] min-h-[100vh] flex flex-col justify-between'>
            <div className="w-full flex justify-between items-center mt-2">
                <div className="">
                    <img src={logo} alt="Movie Flex" className='h-14 w-auto' />
                </div>
                <div className="flex justify-start items-center flex-grow">
                    <div className="w-full flex items-center justify-center">
                        <form className=" w-full flex justify-end items-center gap-2 px-5" onSubmit={handleSubmit(onFormSubmit)}>
                            <select onChange={(e) => { setGenreSelected(e.target.value) }} defaultValue="all" name="genre" id="genre" className='bg-white p-2 px-4 rounded-full outline-none'>
                                <option className='bg-[#171D21] text-white' value="all">Select Genre</option>
                                <option className='bg-[#171D21] text-white' value="Horror">Horror</option>
                                <option className='bg-[#171D21] text-white' value="Action">Action</option>
                                <option className='bg-[#171D21] text-white' value="Romance">Romance</option>
                                <option className='bg-[#171D21] text-white' value="Comedy">Comedy</option>
                                <option className='bg-[#171D21] text-white' value="Drama">Drama</option>
                            </select>
                            <div className="relative flex-grow flex flex-col items-center justify-start">
                                <input
                                    placeholder='Search for a movie...'
                                    {...register('search')}
                                    className="py-2 px-4 rounded-full border-2 border-gray-300 outline-none w-full"
                                    onChange={debounce(onInputChange, 300)}
                                    autoComplete='off'
                                    onKeyDown={onInputKeypress}
                                />
                                {movieLoading && (
                                    <div className="absolute w-full m-auto top-11 z-[2] bg-[#fff] shadow-xl text-[#171D21] font-bold flex flex-col justify-center items-center rounded-xl gap-1">
                                        <CircularProgress isIndeterminate color='green.300' />
                                    </div>
                                )}
                                {movieLoading == false && autocompleteResults.length == 0 && (
                                    <div className="absolute w-full m-auto top-11 z-[2] bg-[#fff] shadow-xl text-[#171D21] font-bold flex flex-col justify-center items-center rounded-xl gap-1">
                                        No Movie found
                                    </div>
                                )}
                                {autocompleteResults.length >= 1 && (
                                    <div className="absolute w-full m-auto top-11 z-[2] bg-[#fff] shadow-xl text-[#171D21] font-bold flex flex-col justify-center items-center rounded-xl gap-1">
                                        {autocompleteResults.map((result, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    onClick={() => { 
                                                        console.log(result);
                                                        runOnCLick(result._id) }}
                                                    onMouseOver={() => setSelectedAutocompleteResultIndex(index)}
                                                    onMouseOut={() => setSelectedAutocompleteResultIndex(null)}
                                                    className={classNames(
                                                        selectedAutocompleteResultIndex === index && 'p-2 rounded-xl cursor-pointer'
                                                    )}
                                                >
                                                    {result.title}
                                                </div>
                                            );
                                        })}

                                    </div>
                                )}

                            </div>
                            <span className='text-white font-bolds text-xl' onClick={()=>runSearch(currentValue)}><FaSearch /></span>
                            <div className="">
                                <Checkbox
                                    className='text-white'
                                    onChange={() => { setIsAdvancedSearchSelected(prev => !prev) }}
                                >
                                    Advanced Search
                                </Checkbox>
                            </div>
                        </form>

                    </div>
                </div>
                <div className="mx-2 flex justify-center items-center p-2 bg-white rounded-xl">
                    {!isLoggedIn ? (
                        <div className="text-[#171D21] font-semibold flex justify-center items-center gap-1">
                            <span className='hover:border-b-2 hover:border-[#171D21]'><Link to="/login">Login</Link></span>
                            <span>/</span>
                            <span className='hover:border-b-2 hover:border-[#171D21]'><Link to="/signup">SignUp</Link></span>
                        </div>
                    ) : (

                        <DropDownHomeMenu />

                    )}
                </div>
            </div>
            <div className="w-full">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={5}
                    loop={true}
                    autoplay={{
                        delay: 35000,
                        disableOnInteraction: false,
                    }}
                    navigation={true}
                    modules={[Autoplay, Navigation]}
                    className="mySwiper"
                >
                    {topRatedMovie && topRatedMovie.slice(0, 5).map((movie, index) => (
                        <SwiperSlide>
                            <div className="w-full h-[500px] sm:h-[400px] pl-5 flex flex-col justify-center ">
                                <video src={`https://firebasestorage.googleapis.com/v0/b/opensoft-mflix.appspot.com/o/clip${index+1}.mp4?alt=media`} autoPlay muted playsInline className="absolute inset-0 w-full h-full object-cover">
                                </video>
                                <div className="w-full sm:w-3/4 p-10 flex flex-col justify-center items-start gap-y-3 sm:gap-y-6 relative z-10">
                                    <div className="text-[#fff] font-bold text-4xl">
                                        {movie.title}
                                    </div>
                                    <div className="text-[#fff] flex flex-col gap-3">
                                        <div className="flex gap-4">
                                            <div className="flex justify-center items-center gap-1">
                                                <span><FaClock className='text-[15px]' /></span>
                                                <span>{movie.runtime} min</span>
                                            </div>
                                            <div className="flex justify-center items-center gap-1">
                                                <span>{movie.year}</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-center items-center gap-1 text-[#fff]">
                                            {movie && movie.genres.map((genre, index) => (
                                                <span key={index} className='text-white'>{genre} /</span>
                                            ))}
                                        </div>

                                    </div>
                                    <div className="">
                                        {/* <button className="flex items-center px-4 py-2 bg-[#009846] text-[#FFFFFF] rounded-full text-lg">
                                        Watch Now
                                    </button> */}
                                        <Button onClick={()=>handleWatchNow(index, movie._id)} className="flex items-center px-4 py-2 bg-[#009846] text-[#FFFFFF] rounded-full text-lg">
                                            Watch Now
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}

                </Swiper>
            </div>

           
            <div className="mt-5">
                {!loadingRecommended && recommendedMovies && (<div className="w-full p-5 flex flex-col">
                    <div className="text-3xl text-white font-bold">Watch History</div>
                    <div className="flex justify-start overflow-y-hidden overflow-x-scroll gap-5 m-3">
                        {!loadingRecommended && recommendedMovies && recommendedMovies.map((movie) => {
                            return (
                                <div className="movieCard relative">
                                    <div className='cardInitially'>
                                        <CardProvider
                                            poster={movie.poster}
                                            title={movie.title}
                                            year={movie.year}
                                            runtime={movie.runtime}
                                            rating={movie.imdb.rating}
                                        />
                                    </div>


                                    <div className='cardOnHover'>
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
                        })}
                    </div>
                </div>)}

                {!loadingRecommended && (<div className="">
                    <ModalProvider
                        movie={modalMovie}
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                    />
                </div>)}
            </div>

            {/* Top Rated */}
            <div className="mt-5">
                {!loadingRecommended && topRatedMovie && (<div className="w-full p-5 flex flex-col">
                    <div className="text-3xl text-white font-bold">Top Rated Movies</div>
                    <div className="flex justify-start overflow-y-hidden overflow-x-scroll gap-5 m-3">
                        {!loadingRecommended && topRatedMovie && topRatedMovie.slice(4).map((movie) => {
                            return (
                                <div className="movieCard relative">
                                    <div className='cardInitially'>
                                        <CardProvider
                                            poster={movie.poster}
                                            title={movie.title}
                                            year={movie.year}
                                            runtime={movie.runtime}
                                            rating={movie.imdb.rating}
                                        />
                                    </div>


                                    <div className='cardOnHover'>
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
                        })}
                    </div>
                </div>)}

                {!loadingRecommended && (<div className="">
                    <ModalProvider
                        movie={modalMovie}
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                    />
                </div>)}
            </div>

            {topRatedMovie.length && <div className="w-[90%] bg-white rounded-full h-[1px] m-auto"></div>}


            {/* Genre 1 */}
            <div className="mt-5">
                {!loadingRecommended && (<div className="w-full p-5 flex flex-col">
                    <div className="text-3xl text-white font-bold">Horror Movies</div>
                    <div className="flex justify-start overflow-y-hidden overflow-x-scroll gap-5 m-3">
                        {!loadingRecommended && horrorMovies && horrorMovies.map((movie) => {
                            return (
                                <div className="movieCard relative">
                                    <div className='cardInitially'>
                                        <CardProvider
                                            poster={movie.poster}
                                            title={movie.title}
                                            year={movie.year}
                                            runtime={movie.runtime}
                                            rating={movie.imdb.rating}
                                        />
                                    </div>


                                    <div className='cardOnHover'>
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
                        })}
                    </div>
                </div>)}

                {!loadingRecommended && (<div className="">
                    <ModalProvider
                        movie={modalMovie}
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                    />
                </div>)}
            </div>

            {horrorMovies.length && <div className="w-[90%] bg-white rounded-full h-[1px] m-auto"></div>}

            {/* Genre 2 */}
            <div className="mt-5">
                {!loadingRecommended && (<div className="w-full p-5 flex flex-col">
                    <div className="text-3xl text-white font-bold">Action Movies</div>
                    <div className="flex justify-start overflow-y-hidden overflow-x-scroll gap-5 m-3">
                        {!loadingRecommended && actionMovies && actionMovies.map((movie) => {
                            return (
                                <div className="movieCard relative">
                                    <div className='cardInitially'>
                                        <CardProvider
                                            poster={movie.poster}
                                            title={movie.title}
                                            year={movie.year}
                                            runtime={movie.runtime}
                                            rating={movie.imdb.rating}
                                        />
                                    </div>


                                    <div className='cardOnHover'>
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
                        })}
                    </div>
                </div>)}

                {!loadingRecommended && (<div className="">
                    <ModalProvider
                        movie={modalMovie}
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                    />
                </div>)}
            </div>

            {actionMovies.length && <div className="w-[90%] bg-white rounded-full h-[1px] m-auto"></div>}

            {/* Genre 3 */}
            <div className="mt-5">
                {!loadingRecommended  && (<div className="w-full p-5 flex flex-col">
                    <div className="text-3xl text-white font-bold">Romance Movies</div>
                    <div className="flex justify-start overflow-y-hidden overflow-x-scroll gap-5 m-3">
                        {!loadingRecommended && romanceMovies && romanceMovies.map((movie) => {
                            return (
                                <div className="movieCard relative">
                                    <div className='cardInitially'>
                                        <CardProvider
                                            poster={movie.poster}
                                            title={movie.title}
                                            year={movie.year}
                                            runtime={movie.runtime}
                                            rating={movie.imdb.rating}
                                        />
                                    </div>


                                    <div className='cardOnHover'>
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
                        })}
                    </div>
                </div>)}

                {!loadingRecommended && (<div className="">
                    <ModalProvider
                        movie={modalMovie}
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                    />
                </div>)}
            </div>

            {romanceMovies.length && <div className="w-[90%] bg-white rounded-full h-[1px] m-auto"></div>}

            {/* Genre 4 */}
            <div className="mt-5">
                {!loadingRecommended  && (<div className="w-full p-5 flex flex-col">
                    <div className="text-3xl text-white font-bold">Comedy Movies</div>
                    <div className="flex justify-start overflow-y-hidden overflow-x-scroll gap-5 m-3">
                        {!loadingRecommended && comedyMovies && comedyMovies.map((movie) => {
                            return (
                                <div className="movieCard relative">
                                    <div className='cardInitially'>
                                        <CardProvider
                                            poster={movie.poster}
                                            title={movie.title}
                                            year={movie.year}
                                            runtime={movie.runtime}
                                            rating={movie.imdb.rating}
                                        />
                                    </div>


                                    <div className='cardOnHover'>
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
                        })}
                    </div>
                </div>)}

                {!loadingRecommended && (<div className="">
                    <ModalProvider
                        movie={modalMovie}
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                    />
                </div>)}
            </div>

            {comedyMovies.length && <div className="w-[90%] bg-white rounded-full h-[1px] m-auto"></div>}

            {/* Genre 5 */}
            <div className="mt-5">
                {!loadingRecommended && (<div className="w-full p-5 flex flex-col">
                    <div className="text-3xl text-white font-bold">Drama Movies</div>
                    <div className="flex justify-start overflow-y-hidden overflow-x-scroll gap-5 m-3">
                        {!loadingRecommended && dramaMovies && dramaMovies.map((movie) => {
                            return (
                                <div className="movieCard relative">
                                    <div className='cardInitially'>
                                        <CardProvider
                                            poster={movie.poster}
                                            title={movie.title}
                                            year={movie.year}
                                            runtime={movie.runtime}
                                            rating={movie.imdb.rating}
                                        />
                                    </div>


                                    <div className='cardOnHover'>
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
                        })}
                    </div>
                </div>)}

                {!loadingRecommended && (<div className="">
                    <ModalProvider
                        movie={modalMovie}
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                    />
                </div>)}
            </div>

           
        </div>
         {user&& user.role!=="admin" && user.subscription==="free" && isFirstTime&&(
            <SubscriptionModal setIsFirstTime={setIsFirstTime} isFirstTime={isFirstTime}/>
        )}
        </>
       )}
    </>
    )
}

export default Homee