import { Meteor } from 'meteor/meteor';

import { Ingredients } from '../ingredients.js';

Meteor.publish('ingredients.all', function listsPublic() {
  return Ingredients.find({});
});

Meteor.publish('ingredientSearchResults', function (searchTerm) {
	if (!searchTerm | searchTerm === '') {
		return Ingredients.find({})
	} else {
  		const searchWildCard = `.*${searchTerm}.*`
  		return Ingredients.find({name: {'$regex': searchWildCard, '$options': 'i'}});  
  	}

});

Meteor.publish('ingredientSearchResultsNoInitial', function (searchTerm) {
	if (!searchTerm | searchTerm === '') {
		return []
	} else {
  		const searchWildCard = `.*${searchTerm}.*`
  		return Ingredients.find({name: {'$regex': searchWildCard, '$options': 'i'}});  
  	}

});

Meteor.publish('fetchIngredient', function(_id) {

	return Ingredients.find({_id});
})



