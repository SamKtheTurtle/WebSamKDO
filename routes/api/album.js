const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


// album model
const Album = require('../../models/Album.model');
// Profile model
const Track = require('../../models/Track.model');

// @route   GET api/albums/test
// @desc    Tests album route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'albums Works' }));

// @route   GET api/albums
// @desc    Get albums
// @access  Public
router.get('/', 
  Album.findAll = (req, res) => {
    Album.find()
    .then(album => res.json(album))
    .catch(err => res.status(404).json({ noalbumsfound: 'No albums found' }));
});

// @route   GET api/albums/:id
// @desc    Get album by id
// @access  Public
router.get('/:id', (req, res) => {
  Album.findById(req.params.id)
    .then(album => {
      if (album) {
        res.json(album);
      } else {
        res.status(404).json({ noalbumfound: 'No album found with that ID' })
      }
    })
    .catch(err =>
      res.status(404).json({ noalbumfound: 'No album found with that ID' })
    );
});
/*
// @route   album api/albums
// @desc    Create album
// @access  Private
router.album(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatealbumInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newalbum = new album({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newalbum.save().then(album => res.json(album));
  }
);

// @route   DELETE api/albums/:id
// @desc    Delete album
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      album.findById(req.params.id)
        .then(album => {
          // Check for album owner
          if (album.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }

          // Delete
          album.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ albumnotfound: 'No album found' }));
    });
  }
);

// @route   album api/albums/like/:id
// @desc    Like album
// @access  Private
router.album(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      album.findById(req.params.id)
        .then(album => {
          if (
            album.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: 'User already liked this album' });
          }

          // Add user id to likes array
          album.likes.unshift({ user: req.user.id });

          album.save().then(album => res.json(album));
        })
        .catch(err => res.status(404).json({ albumnotfound: 'No album found' }));
    });
  }
);

// @route   album api/albums/unlike/:id
// @desc    Unlike album
// @access  Private
router.album(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      album.findById(req.params.id)
        .then(album => {
          if (
            album.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: 'You have not yet liked this album' });
          }

          // Get remove index
          const removeIndex = album.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          album.likes.splice(removeIndex, 1);

          // Save
          album.save().then(album => res.json(album));
        })
        .catch(err => res.status(404).json({ albumnotfound: 'No album found' }));
    });
  }
);

// @route   album api/albums/comment/:id
// @desc    Add comment to album
// @access  Private
router.album(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatealbumInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    album.findById(req.params.id)
      .then(album => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        // Add to comments array
        album.comments.unshift(newComment);

        // Save
        album.save().then(album => res.json(album));
      })
      .catch(err => res.status(404).json({ albumnotfound: 'No album found' }));
  }
);

// @route   DELETE api/albums/comment/:id/:comment_id
// @desc    Remove comment from album
// @access  Private
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    album.findById(req.params.id)
      .then(album => {
        // Check to see if comment exists
        if (
          album.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: 'Comment does not exist' });
        }

        // Get remove index
        const removeIndex = album.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        album.comments.splice(removeIndex, 1);

        album.save().then(album => res.json(album));
      })
      .catch(err => res.status(404).json({ albumnotfound: 'No album found' }));
  }
);
*/
module.exports = router;
