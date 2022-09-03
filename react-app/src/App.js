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
import SinglePost from './components/SinglePost';

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
          <ProtectedRoute path='/users' exact={true} >
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path='/profile/:username' exact={true} >
            <User />
          </ProtectedRoute>
          <ProtectedRoute path='/profile/:username/post/:postId' >
            <SinglePost />
          </ProtectedRoute>
          {/* <ProtectedRoute path='/upload' exact={true} >
            <UploadPicture />
          </ProtectedRoute>
          <ProtectedRoute path='/images' exact={true} >
            <ImageDisplay />
          </ProtectedRoute> */}
          <ProtectedRoute path='/home' exact={true} >
            <Home />
          </ProtectedRoute>
          <ProtectedRoute path='/testing' exact={true} >
            <Testing />
          </ProtectedRoute>
          <Route>
            404 Not Found
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );


}

export default App;
