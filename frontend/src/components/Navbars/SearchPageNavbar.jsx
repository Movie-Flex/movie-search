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
import logo from "../../assets/images/logo.png"
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserContext } from '../../context/UserContext.jsx';
import DropDownHomeMenu from '../../components/DropDownHomeMenu.jsx';
import { Checkbox, CircularProgress } from '@chakra-ui/react';

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
};

const SearchPageNavbar = () => {
    const navigate = useNavigate();

    const [genreSelected, setGenreSelected] = useState()
    const { user, isLoggedIn } = useContext(UserContext);
    const { register, handleSubmit, setValue } = useForm();
    const [currentValue, setCurrentValue] = useState('');
    const [autocompleteResults, setAutocompleteResults] = useState([]);
    const [selectedAutocompleteResultIndex, setSelectedAutocompleteResultIndex] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const userData = useContext(UserContext);
    const [movieLoading, setMovieLoading] = useState(null)
   
    const [isAdvancedSearchSelected, setIsAdvancedSearchSelected] = useState(false);
    console.log('user', user)

    const runOnCLick = async (query) =>{
        setLoading(true);
        setAutocompleteResults([]);
        //setValue('search', query);
        navigate(`/movie/${query}/${Math.floor(Math.random()*5)+1}`);
        //window.location.reload();;
        // navigate(`/searchResult?query=${query}&isAdvSearch=${isAdvancedSearchSelected}`)
        // const response = await axios.get(`http://localhost:3000/api/search?query=${query}`);
        // const response = await axios.post(`https://movie-flex-open-soft2024-backend.vercel.app//api/fuzzySearch?q=${query}`);
        // console.log(response);
        // setSearchResults(response.data);
        setLoading(false);
    }


    const runSearch = async (query) => {
        setLoading(true);
        setAutocompleteResults([]);
        setValue('search', query);
        navigate(`/searchResult?query=${query}&isAdvSearch=${isAdvancedSearchSelected}${genreSelected ? `&genre=${genreSelected}` : ''}`);
        window.location.reload();
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

        if (event.target.value === '') {
            setMovieLoading(null)
        }

        if (query) {
            setMovieLoading(true);
            const response = await axios.post(`https://movie-flex-open-soft2024-backend.vercel.app//api/autoSuggest`, {
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



    return (
        <>
            <div className="w-full flex justify-between items-center mt-2">
                <div className="">
                    <img 
                    onClick={()=>navigate('/')}
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
                                {movieLoading === false && autocompleteResults.length === 0 && (
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
          
    </>
    )
}

export default SearchPageNavbar