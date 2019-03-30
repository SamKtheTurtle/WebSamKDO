const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: String, 
    birth: Date,
    followers: Number,
    albums: [
      {
        type: Schema.Types.ObjectId, ref: 'Album'
      }
    ]
  },
  {
    timestamps: true
  }
);



module.exports = mongoose.model('artist', ArtistSchema);
