import './ingredient_form.html';
import { $ } from 'meteor/jquery';
import { _ } from 'meteor/underscore';
import { insertIngredient } from '/imports/api/ingredients/methods.js';
import { Template } from 'meteor/templating';

Template.ingredient_form.onCreated(function recipeOnCreated() {

});

Template.ingredient_form.rendered = function() {
  this.$('.ui.dropdown').dropdown({on: 'hover'});
};

Template.ingredient_form.helpers({
});

Template.ingredient_form.events({
  'click #submitFormBtn': function (event) {
    event.preventDefault();
    const name = event.target.form.ingredientName.value;
    const kcal = event.target.form.kcal.value;
    const fat = event.target.form.fat.value;
    const protein = event.target.form.protein.value;
    const carbohydrates = event.target.form.carbohydrates.value;
    const units = event.target.form.units.value;
    const unitType = event.target.form.unitType.value;
    const newIngredient = insertIngredient.call({name, kcal, fat, protein, carbohydrates, units, unitType})
    // event.preventDefault();
    // const instance = Template.instance()
    // const recipeName = instance.$("#recipeName").val();
    // const newRecipe = insertRecipe.call({name: recipeName})
    return
  }
});
