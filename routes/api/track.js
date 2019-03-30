const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


// track model
const Track = require('../../models/Track.model');
// Profile model
const Artist = require('../../models/Artist.model');

// @route   GET api/tracks/test
// @desc    Tests track route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'tracks Works' }));

// @route   GET api/tracks
// @desc    Get tracks
// @access  Public
router.get('/', 
  Track.findAll = (req, res) => {
    Track.find()
    .then(track => res.json(track))
    .catch(err => res.status(404).json({ notracksfound: 'No tracks found' }));
});

// @route   GET api/tracks/:id
// @desc    Get track by id
// @access  Public
router.get('/:id', (req, res) => {
  Track.findById(req.params.id)
    .then(track => {
      if (track) {
        res.json(track);
      } else {
        res.status(404).json({ notrackfound: 'No track found with that ID' })
      }
    })
    .catch(err =>
      res.status(404).json({ notrackfound: 'No track found with that ID' })
    );
});

module.exports = router;
