import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { Ingredients } from '/imports/api/ingredients/ingredients.js';

export const insertIngredient = new ValidatedMethod({
  name: 'ingredients.insertIngredient',
  validate: Ingredients.simpleSchema().pick(['name', 'kcal', 'protein', 'carbohydrates', 'fat', 'units','unitType']).validator({clean: true, filter: false}),
  run({  name, kcal, protein, carbohydrates, fat, units, unitType }) {
    const ingredient = { 
      name,
      kcal, 
      protein, 
      carbohydrates, 
      fat, 
      units, 
      unitType,
      createdAt: new Date(),
    }
    Ingredients.insert(ingredient);
  }
});

export const deleteIngredient = new ValidatedMethod({
  name: 'ingredients.deleteIngredient',
  validate: null,
  run(ingredientId) {
    Ingredients.remove(ingredientId)
  }
});

// Get list of all method names on Todos
const INGREDIENTS_METHODS = _.pluck([
  insertIngredient,
  deleteIngredient
], 'name');

if (Meteor.isServer) {
  // Only allow 5 todos operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(INGREDIENTS_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}

