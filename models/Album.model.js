const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AlbumSchema = new Schema(
  {
  title: String,
  release: Date, 
  style: String,
  coverURL: String,
  tracks: [
    {
      type: Schema.Types.ObjectId, 
      ref: 'Track'
    }
  ]
  },
  {
    timestamps: true
  }
);
 

module.exports = mongoose.model('album', AlbumSchema);
