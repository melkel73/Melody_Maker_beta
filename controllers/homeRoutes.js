const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');
const SpotifyWebApi = require('spotify-web-api-node');
const axios = require('axios');
const clientId = '71ef4f563acb47d198bb7ef2241f6ffa';
const clientSecret = 'cb2b2ce1adb2449698e13b08eb2dcd81';
const redirectUri = 'http://localhost:3000/callback';

router.get('/', async (req, res) => {
  
//   try {
//     // Get all projects and JOIN with user data
//     const projectData = await Project.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     // Serialize data so the template can read it
//     const projects = projectData.map((project) => project.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     res.render('homepage', { 
//       projects, 
//       logged_in: req.session.logged_in 
//     });

//   } catch (err) {
//     res.status(500).json(err);
//   }
});

router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile',  async (req, res) => {
  try {
    // Request access and refresh tokens
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      {
        grant_type: 'client_credentials',
        // code: code,
        // redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
     
    );
    // console.log(response);

    const { access_token, refresh_token } = response.data;

    // Use the access token to get user's playlists
    // console.log(access_token + ":token");
    const playlistsResponse = await axios.get(
    //   'https://api.spotify.com/v1/me/playlists',
    "https://api.spotify.com/v1/users/31zdpeos245wlzrk6lp53epujyre/playlists?offset=0&limit=20",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
//    console.log(playlistsResponse);
    // Print the playlists
    const playlists = playlistsResponse.data.items;
    res.render('profile',{playlists});
    playlists.forEach((playlist) => {
      console.log(playlists);
      //  res.render('profile',{});

    });

    // Perform any other operations with the playlists here

    // res.render('homepage');
  } catch (error) {
    console.error('Error fetching playlists:', error.message);
    res.status(500).send('Error fetching playlists');
  }
});
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Project }],
//     });
//     const user = userData.get({ plain: true });
//     res.render('profile', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

module.exports = router;
