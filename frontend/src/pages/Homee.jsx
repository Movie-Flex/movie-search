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
import { useForm } from 'react-hook-form';
import logo from "../assets/images/logo.png"
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CardProvider from '../providers/CardProvider.jsx';
import CardProviderOnHover from '../providers/CardProviderOnHover.jsx';
import ModalProvider from '../providers/ModalProvider.jsx';
import VideoPlayer from './VideoPlayer.jsx'
import DropDownHomeMenu from '../components/DropDownHomeMenu.jsx';
import { UserContext } from '../context/UserContext.jsx';
import { CircularProgress } from '@chakra-ui/react';
import SubscriptionModal from '../components/Subscription/SubscriptionModal.jsx';
const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
};

const Homee = () => {
    const [genreSelected, setGenreSelected] = useState() 
     const {user} =useContext(UserContext);
     const [isFirstTime, setIsFirstTime] = useState(true)

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
    console.log('user', user)


    const runSearch = async (query) => {
        setLoading(true);
        setAutocompleteResults([]);
        setValue('search', query);
        // const response = await axios.get(`http://localhost:3000/api/search?query=${query}`);
        const response = await axios.post(`http://localhost:3002/api/fuzzySearch?q=${query}`);
        console.log(response);
        setSearchResults(response.data);
        setLoading(false);
    };

    const onFormSubmit = () => {
        if (selectedAutocompleteResultIndex !== null) {
            runSearch(autocompleteResults[selectedAutocompleteResultIndex]);
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

        if(event.target.value == ''){
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
                    Authorization: `Bearer ${userData.token}`
                }
            }).then((response) => {
                console.log('response.data', response.data)
                setAutocompleteResults(response.data.map((u) => u.title));
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

   
    useEffect(() => {
        axios.post("http://localhost:3002/api/autoSuggest",
            {},
            {
                params: {
                    q: "love"
                },
                headers: {
                    Authorization: `Bearer ${userData.token}`
                }
            })
            .then((response) => {
                if (response.status == 200) {
                    console.log('response.data', response.data)
                    setRecommendedMovies(response.data);
                }
            })
            .catch((err) => {
                toast.error(err.message);
            })
            .finally(() => {
                setLoadingRecommended(false)
            })
    }, [])




    return (
           <>
            
        <div className='bg-[#171D21] min-h-[100vh] flex flex-col justify-between'>

            
                <div className="w-full flex justify-between items-center mt-2">
                <div className="">
                    <img src={logo} alt="Movie Flex" className='h-14 w-auto' />
                </div>
                <div className=" flex justify-start items-center flex-grow">
                    <div className="w-full flex items-center justify-center">
                        <form className=" w-full flex justify-end items-center gap-2 px-5" onSubmit={handleSubmit(onFormSubmit)}>
                            <select onChange={(e) => { setGenreSelected(e.target.value) }} defaultValue="all" name="genre" id="genre" className='bg-white p-2 px-4 rounded-full outline-none'>
                                <option className='bg-[#171D21] text-white' value="all">Select Genre</option>
                                <option className='bg-[#171D21] text-white' value="Horror">Horror</option>
                                <option className='bg-[#171D21] text-white' value="Action">Action</option>
                                <option className='bg-[#171D21] text-white' value="Romantic">Romantic</option>
                                <option className='bg-[#171D21] text-white' value="Comedy">Comedy</option>
                                <option className='bg-[#171D21] text-white' value="Drama">Drama</option>
                            </select>
                            <div className="relative flex-grow flex flex-col items-center justify-start">
                                <input
                                    placeholder='Search for a movie...'
                                    {...register('search')}
                                    className="py-2 px-4 rounded-full border-2 border-gray-300 outline-none"
                                    onChange={debounce(onInputChange, 300)}
                                    autoComplete='off'
                                    onKeyDown={onInputKeypress}
                                />
                                {movieLoading && (
                                    <div className="absolute w-full m-auto top-11 z-[2] bg-[#fff] shadow-xl text-[#171D21] font-bold flex flex-col justify-center items-center rounded-xl gap-1">
                                        <CircularProgress isIndeterminate color='green.300' />
                                    </div>
                                )}
                                {movieLoading==false && autocompleteResults.length == 0 && (
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
                                                    onClick={() => {runSearch(result)}}
                                                    onMouseOver={() => setSelectedAutocompleteResultIndex(index)}
                                                    onMouseOut={() => setSelectedAutocompleteResultIndex(null)}
                                                    className={classNames(
                                                        selectedAutocompleteResultIndex === index && 'p-2 rounded-xl cursor-pointer'
                                                    )}
                                                >
                                                    {result}
                                                </div>
                                            );
                                        })}

                                    </div>
                                )}
                            </div>
                            <span className='text-white font-bolds text-xl'><FaSearch /></span>
                        </form>

                    </div>
                </div>
                <div className="mx-2 flex justify-center items-center p-2 bg-white rounded-xl">
                   {!user?(
                     <div className="text-[#171D21] font-semibold flex justify-center items-center gap-1">
                     <span className='hover:border-b-2 hover:border-[#171D21]'><Link to="/login">LogIn</Link></span>
                     <span>/</span>
                     <span className='hover:border-b-2 hover:border-[#171D21]'><Link to="/signup">SignUp</Link></span>
                 </div>
                   ):(
                    
                   <DropDownHomeMenu/>
                
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
                    <SwiperSlide>
                        <div className="w-full h-[500px] sm:h-[400px] pl-5 flex flex-col justify-center ">
                            <video src="https://firebasestorage.googleapis.com/v0/b/opensoft-mflix.appspot.com/o/video1.mp4?alt=media&token=46ac4bba-0850-495d-bcff-8eea28621da5" autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
                            </video>
                            <div className="w-full sm:w-3/4 p-10 flex flex-col justify-center items-start gap-y-3 sm:gap-y-6 relative z-10">
                                <div className="text-[#fff] font-bold text-4xl">
                                    Spider-Man: Across the Spider-Verse
                                </div>
                                <div className="text-[#fff] flex gap-4">
                                    <div className="flex justify-center items-center gap-1">
                                        <span><FaClock className='text-[15px]' /></span>
                                        <span>2h 20min</span>
                                    </div>
                                    <div className="flex justify-center items-center gap-1">
                                        <span>Family/Action</span>
                                    </div>
                                    <div className="flex justify-center items-center gap-1">
                                        <span>2023</span>
                                    </div>
                                </div>
                                <div className="">
                                    {/* <button className="flex items-center px-4 py-2 bg-[#009846] text-[#FFFFFF] rounded-full text-lg">
                                        Watch Now
                                    </button> */}
                                    <Link to="/video" className="flex items-center px-4 py-2 bg-[#009846] text-[#FFFFFF] rounded-full text-lg">
                                        Watch Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="w-full h-[500px] sm:h-[400px] pl-5 flex flex-col justify-center ">
                            <video src="https://firebasestorage.googleapis.com/v0/b/opensoft-mflix.appspot.com/o/video2.mp4?alt=media&token=46ac4bba-0850-495d-bcff-8eea28621da5" autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
                            </video>
                            <div className="w-full sm:w-3/4 p-10 flex flex-col justify-center items-start gap-y-3 sm:gap-y-6 relative z-10">
                                <div className="text-[#fff] font-bold text-4xl">
                                    Spider-Man: Across the Spider-Verse
                                </div>
                                <div className="text-[#fff] flex gap-4">
                                    <div className="flex justify-center items-center gap-1">
                                        <span><FaClock className='text-[15px]' /></span>
                                        <span>2h 20min</span>
                                    </div>
                                    <div className="flex justify-center items-center gap-1">
                                        <span>Family/Action</span>
                                    </div>
                                    <div className="flex justify-center items-center gap-1">
                                        <span>2023</span>
                                    </div>
                                </div>
                                <div className="">
                                    <button className="flex items-center px-4 py-2 bg-[#009846] text-[#FFFFFF] rounded-full text-lg">
                                        Watch Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="w-full h-[500px] sm:h-[400px] pl-5 flex flex-col justify-center ">
                            <video src="https://firebasestorage.googleapis.com/v0/b/opensoft-mflix.appspot.com/o/video3.mp4?alt=media&token=46ac4bba-0850-495d-bcff-8eea28621da5" autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
                            </video>
                            <div className="w-full sm:w-3/4 p-10 flex flex-col justify-center items-start gap-y-3 sm:gap-y-6 relative z-10">
                                <div className="text-[#fff] font-bold text-4xl">
                                    Spider-Man: Across the Spider-Verse
                                </div>
                                <div className="text-[#fff] flex gap-4">
                                    <div className="flex justify-center items-center gap-1">
                                        <span><FaClock className='text-[15px]' /></span>
                                        <span>2h 20min</span>
                                    </div>
                                    <div className="flex justify-center items-center gap-1">
                                        <span>Family/Action</span>
                                    </div>
                                    <div className="flex justify-center items-center gap-1">
                                        <span>2023</span>
                                    </div>
                                </div>
                                <div className="">
                                    <button className="flex items-center px-4 py-2 bg-[#009846] text-[#FFFFFF] rounded-full text-lg">
                                        Watch Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                </Swiper>
            </div>


            <div className="mt-5">
                {!loadingRecommended && recommendedMovies && (<div className="w-full p-5 flex flex-col">
                    <div className="text-3xl text-white font-bold">Recommended Movies</div>
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

            {/* <section class="upcoming">
                <div class="container">

                    <div class="flex-wrapper">

                        <div class="title-wrapper">
                            <p class="section-subtitle">Online Streaming</p>

                            <h2 class="h2 section-title">Upcoming Movies</h2>
                        </div>

                        <ul class="filter-list">

                            <li>
                                <button class="filter-btn">Movies</button>
                            </li>

                            <li>
                                <button class="filter-btn">TV Shows</button>
                            </li>

                            <li>
                                <button class="filter-btn">Anime</button>
                            </li>

                        </ul>

                    </div>

                    <ul class="movies-list  has-scrollbar">

                        <li>
                            <div class="movie-card">

                                <a href="./movie-details.html">
                                    <figure class="card-banner">
                                        <img src="https://codewithsadee.github.io/filmlane/assets/images/upcoming-1.png" alt="The Northman movie poster" />
                                    </figure>
                                </a>

                                <div class="title-wrapper">
                                    <a href="./movie-details.html">
                                        <h3 class="card-title">The Northman</h3>
                                    </a>

                                    <time datetime="2022">2022</time>
                                </div>

                                <div class="card-meta">
                                    <div class="badge badge-outline">HD</div>

                                    <div class="duration">
                                        <ion-icon name="time-outline"></ion-icon>

                                        <time datetime="PT137M">137 min</time>
                                    </div>

                                    <div class="rating">
                                        <ion-icon name="star"></ion-icon>

                                        <data>8.5</data>
                                    </div>
                                </div>

                            </div>
                        </li>


                    </ul>

                </div>
            </section> */}
               
        </div>
        
        {user && isFirstTime&&(
                <SubscriptionModal setIsFirstTime={setIsFirstTime} isFirstTime={isFirstTime}/>
            )}
        </>
    )
}

export default Homee