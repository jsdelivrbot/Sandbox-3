const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {

  it('requires a user name', () => {
    const user = new User({ name: undefined });
    // we use the validateSync method to check the validations - this will do the validations in time and store the returned object in the validationResult
    // we could use user.validate() which is asyncronouse
    // we would be able to add custom validation by passing the validationResult to a callback method
    const validationResult = user.validateSync();
    // some ES6 destructuring to grab the message value from validationResult.errors.name and store it in a variable called message.
    const { message } = validationResult.errors.name;

    assert(message === "Name is required.");
  });

  it('requires a user name longer than 2 characters', () => {
    const user = new User({ name: 'Al' });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    
    assert(message === 'Name must be at least 3 characters.');
  });

});