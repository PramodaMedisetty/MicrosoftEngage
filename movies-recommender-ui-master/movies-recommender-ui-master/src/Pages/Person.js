import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getPersonCredits, getPersonDetails } from '../apis';
import LoadingSpinner from '../Components/LoadingSpinner';

export default function Person() {
  const [personDetails, setpersonDetails] = useState(null);
  const [credits, setcredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setview] = useState('movie_credits');
  const params = useParams();
  let { idAndName } = params;

  const { token } = useSelector((state) => state.userDetails);

  useEffect(() => {
    fetchPersonDetails();
  }, []);

  const fetchPersonDetails = () => {
    setLoading(true);
    getPersonDetails(idAndName.split('-')[0]).then((res) => {
      setpersonDetails(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchPersonCredits();
  }, [view]);

  const fetchPersonCredits = () => {
    getPersonCredits(idAndName.split('-')[0], view).then((res) => {
      setcredits(res.cast);
    });
  };

  let sideDetails = personDetails && [
    { title: 'Known For', content: personDetails.known_for_department },
    { title: 'Known Credits', content: personDetails.also_known_as.length },
    { title: 'Gender', content: personDetails.gender == 2 ? 'Male' : 'Female' },
    { title: 'Birthday', content: personDetails.birthday },
    { title: 'Deathday', content: personDetails.deathday },
    { title: 'Place Of Birth', content: personDetails.place_of_birth },
    {
      title: 'Also Known As',
      content: personDetails.also_known_as.map((a) => (
        <>
          {a}
          <br />
        </>
      )),
    },
  ];

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

  if (!personDetails) return;
  return (
    <div className='container view-port-wrapper position-relative'>
      <LoadingSpinner isLoading={loading}>
        <div className='row no-gutters py-3'>
          <div className='side-content'>
            <img
              width={'300px'}
              className='rounded shadow'
              src={`https://image.tmdb.org/t/p/original${personDetails.profile_path}`}
              alt=''
            />
            <div className='mt-3'>
              <p className='sub-heading'>Personal Info</p>
              {sideDetails &&
                sideDetails.map((s) => (
                  <div key={s.title}>
                    {s.content && (
                      <>
                        <p className='p-0 m-0 f600'>{s.title}</p>
                        <p className=''>{s.content}</p>
                      </>
                    )}
                  </div>
                ))}
            </div>
          </div>
          <div className='col main-content mx-3'>
            <p className='big-heading'>{personDetails.name}</p>
            <h4 className='p-0 mb-3 f600'>Biography</h4>
            <p className='small text-justify'>{personDetails.biography}</p>
            <div className='d-flex my-3'>
              <h4 className='p-0 mb-3 f600'>Acting</h4>
              <div className='btn-group btn-group-selection mx-3'>
                <button
                  className={'btn' + (view === 'tv_credits' ? ' btn-selection-active' : ' btn-selection')}
                  onClick={(e) => setview('tv_credits')}
                >
                  On TV
                </button>
                <button
                  onClick={(e) => setview('movie_credits')}
                  className={'btn' + (view === 'movie_credits' ? ' btn-selection-active' : ' btn-selection')}
                >
                  In Movies
                </button>
              </div>
            </div>
            <div className=''>
              {credits && credits.length > 0 ? (
                <div className='m-3 shadow'>
                  {credits.map((c) => (
                    <>
                      <div className='border-bottom p-2 cast-content'>
                        <span className='f600'>
                          {(c.first_air_date && c.first_air_date.split('-')[0]) ||
                            (c.release_date && c.release_date.split('-')[0]) ||
                            '----'}
                        </span>{' '}
                        &nbsp; &nbsp;
                        <Link to={`/${c.episode_count ? 'tv' : 'movie'}/${c.id}`}>{c.name || c.title}</Link> &nbsp;{' '}
                        <span className='text-muted'>
                          {' '}
                          {c.episode_count && '(' + c.episode_count + ' episodes)'} as &nbsp;
                        </span>
                        {c.character}
                      </div>
                    </>
                  ))}
                </div>
              ) : (
                <>
                  <p>No Data found!</p>
                </>
              )}
            </div>
          </div>
        </div>
      </LoadingSpinner>
    </div>
  );
}
