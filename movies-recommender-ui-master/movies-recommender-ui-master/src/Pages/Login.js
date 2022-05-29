import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../apis';
import { setItemHelper } from '../utils';
import { addUser } from '../redux/actions/user';
import { useDispatch } from 'react-redux';

export default function Login() {
  const [state, setState] = useState({});
  const setField = setItemHelper(state, setState);

  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    setField('authError')('');
    login(state).then((res) => {
      if (res.success) {
        dispatch(addUser(res));
      } else {
        setField('authError')(res.message);
      }
    });
  };

  return (
    <div className='container view-port-wrapper position-relative'>
      <div className='p-4'>
        <div className='sub-heading py-3'>Login</div>
        {state.authError && <div className={'alert alert-danger'}>{state.authError}</div>}
        {['Email', 'Password'].map((a) => (
          <div key={a} className='mb-3'>
            <div className='form-group'>
              <label>{a}</label>
              <input
                onChange={(e) => setField(a.toLowerCase())(e.target.value)}
                value={state[a.toLowerCase]}
                type={a === 'Password' ? 'password' : 'text'}
                className='form-control'
              />
            </div>
          </div>
        ))}
        <div className=''>
          <button onClick={handleSubmit} className='btn btn-primary'>
            Login
          </button>
          <Link to='/' className='btn btn-outline-danger mx-3'>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
