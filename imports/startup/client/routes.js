import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Session } from 'meteor/session';
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/components/header/header.js'
import '../../ui/components/header/header.html'
import '../../ui/pages/not-found/not-found.js';

FlowRouter.route('/', {
  name: 'App.home',
  action() {
  	BlazeLayout.render('App_body', 
  		{ 
  			left_top: 'recipe_search_list', 
  			left_bottom: '', 
  			right_top: 'ingredient_list', 
  			header: 'header' 
  		})
  },
});

FlowRouter.route('/recipes/:_id', {
  name: 'Recipes.show',
  action() {
    BlazeLayout.render('App_body', 
    	{
  			left_top: 'recipe_search_list', 
  			left_bottom: '', 
  			right_top: 'recipe_show', 
  			right_bottom: '',
  			header: 'header'
    	});
  }
});

FlowRouter.route('/recipes/:_id/ingredients', {
  name: 'Recipes.show',
  action() {
    BlazeLayout.render('App_body', 
    	{
  			left_top: 'ingredient_search', 
  			left_bottom: '', 
  			right_top: 'recipe_show', 
  			right_bottom: '',
  			header: 'header'
    	});
  }
});

FlowRouter.route('/recipes', {
  action() {
  	BlazeLayout.render('App_body', 
  		{ 
  			left_top: 'recipe_search_list', 
  			left_bottom: '', 
  			right_top: 'recipe_form', 
  			header: 'header' 
  		})
  },
});

FlowRouter.route('/ingredients', {
  name: 'Ingredients.list',
  action() {
  	BlazeLayout.render('App_body', 
  		{ 
  			left_top: 'ingredient_search_list', 
  			left_bottom: '', 
  			right_top: 'ingredient_form', 
  			right_bottom: '', 
  			header: 'header' 
  		})
  },
});

FlowRouter.route('/ingredients/:_id', {
  name: 'Ingredients.show',
  action() {
    BlazeLayout.render('App_body', 
  		{ 
  			left_top: 'ingredient_search_list', 
  			left_bottom: '', 
  			right_top: 'ingredient_show', 
  			header: 'header' 
  		})
  }
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
