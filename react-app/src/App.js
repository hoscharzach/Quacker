import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import { authenticate } from './store/session';
import SinglePost from './components/singlepost/SinglePost';
import Home from './components/home/Home';
import Testing from './components/Testing';
import ReplyCard from './components/ReplyCard/ReplyCard';


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
          {/* <Route exact path='/login'>
            <LoginForm />
          </Route> */}
          <ProtectedRoute exact path='/home'>
            <Home />
          </ProtectedRoute>
          <ProtectedRoute exact path='/post/:postId'>
            <SinglePost />
          </ProtectedRoute>
          <Route>
            <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0px 10px', }} >
              <h3>Page couldn't be found, check out the <Link to={'/home'}><span style={{ color: 'rgb(29, 155, 240)' }} >main feed</span></Link>, or refresh the page to try again.</h3>
            </div>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );


}

export default App;
