import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect, useHistory } from 'react-router-dom';
import { login, signUp } from '../../store/session';
import './signupform.css'
import duckLogo from '../../images/ducklogo.svg'
import twitterIcon from '../../images/bigtwittericon.svg'
import smallTwitterIcon from '../../images/twittericon.svg'
import { demoLogin } from './LoginForm'
import LoginModal from '../LoginModal/LoginModal';
import { nanoid } from 'nanoid';


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

  const inputs = [
    {
      value: username,
      placeholder: 'Username',
      onChange: updateUsername,
      type: "text"
    },
    {
      value: displayname,
      placeholder: 'Display Name',
      onChange: updateDisplayname,
      type: "text"
    },
    {
      value: email,
      placeholder: 'Email',
      onChange: updateEmail,
      type: "email"
    },
    {
      value: password,
      placeholder: 'Password',
      onChange: updatePassword,
      type: "password"
    },
    {
      value: repeatPassword,
      placeholder: 'Repeat Password',
      onChange: updateRepeatPassword,
      type: "password"
    }

  ]

  if (user) {
    return <Redirect to='/home' ></Redirect>;
  }

  return (
    <>
      <div id='splash-page-body'>

        <div id='splash-image-container'>
          <img id='splash-image-icon' src={duckLogo} alt="" ></img>
        </div>
        <div className='splash-right-div'>
          <div className='inner-form-container'>
            <img src={duckLogo} className='twitter-right-side-icon'></img>
            <div className='splash-big-text-container'>
              <span className='splash-big-text'>Quackening Now</span>
            </div>
            <span className='splash-small-text'>Join Quacker Today.</span>

            <form id='signup-form' onSubmit={onSignUp}>
              <div className='signup-form-error-container'>
                {errors.map(error => (
                  <div className='error-message' key={nanoid()}>{error.split(':')[1]}</div>
                ))}
              </div>
              {inputs.map((input, i) => (
                <input className='signup-form-input' onChange={inputs[i].onChange} placeholder={inputs[i].placeholder} type={inputs[i].type} value={inputs[i].value}></input>
              ))}

              <button id='signup-submit-button' onClick={onSignUp} type='submit'>Sign Up</button>
            </form>
            <div className='signup-buttons-container'>

              <span className='have-account-text'>Already have an account?</span>
              <LoginModal />
              <span><button id='signup-submit-button' onClick={demoLogin}>Demo User</button></span>
            </div>
          </div>
        </div>
        <div id="footer-info">
          <div id='footer-links'>

            <span>Created by Zach Hoschar:</span>
            <span ><a className='personal-link' target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/zach-hoschar-3ab403b8/'>LinkedIn</a></span>
            <span ><a className='personal-link' href='https://github.com/hoscharzach' target='_blank' rel="noreferrer">GitHub</a></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
