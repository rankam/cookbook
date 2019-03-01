import './recipe_form.html';
import { $ } from 'meteor/jquery';
import { _ } from 'meteor/underscore';
import { insertRecipe } from '/imports/api/recipes/methods.js';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';


Template.recipe_form.onCreated(function recipeOnCreated() {

});

Template.recipe_form.helpers({
});

Template.recipe_form.events({
    'keyup input[type=text]': _.debounce(function recipeNameUpdate(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        return insertRecipe.call({name: event.target.value});
      }
      return false
  }, 900),
  'click #submitFormBtn': function upsertRecipe(event) {
    event.preventDefault();
    const instance = Template.instance()
    const recipeName = instance.$("#recipeName").val();
    const recipeId = insertRecipe.call({name: recipeName})
    FlowRouter.go(`/recipes/${recipeId}`)

    return
  }
});
