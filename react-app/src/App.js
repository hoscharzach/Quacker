import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Nav/NavBar'
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import SinglePost from './components/singlepost/SinglePost';
import Home from './components/home/Home';
import bigDuckIcon from './images/ducklogo.svg'
import ProfilePage from './components/ProfilePage/ProfilePage';
import RightColumn from './components/RightColumn/RightColumn';
import PageNotFound from './components/PageNotFound';


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
        <Switch>
          <Route exact path='/'>
            <SignUpForm />
          </Route>
          <ProtectedRoute exact path='/home'>
            <>
              <NavBar />
              <Home />
              <RightColumn />
            </>
          </ProtectedRoute>
          <ProtectedRoute exact path='/post/:postId'>
            <>
              <NavBar />
              <SinglePost />
              <RightColumn />
            </>
          </ProtectedRoute>
          <ProtectedRoute exact path='/profile/:username'>
            <>
              <NavBar />
              <ProfilePage />
              <RightColumn />
            </>
          </ProtectedRoute>
          <ProtectedRoute exact path='/search/:query'>
            <>
              <NavBar />
              {/* <Search /> */}
            </>
          </ProtectedRoute>
          <Route>
            {user ? <PageNotFound variant={"LOGGED_IN"} /> : <PageNotFound variant={"LOGGED_OUT"} />}
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );


}

export default App;
