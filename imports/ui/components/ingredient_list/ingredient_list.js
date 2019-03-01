import { Ingredients } from '/imports/api/ingredients/ingredients.js';
import { Meteor } from 'meteor/meteor';
import './ingredient_list.html';
import { deleteIngredient } from '/imports/api/ingredients/methods.js';
import { FlowRouter } from 'meteor/kadira:flow-router';


Template.ingredient_list.onCreated(function () {
  this.subscribe('ingredients.all')

});

Template.ingredient_list.onRendered(function() {
	console.log('a')
  this.$('.ui.accordion').accordion();
});


Template.ingredient_list.helpers({
  ingredients() {
    return Ingredients.find({});
  },
});

Template.ingredient_list.events({
  'click .deleteIngredient': function remove(event) {
    var ingredientId = event.currentTarget.id;
    deleteIngredient.call(ingredientId)
  },
  'click .ingredient-list': function (event) {
    const ingredientId = event.currentTarget.id;
    const path = '/ingredients/' + ingredientId
    FlowRouter.go(path)
  }  
});
