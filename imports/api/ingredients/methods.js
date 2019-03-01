import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { Ingredients } from '/imports/api/ingredients/ingredients.js';
import SimpleSchema from 'simpl-schema';

export const insertIngredient = new ValidatedMethod({
  name: 'ingredients.insertIngredient',
  validate: null,
  // Ingredients.simpleSchema().pick(['name', 'kcal', 'gramsProtein', 'gramsCarbohydrates', 'gramsFat', 'units','unitType']).validator({clean: true, filter: false}),
  run({  name, kcal, gramsProtein, gramsCarbohydrates, gramsFat, units, unitType }) {
    const ingredient = { 
      name,
      kcal, 
      gramsProtein, 
      gramsCarbohydrates, 
      gramsFat, 
      units, 
      unitType,
      createdAt: new Date(),
    }
    Ingredients.insert(ingredient);
  }
});

export const upsertIngredient = new ValidatedMethod({
  name: 'ingredients.upsertIngredient',
  // validate: Ingredients.simpleSchema().pick([
  //   '_id',
  //   'name', 
  //   'kcal', 
  //   'gramsProtein', 
  //   'gramsCarbohydrates', 
  //   'gramsFat', 
  //   'units',
  //   'unitType']).validator({clean: true, filter: false}),
  validate: null,
  run({ _id, name, kcal, gramsProtein, gramsCarbohydrates, gramsFat, units, unitType }) {
    const ingredient = { 
      name,
      kcal, 
      gramsProtein, 
      gramsCarbohydrates, 
      gramsFat, 
      units, 
      unitType
    };
    Ingredients.update(_id, {$set:ingredient});
    return _id
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
  deleteIngredient,
  upsertIngredient
], 'name');

if (Meteor.isServer) {
  Ingredients._ensureIndex({
    "name": "text"
  }); 
  // Only allow 5 todos operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(INGREDIENTS_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}

