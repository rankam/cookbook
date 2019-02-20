// Methods related to recipes
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { Recipes } from '/imports/api/recipes/recipes.js';

export const insertRecipe = new ValidatedMethod({
  name: 'recipes.insertRecipe',
  validate: Recipes.simpleSchema().pick(['name']).validator({clean: false, filter: false}),
  run({ name }) {
    console.log('calling')
    const recipe = { 
      name,
      createdAt: new Date(),
    }
    Recipes.insert(recipe);
  }
});

export const deleteRecipe = new ValidatedMethod({
  name: 'recipes.deleteRecipe',
  validate: null,
  run(recipeId) {
    Recipes.remove(recipeId)
  }
});

// Get list of all method names on Todos
const RECIPES_METHODS = _.pluck([
  insertRecipe,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 todos operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(RECIPES_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}

