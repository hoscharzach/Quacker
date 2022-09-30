import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import SinglePost from './components/singlepost/SinglePost';
import Home from './components/home/Home';
import bigDuckIcon from './images/ducklogo.svg'
import ProfilePage from './components/ProfilePage/ProfilePage';
import BasicMenu from './components/MenuDropdown';


function App() {
  const [mainLoaded, setMainLoaded] = useState(false);
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setMainLoaded(true);
    })();
  }, [dispatch]);

  if (!mainLoaded) {
    return (
      <div style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', }} >
        <img style={{ marginBottom: '50px', width: '100px', height: '100px' }} src={bigDuckIcon}></img>
        <div id="loading"></div>
      </div >
    );
  }

  return (
    <div id='entire-app-container'>
      <BrowserRouter>
        {user && <NavBar />}
        <Switch>
          <Route exact path='/'>
            <SignUpForm />
          </Route>
          <ProtectedRoute exact path='/home'>
            <Home mainLoaded={mainLoaded} />
          </ProtectedRoute>
          <ProtectedRoute exact path='/post/:postId'>
            <SinglePost />
          </ProtectedRoute>
          <ProtectedRoute exact path='/profile/:username'>
            <ProfilePage />
          </ProtectedRoute>
          <Route exact path="/testing" >
            <BasicMenu />
          </Route>
          <Route>

            {!user &&
              <div style={{ height: '300px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0px 10px', }} >
                <h3>Page couldn't be found<br></br><Link to={'/'}><span style={{ color: 'rgb(29, 155, 240)' }} >Get outta here!</span></Link></h3>
              </div>}

            {user &&
              <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0px 10px', }} >
                <h3>Page couldn't be found, check out the <Link to={'/home'}><span style={{ color: 'rgb(29, 155, 240)' }} >main feed</span></Link>, or refresh the page to try again.</h3>
              </div>}

          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );


}

export default App;
