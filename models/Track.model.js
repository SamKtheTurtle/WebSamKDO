const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrackSchema = new Schema(
  {
    title: String,
    duration: Number, 
    listenings: Number,
    likes: Number,
    featuring: [
      {
        type: Schema.Types.ObjectId, ref: 'Artist'
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Track', TrackSchema);
