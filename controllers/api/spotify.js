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
    playlists.forEach((playlist) => {
      console.log(playlist.name);
    //   res.render('results');
    });

    // Perform any other operations with the playlists here

    // res.render('homepage');
  } catch (error) {
    console.error('Error fetching playlists:', error.message);
    res.status(500).send('Error fetching playlists');
  }
