import { Recipes } from '/imports/api/recipes/recipes.js';
import { Meteor } from 'meteor/meteor';
import './recipe_show.html';
import { deleteRecipe } from '/imports/api/recipes/methods.js';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.Recipe_show.onCreated(function () {
  this.subscribe('recipes.all')

});

Template.Recipe_show.helpers({
  recipe() {
    const recipeId = FlowRouter.getParam('_id');
    var r = Recipes.find({_id:recipeId}).fetch()
    return r[0]
 	
  }
});

Template.Recipe_show.events({

});
