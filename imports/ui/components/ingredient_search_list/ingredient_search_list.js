import './ingredient_search_list.html';
import { ReactiveDict } from 'meteor/reactive-dict'
import { Ingredients } from '/imports/api/ingredients/ingredients.js';
import { Meteor } from 'meteor/meteor';
import { deleteIngredient } from '/imports/api/ingredients/methods.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.ingredient_search_list.onCreated(function () {
  this.state = new ReactiveDict();

  this.state.set('searchTerm','');
  this.autorun(() => {
  	this.subscribe('ingredientSearchResults', this.state.get('searchTerm'))
  });	
});

Template.ingredient_search_list.helpers({

	ingredients() {
		const template = Template.instance();
		if (template.state.get('searchTerm') == '' | template.state.get('searchTerm') == null) {
			return Ingredients.find({});
		} else {
			return Ingredients.find({}, { sort: [["score", "desc"]] })			
		}
	}
});

Template.ingredient_search_list.events({
	'keyup #ingredientSearch': function(event) {
		const template = Template.instance();
		template.state.set('searchTerm', event.target.value)		
	},
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
