import './ingredient_form.html';
import { $ } from 'meteor/jquery';
import { _ } from 'meteor/underscore';
import { insertIngredient } from '/imports/api/ingredients/methods.js';
import { Template } from 'meteor/templating';

Template.ingredient_form.onCreated(function recipeOnCreated() {

});

Template.ingredient_form.rendered = function() {
  this.$('.ui.dropdown').dropdown();
};

Template.ingredient_form.helpers({
});

Template.ingredient_form.events({
  'click #submitFormBtn': function (event) {
    event.preventDefault();
    const name = event.target.form.ingredientName.value;
    const kcal = event.target.form.kcal.value;
    const gramsFat = event.target.form.gramsFat.value;
    const gramsProtein = event.target.form.gramsProtein.value;
    const gramsCarbohydrates = event.target.form.gramsCarbohydrates.value;
    const units = event.target.form.units.value;
    const unitType = event.target.form.unitType.value;
    const newIngredient = insertIngredient.call({name, kcal, gramsFat, gramsProtein, gramsCarbohydrates, units, unitType})
    return
  },
  'click .menu': function(event) {
    console.log(event)

  }
});
