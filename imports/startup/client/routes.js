import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/ingredients/ingredients.js';
import '../../ui/pages/recipe-recipe-show/recipe-recipe-show.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
  	this.render('App_body', { main: 'App_home' })
  },
});

FlowRouter.route('/recipes/:_id', {
  name: 'Recipes.show',
  action() {
  	console.log(FlowRouter.getParam('_id'))
    this.render('App_recipe_recipe_show');
    // this.render('App_body', {main: 'App_recipe_recipe_show'});
  }
});

FlowRouter.route('/recipes', {
  name: 'Recipes.list',
  action() {
  	console.log('looking for recipes')
    this.render('App_body', {main: 'recipe_list'});
  }
});

FlowRouter.route('/ingredients/create', {
  name: 'Ingredients.create',
  action() {
    this.render('App_body', {main: 'ingredient_form'});
  }
});

FlowRouter.route('/ingredients', {
  name: 'Ingredients.list',
  action() {
    this.render('App_body', {main: 'App_ingredients'});
  }
});

FlowRouter.notFound = {
  action() {
    this.render('App_body', { main: 'App_notFound' });
  },
};
