import { Mongo } from 'meteor/mongo';
import  SimpleSchema  from 'simpl-schema';
import { Meteor } from 'meteor/meteor';

export const Recipes = new Mongo.Collection('recipes');

Recipes.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});


Recipes.schema = new SimpleSchema({
  _id: {
    type: String,
  },
  name: {
    type: String,
  },
  ingredients: {
    type: Array,
  },
  'ingredients.$': { 
    type: Object,
    blackbox: true
  },
  createdAt: {
    type: Date,
  },
});

Recipes.attachSchema(Recipes.schema);
// Recipes.schema = SimpleSchema.Recipes
Recipes.publicFields = {
  name: 1,
  ingredients: 1,
  createdAt: 1,
};

