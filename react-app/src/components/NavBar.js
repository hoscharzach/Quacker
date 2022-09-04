
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const user = useSelector(state => state.session.user)
  return (
    <nav className='navigation'>
      <ul className='nav-items'>
        <li>
          <NavLink to='/home' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        {!user &&
          <>
            <li>
              <NavLink to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to='/' exact={true} activeClassName='active'>
                Sign Up
              </NavLink>
            </li>
          </>
        }
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to={`/profile/${user.username}`} exact={true} activeClassName='active'>
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to='/images' exact={true} activeClassName='active'>
            Images
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
