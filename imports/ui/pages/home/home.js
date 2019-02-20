import './home.html';
import '../../components/recipe_form/recipe_form.js';
import '../../components/ingredient_form/ingredient_form.js';
import '../../components/ingredient_list/ingredient_list.js';
// import '../../components/recipe_form/recipe_form.html';
import '../../components/recipe_ingredients_list/recipe_ingredients_list.js';
// import '../../components/ingredients/ingredients.js';
// import '../../components/recipe_ingredients_list/recipe_ingredients_list.html';
import '../../components/recipe_list/recipe_list.js';
import '../../components/recipe_list/recipe_show.js';
// import '../../components/recipe_list/recipe_list.html';
import '../../components/header/header.html';
import { Meteor } from 'meteor/meteor';
import { ReactiveDict } from 'meteor/reactive-dict'
import { Template } from 'meteor/templating';


Template.App_home.onCreated(function () {
  this.state = new ReactiveDict;
  this.state.set('selected', 'recipe');
});



Template.App_home.helpers({
  selected() {
    return Template.instance().state.get('selected');
  }
});

Template.App_home.events({
  'click .recipe': function (event) {
    Template.instance().state.set('selected', 'recipe');
  },
  'click .ingredient': function (event) {
    Template.instance().state.set('selected', 'ingredient');
  },  
});
