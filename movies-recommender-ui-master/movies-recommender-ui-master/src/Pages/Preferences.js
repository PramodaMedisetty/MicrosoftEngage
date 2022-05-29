import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactSelect from 'react-select';
import { getGenres, getLanguages, getPreferences, savePreferences } from '../apis';
import LoadingSpinner from '../Components/LoadingSpinner';
import { setItemHelper } from '../utils';

export default function Preferences() {
  const { user } = useSelector((state) => state.userDetails);
  const [languages, setLanguages] = useState([]);
  const [genres, setgenres] = useState([]);
  const [state, setState] = useState({});
  const setField = setItemHelper(state, setState);

  const [loading, setloading] = useState(false);
  useEffect(() => {
    fetchLanguages();
    fetchGenres();
    fetchUserPreferences();
  }, []);

  const fetchLanguages = () => {
    setloading(true);
    getLanguages().then((res) => {
      setLanguages(res);
      setloading(false);
    });
  };

  const fetchGenres = () => {
    setloading(true);
    getGenres().then((res) => {
      setgenres(res.genres);
      setloading(false);
    });
  };

  const fetchUserPreferences = () => {
    setloading(true);
    getPreferences(user.id).then((res) => {
      setState(res);
      setloading(false);
    });
  };

  const saveUserPreferences = () => {
    setloading(true);
    savePreferences(user.id, state).then((res) => {
      setState(res);
      alert('Updates have been successfully saved!');
      setloading(false);
    });
  };

  return (
    <div className='container view-port-wrapper'>
      <div className='mt-3'></div> <p className='sub-heading py-3'>My Preferences</p>
      <LoadingSpinner isLoading={loading}>
        <div className='row no-gutters'>
          <div className='col-6'>
            <div className='my-3'>
              <h6>Languages:</h6>
              <ReactSelect
                isMulti={true}
                closeMenuOnSelect={false}
                onChange={setField('languages')}
                options={
                  languages &&
                  languages.map((a) => ({
                    label: a.english_name,
                    iso_639_1: a.iso_639_1,
                    id: a.iso_639_1,
                    value: a.iso_639_1,
                    name: a.iso_639_1,
                  }))
                }
                value={state.languages}
              ></ReactSelect>
            </div>
            <div className='my-3'>
              <h6>Genres:</h6>
              <ReactSelect
                isMulti={true}
                closeMenuOnSelect={false}
                onChange={setField('genres')}
                value={state.genres}
                options={
                  genres &&
                  genres.map((a) => ({
                    label: a.name,
                    id: a.id,
                    value: a.id,
                    name: a.id,
                  }))
                }
              ></ReactSelect>
            </div>
            <div className='text-end'>
              <button onClick={saveUserPreferences} className='btn btn-primary'>
                Save
              </button>
            </div>
          </div>
          <div className='col'>
            <img src={require('../assets/userpreferences.svg').default} className='col-12' alt='' />
          </div>
        </div>
      </LoadingSpinner>
    </div>
  );
}
