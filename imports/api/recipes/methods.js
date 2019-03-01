// Methods related to recipes
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { Recipes } from '/imports/api/recipes/recipes.js';
import { Ingredients } from '../ingredients/ingredients.js'
import SimpleSchema  from 'simpl-schema';
import { Random } from 'meteor/random'

export const insertRecipe = new ValidatedMethod({
  name: 'recipes.insertRecipe',
  validate: null,
  // Recipes.simpleSchema().pick(['name']).validator({clean: false, filter: false}),
  run({ name }) {
    const ingredients = [];
    const recipe = { 
      name,
      ingredients,
      createdAt: new Date(),
    }
    // returns recipeId
    return Recipes.insert(recipe);
  }
});

export const deleteRecipe = new ValidatedMethod({
  name: 'recipes.deleteRecipe',
  validate: null,
  run(recipeId) {
    Recipes.remove(recipeId)
  }
});

export const upsertRecipe = new ValidatedMethod({
  name: 'recipes.upsertRecipe',
  validate: null,
  run({ _id, name }) {
    const recipe = {
      _id,
      name,
    };
    Recipes.update(_id, {$set: recipe});
    return _id;
  }
})

export const addIngredient = new ValidatedMethod({
  name: 'recipes.addIngredient',
  validate: null,
  run({ _id, ingredientId }) {
    ingredient = Ingredients.findOne({_id: ingredientId})
    Recipes.update(_id, {$addToSet: {ingredients: ingredient  }});
  }
})

export const removeIngredientFromRecipe = new ValidatedMethod({
  name: 'recipes.removeIngredientFromRecipe',
  validate: null,
  run({ recipeId, ingredientId}) {
    Recipes.update(recipeId, {$pull: {ingredients: {_id: ingredientId}}});
  }
})

// Get list of all method names on Recipes
const RECIPES_METHODS = _.pluck([
  insertRecipe,
  upsertRecipe,
  deleteRecipe,
  addIngredient
], 'name');

if (Meteor.isServer) {
  Recipes._ensureIndex({
    "name": "text"
  });   
  // Only allow 5 todos operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(RECIPES_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
