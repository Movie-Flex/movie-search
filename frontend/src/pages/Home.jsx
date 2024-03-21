import axios from 'axios';
import { useForm } from 'react-hook-form';
import debounce from 'debounce';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export default function Home() {
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

    if (query) {
      const response = await axios.post(`http://localhost:3002/api/autoSuggest?q=${query}`);
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

      <header className="header" data-header>
        <div className="container">

          <div className="overlay" data-overlay></div>

          <a href="./index.html" className="logo">
            <img src="https://codewithsadee.github.io/filmlane/assets/images/logo.svg" alt="Filmlane logo"/>
          </a>

          <div className="header-actions">

            <button className="search-btn">
              <ion-icon name="search-outline"></ion-icon>
            </button>

            <div className="lang-wrapper">
              <label htmlFor="language">
                <ion-icon name="globe-outline"></ion-icon>
              </label>

              <select name="language" id="language">
                <option value="en">EN</option>
                <option value="au">AU</option>
                <option value="ar">AR</option>
                <option value="tu">TU</option>
              </select>
            </div>

            <button className="btn btn-primary">Sign in</button>

          </div>

          <button className="menu-open-btn" data-menu-open-btn>
            <ion-icon name="reorder-two"></ion-icon>
          </button>

          <nav className="navbar" data-navbar>

            <div className="navbar-top">

              <a href="./index.html" className="logo">
                <img src="./assets/images/logo.svg" alt="Filmlane logo"/>
              </a>

              <button className="menu-close-btn" data-menu-close-btn>
                <ion-icon name="close-outline"></ion-icon>
              </button>

            </div>

            <ul className="navbar-list">

              <li>
                <a href="./index.html" className="navbar-link">Home</a>
              </li>

              <li>
                <a href="#" className="navbar-link">Movie</a>
              </li>

              <li>
                <a href="#" className="navbar-link">Tv Show</a>
              </li>

              <li>
                <a href="#" className="navbar-link">Web Series</a>
              </li>

              <li>
                <a href="#" className="navbar-link">Pricing</a>
              </li>

            </ul>

            <ul className="navbar-social-list">

              <li>
                <a href="#" className="navbar-social-link">
                  <ion-icon name="logo-twitter"></ion-icon>
                </a>
              </li>

              <li>
                <a href="#" className="navbar-social-link">
                  <ion-icon name="logo-facebook"></ion-icon>
                </a>
              </li>

              <li>
                <a href="#" className="navbar-social-link">
                  <ion-icon name="logo-pinterest"></ion-icon>
                </a>
              </li>

              <li>
                <a href="#" className="navbar-social-link">
                  <ion-icon name="logo-instagram"></ion-icon>
                </a>
              </li>

              <li>
                <a href="#" className="navbar-social-link">
                  <ion-icon name="logo-youtube"></ion-icon>
                </a>
              </li>

            </ul>

          </nav>

        </div>
      </header>

      <section className="hero">
        <div className="container">

          <div className="hero-content">

            <p className="hero-subtitle">Filmlane</p>

            <h1 className="h1 hero-title">
              Unlimited <strong>Movie</strong>, TVs Shows, & More.
            </h1>

            <div className="meta-wrapper">

              <div className="badge-wrapper">
                <div className="badge badge-fill">PG 18</div>

                <div className="badge badge-outline">HD</div>
              </div>

              <div className="ganre-wrapper">
                <a href="#">Romance,</a>

                <a href="#">Drama</a>
              </div>

              <div className="date-time">

                <div>
                  <ion-icon name="calendar-outline"></ion-icon>

                  <time dateTime="2022">2022</time>
                </div>

                <div>
                  <ion-icon name="time-outline"></ion-icon>

                  <time dateTime="PT128M">128 min</time>
                </div>

              </div>

            </div>

            <button className="btn btn-primary">
              <ion-icon name="play"></ion-icon>

              <span>Watch now</span>
            </button>

          </div>

        </div>
      </section>




      {/* 7045292864 */}
      {/* <div>
        <title>MongoDB Text Search</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </div> */}
      {/* <main className="flex px-24 py-12 min-h-[100vh] bg-gray-100">
        <div className="max-w-4xl mx-auto w-full flex flex-col items-center">
         
          <div className="flex justify-between items-center w-full z-10 text-sm font-mono">
            <p>
              <span className="font-bold">MongoDB</span> Text Search
            </p>
          </div>
          <div className="flex justify-between items-center w-full z-10 text-sm font-mono">
            <p>
              <Link  to="/login" className="font-bold">Login page</Link > 
            </p>
          </div>

          <div className="py-8 w-full max-w-md">
          
            <form className="pb-2" onSubmit={handleSubmit(onFormSubmit)}>
              <input
                {...register('search')}
                className="py-2 px-4 rounded-full w-full border-2 border-gray-300"
                onChange={debounce(onInputChange, 100)}
                onKeyDown={onInputKeypress}
              />
            </form>

            
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

           
            {isLoading && <div className="pt-6">Loading...</div>}

           
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
      </main> */}
    </>
  );
}
