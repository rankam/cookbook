import { Meteor } from 'meteor/meteor';

import { Recipes } from '../recipes.js';

Meteor.publish('recipes.all', function listsPublic() {
  return Recipes.find({});
});
