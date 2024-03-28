import { Skeleton } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

const SearchResult = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const query = queryParams.get('query');
    const isAdvSearch = queryParams.get('isAdvSearch');

    const [searchResult, setSearchResult] = useState([])
    

    const getSearchResults = async() => {
        console.log('query, isAdvSearch', query, isAdvSearch)
        if (isAdvSearch=='true') {
            console.log('fhsihldiuh')
        }
        else if(isAdvSearch=='false') {
            axios.post(`http://localhost:3002/api/fuzzySearch?q=${query}`)
                .then((response) => {
                    console.log('response', response)
                })
                .catch((err) => {
                    console.log('err', err.message)
                    toast.error(err.message)
                })
        }
    }

    useEffect(() => {
        console.log('doifhsihfdsif')
        getSearchResults();
    }, [])

    return (
        <Skeleton>

        </Skeleton>
    )
}

export default SearchResult