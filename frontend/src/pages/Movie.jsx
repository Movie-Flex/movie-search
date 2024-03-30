import React, { useState, useEffect, useContext } from 'react'
import { FaClock } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from 'swiper/modules';
import axios from 'axios';
import debounce from 'debounce';
import { FaAngleDoubleRight, FaRegStar, FaStar } from 'react-icons/fa'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { set, useForm } from 'react-hook-form';
import logo from "../assets/images/logo.png"
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import CardProvider from '../providers/CardProvider.jsx';
import CardProviderOnHover from '../providers/CardProviderOnHover.jsx';
import ModalProvider from '../providers/ModalProvider.jsx';
import VideoPlayer from './VideoPlayer.jsx'
import { useLogout } from '../hooks/useLogout.jsx';
import { UserContext } from '../context/UserContext.jsx';
import SubscriptionModal from '../components/Subscription/SubscriptionModal.jsx';
import DropDownHomeMenu from '../components/DropDownHomeMenu.jsx';
import { Checkbox, CircularProgress, Button } from '@chakra-ui/react';

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
};

const Homee = () => {
   
    const navigate = useNavigate();
    const params = useParams();
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
    const [movie, setMovie] = useState({});
    const [movieLoading, setMovieLoading] = useState(null)
    const [actionMovies, setActionMovies] = useState([])
    const [horrorMovies, setHorrorMovies] = useState([])
    const [romanceMovies, setRomanceMovies] = useState([])
    const [dramaMovies, setDramaMovies] = useState([])
    const [comedyMovies, setComedyMovies] = useState([])
    const [topRatedMovie, setTopRatedMovie] = useState([])
    const [watchHistoryMovies, setWatchHistoryMovies] = useState([])
    const [isAdvancedSearchSelected, setIsAdvancedSearchSelected] = useState(false);
    const [loader, setLoader] = useState(true);
    const [noMatch, setNoMatch] = useState(false);
    const [showfav, setShowFav] = useState(false);
    const [showlater, setShowLater] = useState(false);
    const [showRated, setShowRated] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    console.log('user', user);
    //const arr = [1, 2, 3, 4, 5];

    const runOnCLick = async (query) =>{
        setLoading(true);
        setAutocompleteResults([]);
        //setValue('search', query);

        navigate(`/movie/${query}/${Math.floor(Math.random()*5)+1}`);
        window.location.reload();;
        // navigate(`/searchResult?query=${query}&isAdvSearch=${isAdvancedSearchSelected}`)
        // const response = await axios.get(`http://localhost:3000/api/search?query=${query}`);
        // const response = await axios.post(`http://localhost:3002/api/fuzzySearch?q=${query}`);
        // console.log(response);
        // setSearchResults(response.data);
        setLoading(false);
    }

    const runSearch = async (query) => {
        setLoading(true);
        setAutocompleteResults([]);
        setValue('search', query);
        //navigate(`/movie/${query}`);
        //window.location.reload();;
        navigate(`/searchResult?query=${query}&isAdvSearch=${isAdvancedSearchSelected}`)
        // const response = await axios.get(`http://localhost:3000/api/search?query=${query}`);
        // const response = await axios.post(`http://localhost:3002/api/fuzzySearch?q=${query}`);
        // console.log(response);
        // setSearchResults(response.data);
        setLoading(false);
    };

    const onFormSubmit = () => {
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
            const response = await axios.post(`http://localhost:3002/api/autoSuggest`, {
                toSearch: genreSelected == null ? [] : [genreSelected]
            }, {
                params: {
                    q: query
                },
                headers: {
                    authorization: `Bearer ${user.token}`
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

    const handleWatchNow = (index) => {
        console.log(index);
        console.log(userData);
        if (userData.isLoggedIn) {
            navigate(`/video/${index}`)
        } else {
            navigate('/login')
        }
    }


    // Get Top Rated Movies


    useEffect(() => {
        const getMovie = async () => {
            try {
                const response = await axios.post('http://localhost:3002/api/movie', {
                    id: params.id
                }, {
                    headers: {
                        authorization: `Bearer ${user.token}`
                    }
                });

                if (response.data.message) {

                    setNoMatch(true);
                    setLoader(false);
                    return;
                } else {
                    setMovie(response.data);
                }
            } catch (error) {
                console.error('Error fetching movie:', error);
                setNoMatch(true);
                setLoader(false);
            }
        };

        const getOptions = async()=>{
            
            const response = await axios.get(`http://localhost:3002/api/movieStatus/${movie._id}`);
            if(response.data.message){
                return;
            }
            if(response.data.rating!==0){
                setShowRated(true);
            }
            if(response.data.favouriteMovie){
                setShowFav(true);
            }
            if(response.data.watchLater){
                setShowLater(true);
            }
            if(userData.isLoggedIn){
                setShowOptions(true);
            }
        }
        getMovie();
        getOptions();
        setLoader(false);
    }, [params.id]);


    // useEffect(async () => {

    //     axios.get("http://localhost:3002/api/getWatchHistory", {
    //         headers: {
    //             'Authorization': `Bearer ${userData.token}`
    //         }
    //     })
    //         .then((response) => {
    //             console.log('response', response)
    //             if (response.status == 200) {
    //                 setWatchHistoryMovies(response.data);
    //             }
    //         })
    //         .catch((err) => {
    //             console.log('err', err)
    //             toast.error(err.message);
    //         })

    // }, [])

    const [userRating, setUserRating] = useState(0);

    const handleRatingSubmission = async () => {
        axios.post(`http://localhost:3002/api/rateMovie/${movie._id}/${userRating * 2}`, {}, {
            headers: {
                authorization: `Bearer ${userData.token}`
            }
        })
            .then((response) => {
                if(response.data.error){
                    toast.error(response.data.error);
                    return;
                }
            }).catch((err) => {
                toast.error(err.message);
            })
    }

    const handleAddToFavorites = () => {
        if(showfav){
            axios.delete(`http://localhost:3002/api/deleteFavouriteMovie/${movie._id}`,{
                headers:{
                    authorization: `Bearer ${userData.token}`
                }
            })
            .then((response)=>{
                if(response.data.error){
                    toast.error(response.data.error);
                    return;
                }
                toast.success(response.data.message);
                setShowFav(false);
            })
            .catch((err)=>{
                toast.error(err.message);
            })
            return;
        }
        axios.post(`http://localhost:3002/api/addFavouriteMovies/${movie._id}`, {}, {
            headers: {
                authorization: `Bearer ${userData.token}`
            }
        })
            .then((response) => {
                if(response.data.error){
                    toast.error(response.data.error);
                    return;
                }
                toast.success("Successfully added to favorites");
                setShowFav(true);
            })
            .catch((err) => {
                toast.error(err.message);
            })
    }

    const handleAddToWatchLater = () => {
        if(showlater){
            axios.delete(`http://localhost:3002/api/deleteWatchLaterMovie/${movie._id}`,{
                headers:{
                    authorization: `Bearer ${userData.token}`
                }
            })
            .then((response)=>{
                if(response.data.error){
                    toast.error(response.data.error);
                    return;
                }
                toast.success(response.data.message);
                setShowLater(false);
            })
            .catch((err)=>{
                toast.error(err.message);
            })
            return;
        }
        axios.post(`http://localhost:3002/api/addWatchLaterMovies/${movie._id}`, {}, {
            headers: {
                authorization: `Bearer ${userData.token}`
            }
        })
            .then((response) => {
                if(response.data.error){
                    toast.error(response.data.error);
                    return;
                }
                toast.success(response.data.message);
                setShowLater(true);
            })
            .catch((err) => {
                toast.error(err.message);
            })
    }

    return (
        <>
            {
                loader && (
                    <div className="flex justify-center items-center h-screen">
                        <CircularProgress isIndeterminate color="green.300" />
                    </div>
                )
            }
            {
                noMatch && (
                    <div className="flex justify-center items-center h-screen text-black font-bold text-2xl">
                        No Movie Found
                    </div>
                )
            }
            {
                !noMatch && !loader && (
                    <div className='bg-[#171D21] min-h-[100vh] flex flex-col justify-between'>
                        <div className="w-full flex justify-between items-center mt-2">
                            <div className="">
                                <img 
                                onClick={()=>navigate("/")}
                                src={logo} alt="Movie Flex" className='h-14 w-auto' />
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
                                                                onClick={() => { runOnCLick(result._id) }}
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
                                        <span className='text-white font-bolds text-xl'><FaSearch /></span>
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
                                navigation={false}
                                modules={[Autoplay, Navigation]}
                                className="mySwiper"
                            >

                                <SwiperSlide>
                                    <div className="w-full h-[700px] sm:h-[600px] pl-5 flex flex-col justify-center ">
                                        <video src={`https://firebasestorage.googleapis.com/v0/b/opensoft-mflix.appspot.com/o/clip${params.idx?params.idx:(Math.floor(Math.random()*5)+1)}.mp4?alt=media`} autoPlay muted playsInline className="absolute inset-0 w-full h-full object-cover">
                                        </video>
                                        <div className="w-full sm:w-3/4 p-10 flex flex-col justify-center items-start gap-y-3 sm:gap-y-6 relative z-10">
                                            <div className="text-[#fff] font-bold text-4xl">
                                                {movie.title ? movie.title : ''}
                                            </div>
                                            <div className="text-[#fff] flex flex-col gap-3">
                                                <div className="flex gap-4">
                                                    <div className="flex justify-center items-center gap-1">
                                                        <span><FaClock className='text-[15px]' /></span>
                                                        <span>{movie.runtime ? movie.runtime : ''} min</span>
                                                    </div>
                                                    <div className="flex justify-center items-center gap-1">
                                                        <span>{movie.year ? movie.year : ''}</span>
                                                    </div>
                                                </div>
                                                <div className="flex justify-center items-center gap-1 text-[#fff]">
                                                    {movie.genres && movie.genres.map((genre, index) => (
                                                        <span key={index} className='text-white'>{genre} /</span>
                                                    ))}
                                                </div>

                                            </div>
                                            <div className="">
                                                {/* <button className="flex items-center px-4 py-2 bg-[#009846] text-[#FFFFFF] rounded-full text-lg">
                                        Watch Now
                                    </button> */}
                                                <Button onClick={() => handleWatchNow(params.idx)} className="flex items-center px-4 py-2 bg-[#009846] text-[#FFFFFF] rounded-full text-lg">
                                                    Watch Now
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                        <div className="w-full mt-2 p-5 grid md-grid-cols-2 sm-grid-cols-1 gap-4">
                            <div className='border border-[white] rounded p-2 px-5 flex flex-col gap-4'>
                                {/* FOR RATINGS AND GENRES */}
                                <div className="flex flex-col items-start justify-center mt-5 gap-5">
                                    <div className="flex justify-center items-center gap-2 bg-[#ECC94B] p-2 px-4 rounded-3xl font-semibold">
                                        <span>Rating </span>
                                        <span><FaStar /></span>
                                        <span className='text-[#171D21]'>{movie.imdb && Math.ceil(Number(movie.imdb.rating))}</span>
                                    </div>
                                    <div className="flex justify-center items-center gap-2 ">
                                        <span className='bg-black pr-2 rounded-3xl font-semibold flex gap-1 items-center'><span className='bg-[#ECC94B] p-2 px-6 rounded-3xl font-semibold'>Genre</span><span><FaAngleDoubleRight className='text-white' /></span>  </span>
                                        <span className='flex justify-center items-center gap-2 '>
                                            {movie.genres && movie.genres.map(genre => {
                                                return <span className='bg-[#ECC94B] p-2 px-4 rounded-3xl font-semibold text-[#171D21]'>{genre}</span>
                                            })}
                                        </span>
                                    </div>

                                    <div className="flex flex-col bg-[#ECC94B] p-3 rounded-xl w-full">
                                        <div className="text-xl text-[#171D21] font-bold border-b-2 border-[#171D21]">Plot</div>
                                        <div className="font-semibold mt-2">{movie.fullplot}</div>
                                    </div>

                                    <div className="flex justify-center items-center gap-2 ">
                                        <span className='bg-black pr-2 rounded-3xl font-semibold flex gap-1 items-center'><span className='bg-[#ECC94B] p-2 px-6 rounded-3xl font-semibold'>Languages</span><span><FaAngleDoubleRight className='text-white' /></span>  </span>
                                        <span className='flex justify-center items-center gap-2 '>
                                            {movie.genres && movie.languages.map(language => {
                                                return <span className='bg-[#ECC94B] p-2 px-4 rounded-3xl font-semibold text-[#171D21]'>{language}</span>
                                            })}
                                        </span>
                                    </div>
                                    <>
                                        {
                                            showOptions && (
                                                <>
                                                    <div className="flex justify-center items-center gap-2 mt-4">
                                                        <Button onClick={() => { handleAddToFavorites() }}  >{showfav?"Delete from Favourite":"Add to Favourite"}</Button>
                                                        <Button onClick={() => { handleAddToWatchLater() }}>{showlater?"Remove Watch Later":"Watch Later"}</Button>
                                                    </div>

                                                    <div className='flex flex-col gap-2'>

                                                        <div className='text-[#ECC94B]'>Rate the movie</div>

                                                        <div className="flex justify-around items-center w-full">
                                                            <span onClick={() => { setUserRating(1) }}>{userRating >= 1 ? <FaStar className='text-[#ECC94B] text-xl mx-1' /> : <FaRegStar className='text-[#ECC94B] text-xl mx-1' />}</span>
                                                            <span onClick={() => { setUserRating(2) }}>{userRating >= 2 ? <FaStar className='text-[#ECC94B] text-xl mx-1' /> : <FaRegStar className='text-[#ECC94B] text-xl mx-1' />}</span>
                                                            <span onClick={() => { setUserRating(3) }}>{userRating >= 3 ? <FaStar className='text-[#ECC94B] text-xl mx-1' /> : <FaRegStar className='text-[#ECC94B] text-xl mx-1' />}</span>
                                                            <span onClick={() => { setUserRating(4) }}>{userRating >= 4 ? <FaStar className='text-[#ECC94B] text-xl mx-1' /> : <FaRegStar className='text-[#ECC94B] text-xl mx-1' />}</span>
                                                            <span onClick={() => { setUserRating(5) }}>{userRating >= 5 ? <FaStar className='text-[#ECC94B] text-xl mx-1' /> : <FaRegStar className='text-[#ECC94B] text-xl mx-1' />}</span>
                                                        </div>
                                                        {userRating > 0 && (
                                                            <Button onClick={() => { handleRatingSubmission() }} marginTop='10px'>
                                                                Submit
                                                            </Button>
                                                        )}
                                                    </div>
                                                </>
                                            )
                                        }

                                    </>
                                </div>
                                {/* FOR PLOT OF THE MOVIE */}

                                {/* FOR LANGUAGES */}
                            </div>
                            <div className='border border-[white] rounded p-2 px-5 flex flex-col gap-4'>
                                <div className="flex flex-col items-start justify-center mt-5 gap-3">

                                    <div className="flex flex-col bg-[#ECC94B] p-3 rounded-xl w-full">
                                        <div className="text-xl text-[#171D21] font-bold border-b-2 border-[#171D21]">Cast</div>
                                        {movie && movie.cast && movie.cast.map((actor => (
                                            <div className="font-semibold mt-2">{actor}</div>
                                        )))}
                                    </div>

                                    <div className="flex flex-col bg-[#ECC94B] p-3 rounded-xl w-full">
                                        <div className="text-xl text-[#171D21] font-bold border-b-2 border-[#171D21]">Directors</div>
                                        {movie && movie.directors && movie.directors.map((actor => (
                                            <div className="font-semibold mt-2">{actor}</div>
                                        )))}
                                    </div>

                                    <div className="flex flex-col bg-[#ECC94B] p-3 rounded-xl w-full">
                                        <div className="text-xl text-[#171D21] font-bold border-b-2 border-[#171D21]">Writers</div>
                                        {movie && movie.writers && movie.writers.map((actor => (
                                            <div className="font-semibold mt-2">{actor}</div>
                                        )))}
                                    </div>

                                </div>
                            </div>
                        </div>


                    </div>
                )
            }

        </>
    )
}

export default Homee