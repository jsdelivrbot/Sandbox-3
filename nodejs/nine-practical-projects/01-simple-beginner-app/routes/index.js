const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator/check');
const path = require('path');
const auth = require('http-auth');
const constants = require('./helper');

const router = express.Router();
const Registration = mongoose.model('Registration');

const basic = auth.basic({
  file: path.join(__dirname, '../users.htpasswd')
});

// GET '/'
router.get('/', (req, res) => {
  res.render('form', { title: constants.REGISTRATION_FORM_TITLE });
});

// POST '/'
router.post('/', 
  [ 
    body('name')
      .isLength({min: 1})
      .withMessage(constants.ENTER_NAME),
    body('email')
      .isLength({min: 1})
      .withMessage(constants.ENTER_EMAIL),
  ], 
  (req, res) => {
    const errors = validationResult(req);

    if(errors.isEmpty()) {
      // we can simply pass the req.body object to Registration because it simply has properties name and email
      // which is what is needed by our Registration schema
      const registration = new Registration(req.body);
      registration.save()
        .then(() => res.render('result', { 
          title: constants.REGISTRATION_SUCCESS, 
          message: constants.THANKS_FOR_REGISTERING 
        }))
        .catch((error) => res.render('result', { 
          title: constants.REGISTRATION_FAIL,
          message: constants.SOMETHING_WENT_WRONG 
        }));
    } else {
      res.render('form', {
        title: constants.REGISTRATION_FORM_TITLE,
        errors: errors.array(),
        data: req.body,
      });
    }
  });

// GET '/registrations'
router.get('/registrations', auth.connect(basic), (req, res) => {
  Registration.find()
    .then((registrations) => {
      res.render('index', { title: constants.LISTING_REGISTRATIONS_TITLE, registrations });
    })
    .catch(() => { res.send(constants.SOMETHING_WENT_WRONG); });
});

// DELETE '/registrations/:id
router.post('/registrations/:id', (req, res) => {
  const id = req.params.id;
  Registration.findByIdAndRemove(id)
    .then(() => {
      res.redirect('/registrations')
    })
    .catch(() => { res.send(constants.SOMETHING_WENT_WRONG); });
});

module.exports = router;
