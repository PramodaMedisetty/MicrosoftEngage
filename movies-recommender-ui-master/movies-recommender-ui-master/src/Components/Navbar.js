import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from '../redux/actions/user';

export default function Navbar() {
  const { token, user } = useSelector((state) => state.userDetails);
  const location = useLocation();
  const dispatch = useDispatch();
  const [path, setpath] = useState('');
  useEffect(() => {
    setpath(location.pathname);
    console.log(location.pathname);
  }, [location.pathname]);

  const handleClickLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeUser());
  };

  return (
    <div className='navbar shadow'>
      <div className='container'>
        <div className='nav-logo'>
          <Link to='/'>
            <img src={require('../assets/recommender.png')} width={200} alt='' />
          </Link>
        </div>
        <div className='nav-items row no-gutters justify-content-between col'>
          <div className='col'>
            <div className='d-flex pt-2'>
              <div className='mx-3'></div>
              <Link to='/' className={'nav-link mx-2 ' + (path === '/' && 'active')}>
                Movies / TV Shows
              </Link>
              <Link to='/people' className={'nav-link mx-2 ' + (path === '/people' && 'active')}>
                People
              </Link>
            </div>
          </div>
          <div className='col'>
            {!token && (
              <div className='d-flex pt-2 justify-content-end'>
                <Link to={'/login'} className='nav-link mx-2'>
                  Login
                </Link>
                <Link to={'/pricing'} className='nav-link mx-2'>
                  Join Cinemaos
                </Link>
              </div>
            )}
            {token && (
              <div className='col'>
                <div className='d-flex pt-2 justify-content-end'>
                  <Link to={'/preferences'} className='nav-link mx-2'>
                    My Preferences
                  </Link>
                  <Link onClick={handleClickLogout} className='nav-link btn btn-outline-danger mx-2'>
                    Logout
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
