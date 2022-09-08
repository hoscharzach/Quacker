
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import duckIcon from '../images/blackduckicon.svg'
import homeIcon from '../images/bird-on-an-egg-in-a-nest-svgrepo-com.svg'
import './navbar.css'
import CreatePostModal from './CreatePostModal';

const NavBar = () => {
  const user = useSelector(state => state.session.user)
  return (
    <div className='navigation'>
      <div className='navigation-icons-wrapper'>
        <div>
          <img className='duck-icon' src={duckIcon} alt=""></img>
        </div>
        <div>
          <NavLink to='/home' exact={true} activeClassName='active'>
            {/* <img className='home-icon' src={homeIcon} alt="" ></img>  */}
            <span className='navbar-text'>Home</span>
          </NavLink>
        </div>
        {/* <div>
          <NavLink to={`/profile/${user.username}`} exact={true} activeClassName='active'>
          Profile
          </NavLink>
        </div> */}
        <div>
          <LogoutButton />
        </div>
        <div>
          <CreatePostModal parentId={null} location={'nav'} />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
