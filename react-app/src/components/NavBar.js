
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/session';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './navbar.css'
import CreatePostModal from './CreatePostModal';
import origamiBird from '../images/origamibird.svg'
import duck from '../images/duck.svg'
import duckLogo from '../images/ducklogo.svg'
import swanIcon from '../images/swan.svg'

const NavBar = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/')
  };
  const user = useSelector(state => state.session.user)
  return (
    <div className='navigation'>
      <div className='navigation-icons-wrapper'>
        <div>
          <img style={{ width: '30px', height: '30px', paddingLeft: '20px' }} className='duck-icon' src={duckLogo} alt=""></img>
          {user && <span style={{ marginLeft: '25px', wordBreak: 'break-all' }} >Welcome, <br></br>{user.username}</span>}
        </div>
        <div>
          <div className='navbar-item-container'>
            <NavLink to='/home' exact={true} activeClassName='active'>
              <div className='navbar-item-button'>

                <img style={{ width: '25px', height: '25px', paddingLeft: '20px', marginRight: '30px' }} className="duck-home-icon" src={duck} alt="" ></img>
                {/* <img className='home-icon' src={homeIcon} alt="" ></img>  */}


                <span className='navbar-text'>Home</span>

              </div>
            </NavLink>
          </div>
        </div>
        <div className='navbar-item-container'>
          <NavLink to={`/profile/${user.username}`}>
            <div className='navbar-item-button'>

              <img alt='' src={swanIcon} style={{ width: '25px', height: '25px', paddingLeft: '20px', marginRight: '30px' }}></img>
              <span className='navbar-text' >

                Profile
              </span>

            </div>
          </NavLink>
        </div>
        <div className='navbar-item-container'>
          <div onClick={onLogout} className='navbar-item-button'>
            <img alt='' src={origamiBird} style={{ width: '25px;', height: '25px', paddingLeft: '20px', marginRight: '30px' }} ></img>
            <span className='navbar-text' >Logout</span>
          </div>
        </div>
        <div>
          <div>

            <CreatePostModal />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
