import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import * as qs from 'query-string';
import { Link } from 'react-router-dom';
import Pager from '../Components/Pager';
import { searchMovies, searchPeople } from '../apis';
import LoadingSpinner from '../Components/LoadingSpinner';
import PeopleCard from '../Components/PeopleCard';
import Contentcard from '../Components/Contentcard';
import { useSelector } from 'react-redux';

export default function SearchResult() {
  const params = useParams();
  const location = useLocation();
  const { currentView } = params;
  const { query } = qs.parse(location.search);
  const [page, setpage] = useState(1);
  const [totalPages, settotalPages] = useState(1);
  const [loading, setloading] = useState(false);
  const { token } = useSelector((state) => state.userDetails);

  const [results, setresults] = useState([]);

  useEffect(() => {
    setpage(1);
    settotalPages(1);
    fetchData(1);
  }, [currentView]);

  const fetchData = (currentPage) => {
    setpage(currentPage);
    if (currentView === 'movie') {
      fetchMovies(currentPage);
    } else if (currentView === 'tv') {
      fetchTV(currentPage);
    } else {
      fetchPeople(currentPage);
    }
  };

  const fetchMovies = (currentPage) => {
    setloading(true);
    searchMovies(currentPage, query).then((res) => {
      setresults(res.results);
      settotalPages(res.total_pages);
      setloading(false);
    });
  };

  const fetchTV = (currentPage) => {
    setloading(true);
    searchMovies(currentPage, query).then((res) => {
      setresults(res.results);
      settotalPages(res.total_pages);
      setloading(false);
    });
  };

  const fetchPeople = (currentPage) => {
    setloading(true);
    searchPeople(currentPage, query).then((res) => {
      setresults(res.results);
      settotalPages(res.total_pages);
      setloading(false);
    });
  };

  if (!token)
    return (
      <div className='container view-port-wrapper'>
        <div className='py-5'></div>
        <div className='card my-3 p-2 text-center'>
          <div className='d-flex justify-content-center'>
            Please &nbsp; <Link to='/pricing'>Login</Link>&nbsp; to see the detailed view.!
          </div>
        </div>
      </div>
    );

  return (
    <div className='container view-port-wrapper position-relative'>
      <div className='row no-gutters py-4'>
        <div className='col-2'>
          <div className='card'>
            <div className='card-header text-center bg-primary text-light'>
              <h5>Search Results</h5>
            </div>
            <div className='card-body'>
              <div className='border-bottom'>
                <div className='row no-gutters'>
                  <a href={`/search/movie/${location.search}`} className='col'>
                    Movies
                  </a>
                </div>
              </div>
              <div className='border-bottom'>
                <div className='row no-gutters'>
                  <a href={`/search/tv/${location.search}`} className='col'>
                    TV Shows
                  </a>
                </div>
              </div>
              <div className='border-bottom'>
                <div className='row no-gutters'>
                  <a href={`/search/people/${location.search}`} className='col'>
                    People
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col'>
          <LoadingSpinner isLoading={loading}>
            {currentView === 'people' && (
              <>
                <p className='sub-heading py-3'>People</p>
                <div className='row no-gutters fadeIn'>
                  {results &&
                    results.length > 0 &&
                    results.map((p) => (
                      <div className='col m-2'>
                        <PeopleCard key={p.id} content={p} small={true} />
                      </div>
                    ))}
                </div>
              </>
            )}
            {currentView === 'movie' && (
              <>
                <p className='sub-heading py-3'>Movies</p>
                <div className='row no-gutters fadeIn'>
                  {results &&
                    results.length > 0 &&
                    results.map((p) => (
                      <div className='col m-2'>
                        <Contentcard key={p.id} content={p} small={true} />
                      </div>
                    ))}
                </div>
              </>
            )}
            {currentView === 'tv' && (
              <>
                <p className='sub-heading py-3'>TV Shows</p>
                <div className='row no-gutters fadeIn'>
                  {results &&
                    results.length > 0 &&
                    results.map((p) => (
                      <div className='col m-2'>
                        <Contentcard key={p.id} content={p} small={true} />
                      </div>
                    ))}
                </div>
              </>
            )}
          </LoadingSpinner>
        </div>
      </div>
      <div className='d-flex justify-content-center my-3'>
        <Pager pager={{ totalPages, currentPage: page }} onClick={fetchData} />
      </div>
    </div>
  );
}
