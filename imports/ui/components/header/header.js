import { Meteor } from 'meteor/meteor';
import { ReactiveDict } from 'meteor/reactive-dict'
import './header.html';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.header.onCreated(function () {
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

Template.header.helpers({
  selected(el) {
    return el.hash.className == Template.instance().state.get('selected') ? 'active': '';
  }
});

Template.header.events({
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


