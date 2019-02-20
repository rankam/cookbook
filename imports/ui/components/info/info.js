import { Recipes } from '/imports/api/recipes/recipes.js';
import { Meteor } from 'meteor/meteor';
import './info.html';
import { deleteRecipe } from '/imports/api/recipes/methods.js';

Template.info.onCreated(function () {
  this.subscribe('recipes.all')

});

Template.info.helpers({
  recipes() {
    return Recipes.find({});
  },
});

Template.info.events({
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
