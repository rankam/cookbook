import { Meteor } from 'meteor/meteor';

import { Recipes } from '../recipes.js';

Meteor.publish('recipes.all', function listsPublic() {
  return Recipes.find({});
});

Meteor.publish('recipeSearchResults', function (searchTerm) {
	console.log('searching for recipes...')
	if (!searchTerm | searchTerm === '') {
		return Recipes.find({})
	} else {
  		const searchWildCard = `.*${searchTerm}.*`
  		return Recipes.find({name: {'$regex': searchWildCard, '$options': 'i'}});  
  	}

});

Meteor.publish('recipeIngredients', function(ingredientIds) {
	console.log('publishing recipe ingredients ', ingredientIds)
	return Ingredients.find({"_id": {"$in": ingredients}})
})


Meteor.publish('recipeShow', function (recipeId) {
	console.log(`fetching recipe ${recipeId}...`)
	return Recipes.find({_id: recipeId});
});

Meteor.publish('recipeShow', function (recipeId) {
	console.log(`fetching recipe ${recipeId}...`)
	return Recipes.find({_id: recipeId});
});