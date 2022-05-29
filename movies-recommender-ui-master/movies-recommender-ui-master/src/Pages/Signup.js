import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { setItemHelper } from '../utils';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/actions/user';
import { register } from '../apis';
import Forminput from '../Components/Forminput';
import { faCreditCard, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import razorIMG from '../assets/razorpay.svg';

export default function Signup() {
  const [state, setState] = useState({});
  const setField = setItemHelper(state, setState);
  const [view, setView] = useState(0);
  const dispatch = useDispatch();
  const params = useParams();
  const handleSubmit = (event) => {
    event.preventDefault();
    setField('authError')('');
    register({ ...state, subscriptionName: params.subscriptionName }).then((res) => {
      if (res.success) {
        dispatch(addUser(res));
      } else {
        setView(0);
        setField('authError')(res.message);
      }
    });
  };

  return (
    <div className='container view-port-wrapper position-relative'>
      {view === 1 && (
        <>
          <div className='row no-gutters'>
            <div className='col'>
              <img src={razorIMG} width={400} alt='' />
            </div>
            <div className='col text-end'>
              <h3 className='pt-3 clr-gold'>Checkout | Confirmation</h3>
            </div>
          </div>
          <div className='my-3'></div>
          <div className='row no-gutters'>
            <h3 className='clr-grey'>Check out</h3>
            <div className='col clr-grey'>
              <div className='col-12 border-grey'>
                <h4>Personal Details</h4>
              </div>
              <div className='my-3'></div>
              <div className='row no-gutters'>
                <div className='col text-dark'>
                  <p className='m-0'>First Name</p>
                  <Forminput />
                </div>
                <div className='col text-dark'>
                  <p className='m-0'>Last Name</p>
                  <Forminput />
                </div>
              </div>
              <div className='col-8 text-dark'>
                <p className='m-0'>Email Address</p>
                <Forminput />
              </div>
              <div className='my-3'></div>
              <div className='col-12 text-dark border-grey'>
                <h5>Payment Method</h5>
              </div>
              <div className='my-3'></div>
              <div className='col text-dark'>
                <p className='m-0'>Wallet Payment</p>
                <div class='form-check form-check-inline'>
                  <input
                    class='form-check-input'
                    type='radio'
                    name='inlineRadioOptions'
                    id='inlineRadio1'
                    value='option1'
                  />
                  <label class='form-check-label' for='inlineRadio1'>
                    Google Pay
                  </label>
                </div>
                <div class='form-check form-check-inline'>
                  <input
                    class='form-check-input'
                    type='radio'
                    name='inlineRadioOptions'
                    id='inlineRadio2'
                    value='option2'
                  />
                  <label class='form-check-label' for='inlineRadio2'>
                    PayPal
                  </label>
                </div>
                <div className='my-3'></div>
                <p className='clr-grey'> Payment with cards</p>
                <div className='col-6 bg-gold p-1'>
                  <h4 className='text-dark'>Debit Card / Credit Card</h4>
                  <p className='clr-grey small m-0'>
                    You are choosing card payment option. Please fill the details of our card.
                  </p>
                </div>
              </div>
            </div>
            <div className='col clr-grey'>
              <div className='col-12 border-grey'>
                <h4>Card Details</h4>
              </div>
              <div className='my-3'></div>
              <div className='col-12 text-dark'>
                <p className='m-0'>Name on Card</p>
                <Forminput />
              </div>
              <div className='col-12 text-dark'>
                <p className='m-0'>Card Number</p>
                <Forminput icon={faCreditCard} />
              </div>
              <div className='row no-gutters'>
                <div className='col text-dark'>
                  <p className='m-0'>Valid Through (MM/YY)</p>
                  <Forminput />
                </div>
                <div className='col text-dark'>
                  <p className='m-0'>CVV 3 Digits</p>
                  <Forminput icon={faInfoCircle} />
                </div>
              </div>
              <div className='my-3'></div>
              <div className='row'>
                <div className='col text-center'>
                  <Link to={'/'} className='btn btn-outline-danger'>
                    Cancel
                  </Link>
                </div>
                <div className='col text-center'>
                  <div onClick={handleSubmit} className='btn btn-primary'>
                    Checkout
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {view === 0 && (
        <div className='p-4'>
          <div className='sub-heading py-3'>Sign up for an account</div>
          {(state.authError || state.success) && (
            <div className={'alert ' + (state.authError ? 'alert-danger' : 'alert-success')}>
              {state.authError || state.success}
            </div>
          )}
          {['Name', 'Email', 'Password'].map((a) => (
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
            <button onClick={(e) => setView(1)} className='btn btn-primary'>
              Signup
            </button>
            <Link to='/' className='btn btn-outline-danger mx-3'>
              Cancel
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
