const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator/check');

const router = express.Router();
const Registration = mongoose.model('Registration');

// GET '/'
router.get('/', (req, res) => {
  res.render('form', { title: 'Registration Form!' });
});

// POST '/'
router.post('/', 
  [ 
    body('name')
      .isLength({min: 1})
      .withMessage('Please enter a name'),
    body('email')
      .isLength({min: 1})
      .withMessage('Please enter an email'),
  ], 
  (req, res) => {
    const errors = validationResult(req);

    if(errors.isEmpty()) {
      // we can simply pass the req.body object to Registration because it simply has properties name and email
      // which is what is needed by our Registration schema
      const registration = new Registration(req.body);
      registration.save()
        .then(() => res.send('Thank you for your registration!') )
        .catch((error) => res.send('Sorry! Something went wrong.') );
    } else {
      res.render('form', {
        title: 'Rregistration Form!',
        errors: errors.array(),
        data: req.body,
      });
    }
  });

// GET '/registrations'
router.get('/registrations', (req, res) => {
  Registration.find()
    .then((registrations) => {
      res.render('index', { title: 'Listing Registrations!', registrations });
    })
    .catch(() => { res.send('Sorry! Something went wrong.'); });
});

module.exports = router;
