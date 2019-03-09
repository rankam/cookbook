import './footer.html';
import { Meteor } from 'meteor/meteor';
import { ReactiveDict } from 'meteor/reactive-dict'
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Recipes } from '/imports/api/recipes/recipes.js'

// Template.footer.onCreated(function () {
//   this.state = new ReactiveDict;
//   const current = FlowRouter.current();
//   const currentPath = current.path;
//   this.subscribe('recipes.all')
  
// });

// Template.footer.helpers({
//  	recipes() {
//  		console.log('asdf')
//  		return Recipes.find({}, {limit: 5})
//  	}
// });

// Template.footer.events({


// });


