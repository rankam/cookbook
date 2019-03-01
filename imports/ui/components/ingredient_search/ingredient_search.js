import './ingredient_search.html';
import { ReactiveDict } from 'meteor/reactive-dict'
import { Ingredients } from '/imports/api/ingredients/ingredients.js';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { addIngredient } from '/imports/api/recipes/methods.js';

Template.ingredient_search.onCreated(function () {
  this.state = new ReactiveDict();

  this.state.set('searchTerm','');
  this.autorun(() => {
  	this.subscribe('ingredientSearchResultsNoInitial', this.state.get('searchTerm'))
  });	
});

Template.ingredient_search.helpers({

	ingredients() {
		const template = Template.instance();
		if (template.state.get('searchTerm') == '' | template.state.get('searchTerm') == null) {
			return null;
		} else {
			return Ingredients.find({}, { sort: [["score", "desc"]] })			
		}
	}
});

Template.ingredient_search.events({
	'keyup #ingredientSearch': function(event) {
		const template = Template.instance();
		template.state.set('searchTerm', event.target.value)		
	},
  'click .add-inredient-search-result': function(event) {
    const recipeId = FlowRouter.getParam('_id');
    const ingredientId = event.target.id;
    addIngredient.call({_id: recipeId, ingredientId: ingredientId })

  }

});
