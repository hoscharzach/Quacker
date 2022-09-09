import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/profile/User';
import { authenticate } from './store/session';
import SinglePost from './components/singlepost/SinglePost';
import Home from './components/home/Home';
import Testing from './components/Testing';

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
            <Home />
          </ProtectedRoute>
          <ProtectedRoute exact path='/users'>
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute exact path='/profile/:username'>
            <User />
          </ProtectedRoute>
          <ProtectedRoute exact path='/profile/:username/post/:postId'>
            <SinglePost />
          </ProtectedRoute>
          <ProtectedRoute exact path='/testing'>
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
