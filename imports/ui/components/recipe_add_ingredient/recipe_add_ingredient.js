import './recipe_add_ingredient.html';
import { ReactiveDict } from 'meteor/reactive-dict'
import { Ingredients } from '/imports/api/ingredients/ingredients.js';
import { Recipes } from '/imports/api/recipes/recipes.js';
import { Meteor } from 'meteor/meteor';
import { deleteIngredient } from '/imports/api/ingredients/methods.js';
import { addIngredient, removeIngredientFromRecipe } from '/imports/api/recipes/methods.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.recipe_add_ingredient.onCreated(function () {
  this.state = new ReactiveDict();

  this.state.set('searchTerm','');
  this.autorun(() => {
    FlowRouter.watchPathChange();
    let currentContext = FlowRouter.current();
    // this.state.set("recipeId", currentContext.params["_id"]);    
    this.subscribe('ingredientSearchResults', this.state.get('searchTerm'))
  	this.subscribe('recipeShow', currentContext.params["_id"])   

  });	
});

Template.recipe_add_ingredient.helpers({

	ingredients() {
		const template = Template.instance();
		if (template.state.get('searchTerm') == '' | template.state.get('searchTerm') == null) {
			return Ingredients.find({});
		} else {
			return Ingredients.find({}, { sort: [["score", "desc"]] })			
		}
	},
  recipe() {
    const _id = FlowRouter.getParam('_id');
    return Recipes.findOne({_id});
  }
});

Template.recipe_add_ingredient.events({
	'keyup #ingredientSearch': function(event) {
		const template = Template.instance();
		template.state.set('searchTerm', event.target.value)		
	},
  'click .removeIngredient': function remove(event) {
    const ingredientId = event.currentTarget.id;
    const recipeId = FlowRouter.getParam('_id');
    removeIngredientFromRecipe.call({recipeId, ingredientId})
  },
  'click .ingredient-list': function (event) {
    const ingredientId = event.currentTarget.id;
    const path = '/ingredients/' + ingredientId
    FlowRouter.go(path)
  },
  'click .addIngredient': function remove(event) {
    const recipeId = FlowRouter.getParam('_id');
    const ingredientId = event.currentTarget.id;
    addIngredient.call({_id: recipeId, ingredientId})
  },  

});
