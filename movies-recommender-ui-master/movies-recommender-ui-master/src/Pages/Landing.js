import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { discoverBasedOnPreferences, getPopular, getTrending } from '../apis';
import Contentcard from '../Components/Contentcard';
import LoadingSpinner from '../Components/LoadingSpinner';

export default function Landing({ languages, genres }) {
  const history = useHistory();
  const [query, setQuery] = useState('');
  const params = new URLSearchParams();
  const getURI = () => {
    params.append('query', query);
    return params.toString();
  };
  return (
    <>
      <div className='container view-port-wrapper position-relative'>
        <div className='landing-banner d-block shadow overflow-hidden'>
          <div className='wrapper overflow-hidden'>
            <div className='p-5'>
              <h1 className='font-weight-bold'>Welcome.</h1>
              <h3>Millions of movies, TV shows and people to discover. Explore now.</h3>
              <div className='input-group my-5'>
                <input
                  type='text'
                  onChange={(e) => setQuery(e.target.value)}
                  className='form-control search-input'
                  placeholder='Search for a movie, tv show, person...'
                />
                <button
                  onClick={(e) => history.push(`/search/movie?${getURI()}`)}
                  className='btn btn-search'
                  type='button'
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <img src={'https://random.imagecdn.app/1296/300'} alt='' />
        </div>
        <WhatsPopular />
        <div className='border-bottom my-3'></div>
        {languages && languages.length === 0 && <WhatsTrending />}
        {!languages && <WhatsTrending />}
        {languages &&
          languages.map((l) => (
            <>
              <div className='border-bottom" my-3'></div>
              <LanguagePopular key={l.id} language={l} />
            </>
          ))}
        <div className='border-bottom my-3'></div>
        {genres && genres.length > 0 && genres.map((genre) => <Discover key={genre.id} genre={genre} />)}
      </div>
    </>
  );
}

const WhatsPopular = ({}) => {
  const [popular, setpopular] = useState([]);
  const [loading, setloading] = useState(false);
  const [view, setview] = useState('movie');
  useEffect(() => {
    fetchPopular();
  }, [view]);

  const fetchPopular = () => {
    setloading(true);
    getPopular(view).then((res) => {
      setpopular(res.results);
      setloading(false);
    });
  };

  return (
    <>
      <div className='d-flex my-3'>
        <h3>What's Popular</h3>
        <div className='btn-group btn-group-selection mx-3'>
          <button
            className={'btn' + (view === 'tv' ? ' btn-selection-active' : ' btn-selection')}
            onClick={(e) => setview('tv')}
          >
            On TV
          </button>
          <button
            onClick={(e) => setview('movie')}
            className={'btn' + (view === 'movie' ? ' btn-selection-active' : ' btn-selection')}
          >
            In Theatres
          </button>
        </div>
      </div>
      <div className='d-flex flex-cards-container'>
        <LoadingSpinner isLoading={loading}>
          {popular &&
            popular.map((p) => (
              <div className='col m-2'>
                <Contentcard key={p.id} content={p} />
              </div>
            ))}
        </LoadingSpinner>
      </div>
    </>
  );
};

const WhatsTrending = ({}) => {
  const [popular, setpopular] = useState([]);
  const [loading, setloading] = useState(false);
  const [view, setview] = useState('day');
  useEffect(() => {
    fetchTrending();
  }, [view]);

  const fetchTrending = () => {
    setloading(true);
    getTrending(view).then((res) => {
      setpopular(res.results);
      setloading(false);
    });
  };

  return (
    <>
      <div className='d-flex my-3'>
        <h3>Trending</h3>
        <div className='btn-group btn-group-selection mx-3'>
          <button
            className={'btn' + (view === 'day' ? ' btn-selection-active' : ' btn-selection')}
            onClick={(e) => setview('day')}
          >
            Today
          </button>
          <button
            onClick={(e) => setview('week')}
            className={'btn' + (view === 'week' ? ' btn-selection-active' : ' btn-selection')}
          >
            This Week
          </button>
        </div>
      </div>
      <div className='d-flex fadeIn flex-cards-container'>
        <LoadingSpinner isLoading={loading}>
          {popular &&
            popular.map((p) => (
              <div className='col m-2'>
                <Contentcard key={p.id} content={p} />
              </div>
            ))}
        </LoadingSpinner>
      </div>
    </>
  );
};

const LanguagePopular = ({ language }) => {
  const [popular, setpopular] = useState([]);
  const [loading, setloading] = useState(false);
  const [view, setview] = useState('day');
  useEffect(() => {
    fetchTrending();
  }, [view]);

  const fetchTrending = () => {
    setloading(true);
    getTrending(view, language.iso_639_1).then((res) => {
      setpopular(res.results);
      setloading(false);
    });
  };

  return (
    <>
      <div className='d-flex my-3'>
        <h3>Popular in {language.label}</h3>
        <div className='btn-group btn-group-selection mx-3'>
          <button
            className={'btn' + (view === 'day' ? ' btn-selection-active' : ' btn-selection')}
            onClick={(e) => setview('day')}
          >
            Today
          </button>
          <button
            onClick={(e) => setview('week')}
            className={'btn' + (view === 'week' ? ' btn-selection-active' : ' btn-selection')}
          >
            This Week
          </button>
        </div>
      </div>
      <div className='d-flex fadeIn flex-cards-container'>
        <LoadingSpinner isLoading={loading}>
          {popular &&
            popular.map((p) => (
              <div className='col m-2'>
                <Contentcard key={p.id} content={p} />
              </div>
            ))}
        </LoadingSpinner>
      </div>
    </>
  );
};

const Discover = ({ genre }) => {
  const [popular, setpopular] = useState([]);
  const [loading, setloading] = useState(false);
  const [view, setview] = useState('day');
  useEffect(() => {
    fetchTrending();
  }, [view]);

  const fetchTrending = () => {
    setloading(true);
    discoverBasedOnPreferences(genre.id).then((res) => {
      setpopular(res.results);
      setloading(false);
    });
  };

  return (
    <>
      <div className='d-flex my-3'>
        <h3>{genre.label} Movies</h3>
      </div>
      <div className='d-flex fadeIn flex-cards-container'>
        <LoadingSpinner isLoading={loading}>
          {popular &&
            popular.map((p) => (
              <div className='col m-2'>
                <Contentcard key={p.id} content={p} />
              </div>
            ))}
        </LoadingSpinner>
      </div>
      <div className='border-bottom my-3'></div>
    </>
  );
};
