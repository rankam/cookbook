import { Recipes } from '/imports/api/recipes/recipes.js';
import { Meteor } from 'meteor/meteor';
import './recipe_list.html';
import { deleteRecipe } from '/imports/api/recipes/methods.js';

Template.recipe_list.onCreated(function () {
  this.subscribe('recipes.all')

});

Template.recipe_list.helpers({
  recipes() {
    return Recipes.find({});
  },
});

Template.recipe_list.events({
  'click .deleteRecipe': function remove(event) {
    var recipeId = event.currentTarget.id;
    deleteRecipe.call(recipeId)
  }
});
