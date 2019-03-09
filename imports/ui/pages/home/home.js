import './home.html';
import '../../components/recipe_form/recipe_form.js';
import '../../components/ingredient_form/ingredient_form.js';
import '../../components/ingredient_list/ingredient_list.js';
import '../../components/recipe_add_ingredient/recipe_add_ingredient.js';
import '../../components/recipe_list/recipe_list.js';
import '../../components/recipe_show/recipe_show.js';
import '../../components/recipe_search/recipe_search.js';
import '../../components/ingredient_search/ingredient_search.js';
import '../../components/ingredient_search_list/ingredient_search_list.js';
import '../../components/recipe_search_list/recipe_search_list.js';
import '../../components/ingredient_show/ingredient_show.js';
import '../../components/side_nav/side_nav.js';
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
