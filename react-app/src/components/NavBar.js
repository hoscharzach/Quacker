
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/session';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import LogoutButton from './auth/LogoutButton';
import duckIcon from '../images/blackduckicon.svg'
import homeIcon from '../images/bird-on-an-egg-in-a-nest-svgrepo-com.svg'
import './navbar.css'
import CreatePostModal from './CreatePostModal';
import origamiBird from '../images/origamibird.svg'
import duck from '../images/duck.svg'

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
          <img style={{ width: '30px', height: '30px', paddingLeft: '20px' }} className='duck-icon' src={duckIcon} alt=""></img>
          {user && <span style={{ marginLeft: '25px', wordBreak: 'break-all' }} >Welcome, <br></br>{user.username}</span>}
        </div>
        <div>
          <div className='navbar-item-container'>
            <div className='navbar-item-button'>

              <img style={{ width: '25px;', height: '25px', paddingLeft: '20px', marginRight: '30px' }} className="duck-home-icon" src={duck} alt="" ></img>
              <NavLink to='/home' exact={true} activeClassName='active'>
                {/* <img className='home-icon' src={homeIcon} alt="" ></img>  */}


                <span className='navbar-text'>Home</span>

              </NavLink>
            </div>
          </div>
        </div>
        {/* <div>
          <NavLink to={`/profile/${user.username}`} exact={true} activeClassName='active'>
          Profile
          </NavLink>
        </div> */}
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
