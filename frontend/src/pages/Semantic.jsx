import axios from 'axios';
import { useForm } from 'react-hook-form';
import debounce from 'debounce';
import {  useState } from 'react';

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export default function Semantic() {
  const { register, handleSubmit, setValue } = useForm();
  const [currentValue, setCurrentValue] = useState('');
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [selectedAutocompleteResultIndex, setSelectedAutocompleteResultIndex] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const runSearch = async (query) => {
    setLoading(true);
    setAutocompleteResults([]);
    setValue('search', query);
    const response = await axios.post(`https://movie-flex-open-soft2024-backend.vercel.app/api/semantic?q=${query}`);
    // const response = await axios.post(`https://movie-flex-open-soft2024-backend.vercel.app/api/fuzzySearch?q=${query}`);
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

    if (query) {
      const response = await axios.post(`https://movie-flex-open-soft2024-backend.vercel.app/api/autoSuggest?q=${query}`);
      // const response = await axios.get(`http://localhost:3000/api/autocomplete?query=${query}`);
      setAutocompleteResults(response.data.map((u) => u.title));
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
      <div>
        <title>Semantic MongoDB Text Search</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </div>
      <main className="flex px-24 py-12 min-h-[100vh] bg-gray-100">
        <div className="max-w-4xl mx-auto w-full flex flex-col items-center">
          {/* Header */}
          <div className="flex justify-between items-center w-full z-10 text-sm font-mono">
            <p>
              <span className="font-bold">MongoDB</span> Text Search
            </p>
          </div>

          <div className="py-8 w-full max-w-md">
            {/* Input field */}
            <form className="pb-2" onSubmit={handleSubmit(onFormSubmit)}>
              <input
                {...register('search')}
                className="py-2 px-4 rounded-full w-full border-2 border-gray-300"
                onChange={debounce(onInputChange, 100)}
                onKeyDown={onInputKeypress}
              />
            </form>

            {/* Autocomplete suggestions */}
            {autocompleteResults.length >= 1 && (
              <div className="bg-white rounded-md border border-gray-300">
                {autocompleteResults.map((result, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => runSearch(result)}
                      onMouseOver={() => setSelectedAutocompleteResultIndex(index)}
                      onMouseOut={() => setSelectedAutocompleteResultIndex(null)}
                      className={classNames(
                        selectedAutocompleteResultIndex === index && 'bg-gray-100',
                        'px-4 py-2 border-b border-gray-100 cursor-pointer'
                      )}
                    >
                      {result}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Loading indicator */}
            {isLoading && <div className="pt-6">Loading...</div>}

            {/* Search results */}
            <div className="space-y-4 pt-6">
              {searchResults.map((result, index) => {
                return (
                  <div key={index} className="flex items-center space-x-4">
                    <img src={result.poster} alt="avatar" className="w-16 rounded-full"></img>
                    <div>
                      <p className="font-bold">{result.title}</p>
                      <p className="font-mono text-sm">{result.plot}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
