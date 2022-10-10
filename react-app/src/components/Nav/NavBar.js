
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session'
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './navbar.css'
import CreatePostModal from '../CreatePostModal'
import origamiBird from '../../images/origamibird.svg'
import duck from '../../images/duck.svg'
import duckLogo from '../../images/ducklogo.svg'
import swanIcon from '../../images/swan.svg'
import IconButton from '@mui/material/IconButton';
import githubIcon from '../../images/github.svg'
import linkedinIcon from '../../images/linkedin2.svg'
import headshot from '../../images/headshot.jpg'
import Divider from '@mui/material/Divider';
import Reply from '../ReplyModal/Reply';
import { Box, Modal } from '@mui/material';
import CreatePost from '../home/CreatePost';
import defaultProfilePic from '../../images/defaultprofilepic.svg'


const NavBar = () => {

  const user = useSelector(state => state.session.user)
  const history = useHistory()
  const dispatch = useDispatch()
  const location = useLocation()

  const [replyModalOpen, setReplyModalOpen] = useState(false)

  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/')
  };

  const buttons = [
    { text: 'Home', icon: duck, onClick: () => history.push('/home') },
    { text: 'Profile', icon: user.profilePic ? user.profilePic : defaultProfilePic, profilepic: true, onClick: () => history.push(`/profile/${user.username}`) },
    {
      text: 'Search', icon: swanIcon, onClick: () => history.push({
        pathname: `/search/`,
        search: ''
      })
    },
    { text: 'Logout', icon: origamiBird, onClick: onLogout },
  ]

  const links = [
    { text: 'Github Repo', icon: githubIcon, link: 'https://github.com/hoscharzach/Quacker' },
    { text: 'Developer', icon: linkedinIcon, link: 'https://www.linkedin.com/in/zachhoschar/' },
    { text: 'About Me', icon: headshot, link: 'https://zachhoschar.com/' }
  ]
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '15px',
    backgroundColor: '#15202b',
    border: '2px solid #15202b',
    boxShadow: 24,
  };
  const svgStyle = {
    width: '26.25px',
    height: '26.25px',
    color: 'white'
  }

  const profilePicStyle = {
    width: '28.25px',
    height: '28.25px',
    borderRadius: '50%',
    backgroundColor: 'white'
  }

  const buttonStyle = {
    boxSizing: 'border-box',
    height: '50.25',
    fontSize: '20px',
    fontFamily: 'chirp',
    color: 'white',
    borderRadius: '999px',
    padding: '12px',
    '&:hover': {
      backgroundColor: 'rgba(247, 249, 249, .1)'
    }
  }

  return (
    <>
      <div className='navigation'>
        <div className='navigation-icons-wrapper'>

          <div>
            <IconButton sx={buttonStyle} onClick={() => history.push('/home')}>
              <img style={svgStyle} src={duckLogo} ></img>
            </IconButton>
          </div>

          {buttons.map((btn, i) => (
            <div key={i} className='navbar-item-container'>
              <div className='navbar-item-button'>
                <IconButton disableRipple onClick={btn.onClick} sx={buttonStyle}>
                  <img style={btn.profilepic ? profilePicStyle : svgStyle} src={btn.icon}></img>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ marginRight: '10px', marginLeft: '20px', fontSize: '20px' }}>{btn.text}</div>
                  </div>
                </IconButton>
              </div>
            </div>
          ))}

          <Divider sx={{ bgcolor: '#8B98A5', margin: '10px 0px' }} />

          {links.map((link, i) => (
            <a key={i} href={link.link} target="_blank" >
              <IconButton disableRipple sx={buttonStyle}>
                <img style={link.profilepic ? profilePicStyle : svgStyle} src={link.icon}></img>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{ marginRight: '10px', marginLeft: '20px', fontSize: '20px' }}>{link.text}</div>
                </div>
              </IconButton>
            </a>
          ))}

          <button className='main-quack-button' style={{ width: '225px', height: '52px', fontSize: '17px', marginTop: '10px', marginLeft: '12px' }} onClick={() => setReplyModalOpen(true)}>Quack</button>
        </div>
      </div>

      <Modal
        open={replyModalOpen}
        onClose={() => setReplyModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">

        <Box sx={modalStyle}>
          <CreatePost setReplyModalOpen={setReplyModalOpen} />
        </Box>

      </Modal>
    </>
  );
}

export default NavBar;
