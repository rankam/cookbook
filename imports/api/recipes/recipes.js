import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Recipes = new Mongo.Collection('recipes');

Recipes.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});


Recipes.schema = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  name: {
    type: String,
    max: 100,
  },
  createdAt: {
    type: Date,
  },
});

Recipes.attachSchema(Recipes.schema);

Recipes.publicFields = {
  name: 1,
  createdAt: 1,
};

