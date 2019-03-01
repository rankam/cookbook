import { Recipes } from "/imports/api/recipes/recipes.js";
import { Meteor } from "meteor/meteor";
import "./recipe_show.html";
import { deleteRecipe, upsertRecipe, removeIngredientFromRecipe } from "/imports/api/recipes/methods.js";
import { FlowRouter } from "meteor/kadira:flow-router";
import { ReactiveDict } from "meteor/reactive-dict";

Template.recipe_show.onCreated(function() {
  this.state = new ReactiveDict();
  Tracker.autorun(() => {
    FlowRouter.watchPathChange();
    let currentContext = FlowRouter.current();
    this.state.set("recipeId", currentContext.params["_id"]);
    this.state.set("path", currentContext.path);
    this.subscribe(
      "addIngredientToRecipe",
      currentContext.params["_id"]
    );    
  }); 
});

Template.recipe_show.onRendered(function() {});

Template.recipe_show.helpers({
  recipe() {
    const template = Template.instance();
    const recipeId = template.state.get("recipeId");
    template.subscribe("recipeShow", recipeId);

    const recipe = Recipes.findOne({ _id: recipeId });
    if (recipe) {
      recipe["kcalSum"] = 0;
      recipe.ingredients.map(ingredient => {
        recipe["kcalSum"] += ingredient.kcal;
      });
      return recipe
    }
    return {};
  },
  btnVisible() {
    const template = Template.instance();
    return false == template.state.get("path").indexOf("/ingredients") > -1
      ? ""
      : "hidden";
  }
});

Template.recipe_show.events({
  "click #editRecipeNameBtn": event => {
    event.preventDefault();
    const name = event.target.form.recipeName.value;
    const _id = event.target.form.recipeId.value;
    console.log(upsertRecipe.call({ _id, name }));
  },
  "click .add-ingredient": event => {
    event.preventDefault();
    const recipeId = FlowRouter.getParam("_id");

    FlowRouter.go(`/recipes/${recipeId}/ingredients`);
  },
  "click .trash": event => {
    const ingredientId = event.target.id;
    const recipeId = FlowRouter.getParam("_id")
    console.log(recipeId, " -> ", ingredientId)
    removeIngredientFromRecipe.call({recipeId, ingredientId})
  }
});
