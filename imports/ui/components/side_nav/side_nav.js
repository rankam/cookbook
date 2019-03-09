import './side_nav.html';
import { Meteor } from 'meteor/meteor';
import { ReactiveDict } from 'meteor/reactive-dict'
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.side_nav.onCreated(function () {
  this.state = new ReactiveDict;
  const current = FlowRouter.current();
  const currentPath = current.path;
  if (currentPath.indexOf('recipe') >= 0) {
  	this.state.set('selected', 'recipes');	
  } else if (currentPath.indexOf('ingredient') >= 0) {
  	this.state.set('selected', 'ingredients');	
  } else {
  	this.state.set('selected', 'home');	
  }
  
});

Template.side_nav.helpers({
  selected(el) {

    return el.hash.className == Template.instance().state.get('selected') ? '': '';
  },
  selectedColor(el) {
    // return el.hash.className == Template.instance().state.get('selected') ? 'rgb(255, 0, 78)': 'rgb(63,63,63)';
    return el.hash.className == Template.instance().state.get('selected') ? 'cornflowerblue': 'rgb(63,63,63)';
  }  
});

Template.side_nav.events({
  'click #header-recipes': function(event) {
    Template.instance().state.set('selected', 'recipes');
  },
  'click #header-ingredients': function(event) {
    Template.instance().state.set('selected', 'ingredients');
  },
  'click #header-home': function(event) {
    Template.instance().state.set('selected', 'home');
  } 

});


