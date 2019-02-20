import { Meteor } from 'meteor/meteor';

import { Ingredients } from '../ingredients.js';

Meteor.publish('ingredients.all', function listsPublic() {
  return Ingredients.find({});
});
