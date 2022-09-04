import React, { useState, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/profile/User';
import { authenticate } from './store/session';
import UploadPicture from './components/UploadPicture';
import ImageDisplay from './components/imagetestcomponent/GetImages';
import Home from './components/home/Home';
import Testing from './components/Testing';
import SinglePost from './components/singlepost/SinglePost';

function App() {
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <div id='entire-app-container'>
      <BrowserRouter>
        {user && <NavBar />}
        <Switch>
          <Route exact path='/'>
            <SignUpForm />
            {/* add login form as modal here */}
          </Route>
          <Route exact path='/login'>
            <LoginForm />
          </Route>
          <ProtectedRoute exact path='/home'>
            {/* <NavBar /> */}
            <Home />
          </ProtectedRoute>
          <ProtectedRoute exact path='/users'>
            {/* <NavBar /> */}
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute exact path='/profile/:username'>
            {/* <NavBar /> */}
            <User />
          </ProtectedRoute>
          <ProtectedRoute exact path='/profile/:username/post/:postId'>
            {/* <NavBar /> */}
            <SinglePost />
          </ProtectedRoute>
          <ProtectedRoute exact path='/testing'>
            {/* <NavBar /> */}
            <Testing />
          </ProtectedRoute>
          <Route>
            <Redirect to='/home'></Redirect>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );


}

export default App;
