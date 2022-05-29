import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
  getSimilarTV,
  getTvCredits,
  getTvDetails,
  getTvProviders,
} from '../apis';
import Contentcard from '../Components/Contentcard';
import LoadingSpinner from '../Components/LoadingSpinner';
import PeopleCard from '../Components/PeopleCard';
import RatingBar from '../Components/RatingBar';

export default function Movie() {
  const [movieDetails, setmovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cast, setcast] = useState([]);
  const [providers, setproviders] = useState([]);
  const [similar, setsimilar] = useState([]);
  const params = useParams();
  let { tvId } = params;
  const { token } = useSelector((state) => state.userDetails);

  useEffect(() => {
    fetchmovieDetails();
    fetchcastDetails();
    fetchprovidersDetails();
    fetchsimilartv();
  }, [tvId]);

  const fetchmovieDetails = () => {
    setLoading(true);
    getTvDetails(tvId).then((res) => {
      setmovieDetails(res);
      setLoading(false);
    });
  };

  const fetchcastDetails = () => {
    setLoading(true);
    getTvCredits(tvId).then((res) => {
      setcast(res.cast);
      setLoading(false);
    });
  };

  const fetchprovidersDetails = () => {
    setLoading(true);
    getTvProviders(tvId).then((res) => {
      setproviders(res.results.IN ? res.results.IN.flatrate : []);
      setLoading(false);
    });
  };

  const fetchsimilartv = () => {
    setLoading(true);
    getSimilarTV(tvId).then((res) => {
      setsimilar(res.results);
      setLoading(false);
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

  if (!movieDetails) return;

  return (
    <div className='container view-port-wrapper'>
      <LoadingSpinner isLoading={loading}>
        <div className='tvmovie-banner d-block shadow overflow-hidden'>
          <div className='wrapper-tvmovie overflow-hidden'>
            <div className='d-flex'>
              <img
                height={'350px'}
                style={{ borderRadius: '30px' }}
                className='shadow m-auto mt-3'
                src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}
                alt=''
              />
              <div className='col-9 text-start pt-3'>
                <div className='movie-tv-heading  ls-2 text-light'>
                  {movieDetails.title || movieDetails.name}
                  <span className='text-muted small mx-2'>
                    ({(movieDetails.release_date || movieDetails.first_air_date).split('-')[0]})
                  </span>
                </div>
                <div className='p-0 m-0 small d-flex'>
                  {moment(movieDetails.first_air_date || movieDetails.first_air_date, 'YYYY-MM-DD').format(
                    'DD/MM/YYYY'
                  )}
                  <ul>
                    {movieDetails.genres && movieDetails.genres.length > 0 && (
                      <li className='genres'>
                        {movieDetails.genres.map((a, i) => (
                          <Link>{i === movieDetails.genres.length - 1 ? a.name : `${a.name}, `}</Link>
                        ))}
                      </li>
                    )}
                  </ul>
                  {movieDetails.runtime && (
                    <ul>
                      <li>{movieDetails.runtime && <li className='genres'>{movieDetails.runtime} mins</li>}</li>
                    </ul>
                  )}
                </div>
                <div className='my-2 d-flex'>
                  <RatingBar percentage={movieDetails.vote_average * 10} />
                  <h5 className='pt-2 mx-2'>Rating</h5>
                </div>
                <div className='my-2'>
                  <cite title='Source Title'>{movieDetails.tagline}</cite>
                </div>
                <div className='overview-content'>
                  <p className='p-0 m-0 mb-2'>Overview:</p>
                  <p className='f12 mx-1'> {movieDetails.overview}</p>
                </div>
                {providers && providers.length > 0 && (
                  <div className='my-2 stream-content'>
                    <p className='p-0 m-0 mb-2'>Streaming on:</p>
                    <p className='f12 mx-1'>
                      {providers &&
                        providers.map((p) => (
                          <img width={'40px'} src={`https://image.tmdb.org/t/p/original/${p.logo_path}`} alt='' />
                        ))}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <img width={1296} src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`} alt='' />
        </div>
        <div className=''>
          <h3 className='mt-3'>Cast</h3>
        </div>
        <div className='d-flex flex-cards-container-3 border-bottom'>
          <LoadingSpinner isLoading={loading}>
            {cast &&
              cast.map((p) => (
                <div className='col m-2'>
                  <PeopleCard key={p.id} content={p} small={true} />
                </div>
              ))}
          </LoadingSpinner>
        </div>
        <div className='d-flex my-3'>
          <h3>Similar On TV</h3>
        </div>
        <div className='d-flex fadeIn flex-cards-container'>
          <LoadingSpinner isLoading={loading}>
            {similar &&
              similar.map((p) => (
                <div className='col m-2'>
                  <Contentcard key={p.id} content={p} />
                </div>
              ))}
          </LoadingSpinner>
        </div>
      </LoadingSpinner>
    </div>
  );
}
