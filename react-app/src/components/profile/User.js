import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

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
    return <p>User not Found</p>;
  }

  return (
    <>
      <div className='profile-page'>
        <div className='profile-component'>
          Hello from {username}'s profile!
        </div>
        <div className='profile-posts-wrapper'>
          {!loaded && <div id='loading'></div>}
          {loaded && userPosts.map(el => (
            <Link to={`/profile/username/post/${el.id}`}> <div>{el.content}</div></Link>
          ))}
        </div>
      </div>
    </>
  );
}
export default User;
