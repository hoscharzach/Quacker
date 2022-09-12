import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import { nanoid } from 'nanoid';
import x from '../../images/imageclose-x.svg'
import twitterIcon from '../../images/twittericon.svg'
import duckLogo from '../../images/ducklogo.svg'


const LoginForm = ({ setShowModal }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()



  const onLogin = async (e) => {
    e.preventDefault();
    setErrors([])
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault()
    const data = await dispatch(login("demo@aa.io", "password"))
    if (data) {
      setErrors(data)
    } else {
      history.push('/home')
    }
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <div id="entire-login-form-container">
      <div id='login-form-header-container' >
        <div onClick={() => setShowModal(false)} className='login-x-icon-container'>
          <div className='login-inner-x-icon-container'>
            <img alt='' src={x} className="login-x-icon" ></img>
          </div>
        </div>
        <div className='header-icon-container'>
          <img alt='' className='login-icon' src={duckLogo} ></img>
        </div>
      </div>
      <div id='login-form-body-container' >
        <div className='login-form-body-inner-container'>
          <span className='login-form-title'>Sign in to Quacker</span>
          <div className='login-errors-container'>
            {errors.map(err => (
              <div key={nanoid()} className='error-message'>{err.split(":")[1]}</div>
            ))}
          </div>
          <form id='login-form' onSubmit={onLogin}>
            <div>
              <input
                name='email'
                type='text'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div>
              <input
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
              />
            </div>
            <button id='login-form-submit-button' type='submit'>Login</button>
          </form>
          <span style={{ color: 'lightgray', marginTop: '30px' }} >Don't have an account?<span onClick={() => setShowModal(false)} className='close-login-text'> Sign up</span></span>
        </div>
      </div>
      {/*


      </div>

      <div className='login-form-body-container'>
        <div className='login-form-body-inner-container'>

          <span className='login-form-title'>Sign in to Quacker</span>
          <div className='login-modal-errors-container'>
            {errors && errors.map(err => (
              <div key={nanoid()}><span className='error-message'>{err.split(':')[1]}</span></div>
            ))}
          </div>
          <div id='login-form-container'>


              <button onClick={demoLogin} >Demo User</button>
              <div>Don't have an account? <span onClick={() => setShowModal(false)}>Sign up here</span></div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default LoginForm;
