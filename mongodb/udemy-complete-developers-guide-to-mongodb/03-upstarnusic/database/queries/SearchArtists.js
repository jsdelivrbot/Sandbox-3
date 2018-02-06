const Artist = require('../models/artist');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by (assume ascending order)
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 *  like this: { all: [artists], count: count, offset: offset, limit: limit }
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
  // sortProperty can be name, age, albums
  // old way of creating an object from a variable
  // let sortOrder = {};
  // if (sortProperty === 'name')
  //   sortOrder.name = 1;
  // if (sortProperty === 'age')
  //   sortOrder.age = 1;
  // if (sortProperty === 'albums')
  //   sortOrder.albums = 1;

  const query = Artist.find(buildQuery(criteria))
    // ES6 way of creating an object from a variable
    // [sortProperty] is not an array it is object interpolation where an object property can be created from the value of a variable, eg. { name: 1 }
    .sort({ [sortProperty]: 1 })
    .skip(offset)
    .limit(limit);

  return Promise.all([query, Artist.count()])
    .then((results) => {
      return {
        all: results[0],      // the artists found
        count: results[1],    // number of artists in the db
        offset,
        limit
      };
    });
};

/**
 * The criteria object is not formatted in a way we can use to pass to mongodb to find our records.  This function breaks to the criteria up into an object which can be used.
 * @param {object} criteria An object of the form search filters
 * @return {object} the object to represent the search criteria to be passed to mongo
 */
const buildQuery = (criteria) => {
  const query = {};

  if (criteria.name) {
    // ensure a text index is set in mongodb for the name field
    query.$text = { $search: criteria.name }
  }

  if (criteria.age) {
    query.age = {
      $gte: criteria.age.min,
      $lte: criteria.age.max
    };
  }

  if (criteria.yearsActive) {
    query.yearsActive = {
      $gte: criteria.yearsActive.min,
      $lte: criteria.yearsActive.max
    };
  }

  return query;
};