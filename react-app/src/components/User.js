import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function User() {
  const { username } = useParams();
  const dispatch = useDispatch()

  const [loaded, setLoaded] = useState(false)
  const [user, setUser] = useState({});
  const [userPosts, setUserPosts] = useState([])


  useEffect(() => {
    if (!username) {
      return;
    }
    (async () => {
      await fetch(`/api/posts/${username}`)
        .then(data => data.json())
        .then(data => setUserPosts(data.posts))
        .then(data => setLoaded(true))
        .catch(data => window.alert(data))

    })();
  }, [username]);

  if (!user) {
    return null;
  }

  else if (!loaded) {
    return (
      <div id='loading'></div>
    )
  }

  return (
    <>
      <div className='profile-page'>
        <div className='profile-component'>
          Hello from {user.username}'s profile!
        </div>
        <div className='profile-posts-wrapper'>
          {userPosts.map(el => (
            <div>{el.content}</div>
          ))}
        </div>
      </div>
    </>
  );
}
export default User;
