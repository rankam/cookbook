import { Recipes } from '/imports/api/recipes/recipes.js';
import { Meteor } from 'meteor/meteor';
import './recipe_search_list.html';
import { deleteRecipe } from '/imports/api/recipes/methods.js';
import { ReactiveDict } from 'meteor/reactive-dict'
import { FlowRouter } from 'meteor/kadira:flow-router';



Template.recipe_search_list.onCreated(function () {
  this.state = new ReactiveDict();

  this.state.set('searchTerm','');
  this.autorun(() => {
    this.subscribe('recipeSearchResults', this.state.get('searchTerm'))
  }); 
});

Template.recipe_search_list.helpers({
  recipes() {
    const template = Template.instance();
    if (template.state.get('searchTerm') == '' | template.state.get('searchTerm') == null) {
      console.log('empty search')
      return Recipes.find({});
    } else {
      console.log('Not empty search')
      return Recipes.find({}, { sort: [["score", "desc"]] })      
    }
  }
});

Template.recipe_search_list.events({
  'keyup #recipe-search': function(event) {
    console.log('click')
    const template = Template.instance();
    template.state.set('searchTerm', event.target.value)    
  },
  'click .deleteRecipe': function remove(event) {
    var recipeId = event.currentTarget.id;
    deleteRecipe.call(recipeId)
    if (FlowRouter.getParam('_id') == recipeId) {
      FlowRouter.go('/recipes')
    }
  },
  'click .recipe-list': function (event) {
    const recipeId = event.currentTarget.id;
    const path = '/recipes/' + recipeId
    FlowRouter.go(path)
  } 
});
