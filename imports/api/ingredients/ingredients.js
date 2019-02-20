import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Ingredients = new Mongo.Collection('ingredients');

Ingredients.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});


Ingredients.schema = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  name: {
    type: String,
    max: 100,
  },
  kcal: {
    type: Number,
  },
  protein: {
    type: Number,
  },
  carbohydrates: {
    type: Number,
  },
  fat: {
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
  protein: 1, 
  carbohydrates: 1, 
  fat: 1, 
  units: 1, 
  unitType: 1,  
  createdAt: 1,
};

