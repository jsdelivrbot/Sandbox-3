const Artist = require('../models/artist');

/**
 * Finds a single artist in the artist collection.
 * @param {object} artistProps - Object containing a name, age, yearsActive, and genre
 * @return {promise} A promise that resolves with the Artist that was created
 */
module.exports = (artistProps) => {
  // when we create a new instance of an model, we can pass an object to it which will be used to set the data, for example,
  // the object artistProps has the same properties (name, age, yearsActive, genre) as our artist model, so we can pass the object to it and the artist is created
  // alternatively, we would have to create the artist by passing each of the values of the properties to create a new artist.  Eg, const artist = new Artist({ name: 'xyz' });
  const artist = new Artist(artistProps);

  return artist.save();
};
