import { Ingredients } from '/imports/api/ingredients/ingredients.js';
import { Meteor } from 'meteor/meteor';
import './ingredient_show.html';
import { deleteIngredient, upsertIngredient } from '/imports/api/ingredients/methods.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.ingredient_show.onCreated(function () {
});

Template.ingredient_show.rendered = function() {
  this.$('.ui.dropdown').dropdown();
};

Template.ingredient_show.helpers({
  ingredient() {
    const ingredientId = FlowRouter.getParam('_id');
    var i = Ingredients.find({_id:ingredientId}).fetch()
    return i[0]
  }
});

Template.ingredient_show.events({
	'click #submitFormBtn': (event) => {
	event.preventDefault();
	const _id = event.target.form.ingredientId.value;
    const name = event.target.form.ingredientName.value;
    const kcal = event.target.form.kcal.value;
    const gramsFat = event.target.form.gramsFat.value;
    const gramsProtein = event.target.form.gramsProtein.value;
    const gramsCarbohydrates = event.target.form.gramsCarbohydrates.value;
    const units = event.target.form.units.value;
    const unitType = event.target.form.unitType.value;
    const ingredient = upsertIngredient.call({ _id, name, kcal, gramsFat, gramsProtein, gramsCarbohydrates, units, unitType})
    console.log('Upserted ', ingredient)
	}
});
