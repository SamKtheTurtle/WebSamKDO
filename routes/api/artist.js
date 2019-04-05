const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


// Load artist Model
const Artist = require('../../models/Artist.model');
// Load User Model
const Album = require('../../models/Album.model');

// @route   GET api/artist
// @desc    Get current artist based on ArtistId

/*
router.get('/:name', (req, res) => {
  const errors = {};
  var name = request.params.name;
  Artist.findOne({'firstName' : name})
    .then(artists => {
      if (!artists) {
        errors.noartist = 'There are no artists';
        return res.status(404).json(errors);
      }
      res.json(artists);
    })
    .catch(err => res.status(404).json({ artist: 'There are no artists' }));
});*/


  router.get('/all', (req, res) => {
    const errors = {};
  
    Artist.find()
      .then(artists => {
        if (!artists) {
          errors.noartist = 'There are no artists';
          return res.status(404).json(errors);
        }
        res.json(artists);
      })
      .catch(err => res.status(404).json({ artist: 'There are no artists' }));
  });

// Create and Save a new Artist
router.put('/db_kdo/artists',(req, res) => {
 
  const newArtist = new Artist({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birth: req.body.birth,
    followers: req.body.followers
  });
  console.log('artist added');

  // Save Artist in the database
  newArtist
    .save()
    .then(data => {
      // we wait for insertion to be complete and we send the newly Artist integrated
      res.send(data);
    })
    .catch(err => {
      // In case of error during insertion of a new Artist in database we send an
      // appropriate message
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Artist.'
      });
    });
});


/*
// @route   GET api/artist/all
// @desc    Get all artists
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  artist.find()
    .populate('user', ['name', 'avatar'])
    .then(artists => {
      if (!artists) {
        errors.noartist = 'There are no artists';
        return res.status(404).json(errors);
      }

      res.json(artists);
    })
    .catch(err => res.status(404).json({ artist: 'There are no artists' }));
});

// @route   GET api/artist/handle/:handle
// @desc    Get artist by handle
// @access  Public

router.get('/handle/:handle', (req, res) => {
  const errors = {};

  artist.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(artist => {
      if (!artist) {
        errors.noartist = 'There is no artist for this user';
        res.status(404).json(errors);
      }

      res.json(artist);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/artist/user/:user_id
// @desc    Get artist by user ID
// @access  Public

router.get('/user/:user_id', (req, res) => {
  const errors = {};

  artist.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(artist => {
      if (!artist) {
        errors.noartist = 'There is no artist for this user';
        res.status(404).json(errors);
      }

      res.json(artist);
    })
    .catch(err =>
      res.status(404).json({ artist: 'There is no artist for this user' })
    );
});

// @route   POST api/artist
// @desc    Create or edit user artist
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateartistInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const artistFields = {};
    artistFields.user = req.user.id;
    if (req.body.handle) artistFields.handle = req.body.handle;
    if (req.body.company) artistFields.company = req.body.company;
    if (req.body.website) artistFields.website = req.body.website;
    if (req.body.location) artistFields.location = req.body.location;
    if (req.body.bio) artistFields.bio = req.body.bio;
    if (req.body.status) artistFields.status = req.body.status;
    if (req.body.githubusername)
      artistFields.githubusername = req.body.githubusername;
    // Skills - Spilt into array
    if (typeof req.body.skills !== 'undefined') {
      artistFields.skills = req.body.skills.split(',');
    }

    // Social
    artistFields.social = {};
    if (req.body.youtube) artistFields.social.youtube = req.body.youtube;
    if (req.body.twitter) artistFields.social.twitter = req.body.twitter;
    if (req.body.facebook) artistFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) artistFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) artistFields.social.instagram = req.body.instagram;

    artist.findOne({ user: req.user.id }).then(artist => {
      if (artist) {
        // Update
        artist.findOneAndUpdate(
          { user: req.user.id },
          { $set: artistFields },
          { new: true }
        ).then(artist => res.json(artist));
      } else {
        // Create

        // Check if handle exists
        artist.findOne({ handle: artistFields.handle }).then(artist => {
          if (artist) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
          }

          // Save artist
          new artist(artistFields).save().then(artist => res.json(artist));
        });
      }
    });
  }
);

// @route   POST api/artist/experience
// @desc    Add experience to artist
// @access  Private
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    artist.findOne({ user: req.user.id }).then(artist => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to exp array
      artist.experience.unshift(newExp);

      artist.save().then(artist => res.json(artist));
    });
  }
);

// @route   POST api/artist/education
// @desc    Add education to artist
// @access  Private
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    artist.findOne({ user: req.user.id }).then(artist => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to edu array
      artist.education.unshift(newEdu);

      artist.save().then(artist => res.json(artist));
    });
  }
);

// @route   DELETE api/artist/experience/:exp_id
// @desc    Delete experience from artist
// @access  Private
router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    artist.findOne({ user: req.user.id })
      .then(artist => {
        // Get remove index
        const removeIndex = artist.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // Splice out of array
        artist.experience.splice(removeIndex, 1);

        // Save
        artist.save().then(artist => res.json(artist));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/artist/education/:edu_id
// @desc    Delete education from artist
// @access  Private
router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    artist.findOne({ user: req.user.id })
      .then(artist => {
        // Get remove index
        const removeIndex = artist.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        // Splice out of array
        artist.education.splice(removeIndex, 1);

        // Save
        artist.save().then(artist => res.json(artist));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/artist
// @desc    Delete user and artist
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    artist.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);
*/
module.exports = router;
