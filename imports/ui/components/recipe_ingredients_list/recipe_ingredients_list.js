import { Recipes } from '/imports/api/recipes/recipes.js';
import { Meteor } from 'meteor/meteor';
import './recipe_ingredients_list.html';
import { deleteRecipe } from '/imports/api/recipes/methods.js';

Template.recipe_ingredients_list.onCreated(function () {
  this.subscribe('recipes.all')

});

Template.recipe_ingredients_list.helpers({
  recipes() {
    return Recipes.find({});
  },
});

Template.recipe_ingredients_list.events({
  'submit .info-link-add'(event) {
    event.preventDefault();

    const target = event.target;
    const title = target.title;
    const url = target.url;

    Meteor.call('links.insert', title.value, url.value, (error) => {
      if (error) {
        alert(error.error);
      } else {
        title.value = '';
        url.value = '';
      }
    });
  },
  'click .deleteRecipe': function remove(event) {
    var recipeId = event.currentTarget.id;
    deleteRecipe.call(recipeId)
  }
});
