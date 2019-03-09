import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';

export const Ingredients = new Mongo.Collection('ingredients');

Ingredients.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});


Ingredients.schema = new SimpleSchema({
  _id: {
    type: String,
  },
  name: {
    type: String,
    max: 100,
  },
  kcal  : {
    type: Number,
  },
  gramsProtein: {
    type: Number,
  },
  gramsCarbohydrates: {
    type: Number,
  },
  gramsFat: {
    type: Number,
  },
  units: {
    type: Number,
  },
  unitType: {
    type: String,
    max: 100,
  },
  createdAt: {
    type: Date,
  },
});

Ingredients.attachSchema(Ingredients.schema);

Ingredients.publicFields = {
  name: 1,
  kcal: 1,
  gramsProtein: 1,
  gramsCarbohydrates: 1,
  gramsfat: 1,
  units: 1,
  unitType: 1,
  createdAt: 1,
};
