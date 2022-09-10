import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect, useHistory } from 'react-router-dom';
import { login, signUp } from '../../store/session';
import './signupform.css'
import twitterIcon from '../../images/bigtwittericon.svg'
import smallTwitterIcon from '../../images/twittericon.svg'
import { demoLogin } from './LoginForm'


const SignUpForm = () => {

  // const history = useHistory()
  const demoLogin = async (e) => {
    e.preventDefault()
    const data = await dispatch(login("demo@aa.io", "password"))
    if (data) {
      setErrors(data)
    } else {
      // history.push('/home')
    }
  }

  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [displayname, setDisplayname] = useState('')
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, displayname));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors([' error: Passwords must match.'], ...errors)
    }
  };

  console.log(errors)
  const updateDisplayname = (e) => {
    setDisplayname(e.target.value);
  };
  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' ></Redirect>;
  }

  return (
    <>
      <div id='splash-page-body'>

        <div id='splash-image-container'>
          <img id='splash-image-icon' src={twitterIcon} alt="" ></img>
        </div>
        <div className='splash-right-div'>
          <div className='inner-form-container'>
            <img src={smallTwitterIcon} className='twitter-right-side-icon'></img>
            <div className='splash-big-text-container'>
              <span className='splash-big-text'>Quackening Now</span>
            </div>
            <span className='splash-small-text'>Join Quacker Today.</span>

            <form id='signup-form' onSubmit={onSignUp}>
              <div className='signup-form-error-container'>
                {errors.map((error, ind) => (
                  <div className='error-message' key={ind}>{error.split(':')[1]}</div>
                ))}
              </div>
              <div className='signup-form-container'>
                <div className='signup-form-input-div'>

                  <span>User Name</span>
                  <input
                    placeholder='Username'
                    type='text'
                    name='username'
                    onChange={updateUsername}
                    value={username}
                  ></input>
                </div>
                <div className='signup-form-input-div'>
                  <span>Display Name</span>
                  <input
                    placeholder='Display Name'
                    type='text'
                    name='displayname'
                    onChange={updateDisplayname}
                    value={displayname}
                  ></input>
                </div>
              </div>
              <div className='signup-form-input-div'>
                <span>Email</span>
                <input
                  placeholder='Email'
                  type='text'
                  name='email'
                  onChange={updateEmail}
                  value={email}
                ></input>
              </div>
              <div className='signup-form-input-div'>
                <span>Password</span>
                <input
                  placeholder='Password'
                  type='password'
                  name='password'
                  onChange={updatePassword}
                  value={password}
                ></input>
              </div>
              <div className='signup-form-input-div'>
                <span>Repeat Password</span>
                <input
                  placeholder='Repeat Password'
                  type='password'
                  name='repeat_password'
                  onChange={updateRepeatPassword}
                  value={repeatPassword}
                ></input>
              </div>
              <button id='signup-submit-button' type='submit'>Sign Up</button>
            </form>
            <span className='have-account-text'>Already have an account?</span>
            <span><button onClick={demoLogin}>Demo</button></span>
          </div>
        </div>
        <div id="footer-info">
          <span>LinkedIn</span><span>Github</span>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
