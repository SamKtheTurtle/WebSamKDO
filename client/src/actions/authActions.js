import axios from 'axios';

// Register Artist
export const registerArtist = (ArtistData) => {
  axios
  .put('/api/Artist/db_kdo/artists', ArtistData)
    .then(res => console.log(res.data));
};


//GetArtistFollowers
export const getArtistFollowers = (ArtistId) => {
axios
.get('/api/Artist/all')
  .then(({data}) => {

    for(var i=0; i<=data.length; i++){
     if(data[i].firstName === ArtistId){
         console.log(data[i].followers)
         var foll = data[i].followers;
     }
     this.setState({followers: foll});
    }
  });
};
