import axios from 'axios';

// Register Artist
export const registerArtist = (ArtistData) => {
  axios
  .put('/api/Artist/db_kdo/artists', ArtistData)
    .then(res => console.log(res.data));
};
