import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Session } from 'meteor/session';
import '../../ui/layouts/body/body.js';
import '../../ui/layouts/ui_kit/ui_kit.js';
import '../../ui/pages/home/home.js';
import '../../ui/components/header/header.js'
import '../../ui/components/footer/footer.js'
import '../../ui/components/header/header.html'
import '../../ui/pages/not-found/not-found.js';
import '../../ui/components/side_nav/side_nav.js'

// FlowRouter.route('/', {
//   name: 'App.home',
//   action() {
//   	BlazeLayout.render('App_body', 
//   		{ 
//   			side_nav: 'side_nav',
//   			left_top: 'recipe_search_list', 
//   			left_bottom: '', 
//   			right_top: 'ingredient_list', 
//   			header: 'header' 
//   		})
//   },
// });

FlowRouter.route('/', {
  name: 'App.ui_kit_home',
  action() {
  	BlazeLayout.render('ui_kit', 
  		{ 
  			side_nav: 'side_nav',
  			main: 'recipe_search_list', 
  			header: 'header',
  			footer: 'header' 
  		})
  },
});

FlowRouter.route('/recipes', {
  name: 'App.ui_kit_ingredients',
  action() {
  	BlazeLayout.render('ui_kit', 
  		{ 
  			side_nav: 'side_nav',
  			main: 'recipe_search_list', 
  			header: 'header',
  			footer: 'header' 
  		})
  },
});

FlowRouter.route('/recipes/:_id', {
  name: 'App.ui_kit_recipe_show',
  action() {
  	BlazeLayout.render('ui_kit', 
  		{ 
  			side_nav: 'side_nav',
  			main: 'recipe_show', 
  			header: 'header',
  			footer: 'footer' 
  		})
  },
});


FlowRouter.route('/recipes/:_id/add-ingredient', {
  name: 'App.ui_kit_recipe_add_ingredients',
  action() {
  	BlazeLayout.render('ui_kit', 
  		{ 
  			side_nav: 'side_nav',
  			main: 'recipe_add_ingredient', 
  			header: 'header',
  			footer: 'header' 
  		})
  },
});


FlowRouter.route('/ingredients/:_id', {
  name: 'App.ui_kit_ingredients_show',
  action() {
  	BlazeLayout.render('ui_kit', 
  		{ 
  			side_nav: 'side_nav',
  			main: 'ingredient_show', 
  			header: 'header',
  			footer: 'header' 
  		})
  },
});


FlowRouter.route('/ingredients', {
  name: 'App.ui_kit_ingredients',
  action() {
  	BlazeLayout.render('ui_kit', 
  		{ 
  			side_nav: 'side_nav',
  			main: 'ingredient_search_list', 
  			header: 'header',
  			footer: 'header' 
  		})
  },
});

// FlowRouter.route('/recipes/:_id', {
//   name: 'Recipes.show',
//   action() {
//     BlazeLayout.render('App_body', 
//     	{
//   			side_nav: 'side_nav',
//   			left_top: 'recipe_search_list', 
//   			left_bottom: '', 
//   			right_top: 'recipe_show', 
//   			right_bottom: '',
//   			header: 'header'
//     	});
//   }
// });

// FlowRouter.route('/recipes/:_id/ingredients', {
//   name: 'Recipes.show',
//   action() {
//     BlazeLayout.render('App_body', 
//     	{
//   			side_nav: 'side_nav',
//   			left_top: 'ingredient_search', 
//   			left_bottom: '', 
//   			right_top: 'recipe_show', 
//   			right_bottom: '',
//   			header: 'header'
//     	});
//   }
// });

// FlowRouter.route('/recipes', {
//   action() {
//   	BlazeLayout.render('App_body', 
//   		{ 
//   			side_nav: 'side_nav',
//   			left_top: 'recipe_search_list', 
//   			left_bottom: '', 
//   			right_top: 'recipe_form', 
//   			header: 'header' 
//   		})
//   },
// });

// FlowRouter.route('/ingredients', {
//   name: 'Ingredients.list',
//   action() {
//   	BlazeLayout.render('App_body', 
//   		{ 
//   			side_nav: 'side_nav',
//   			left_top: 'ingredient_search_list', 
//   			left_bottom: '', 
//   			right_top: 'ingredient_form', 
//   			right_bottom: '', 
//   			header: 'header' 
//   		})
//   },
// });

// FlowRouter.route('/ingredients/:_id', {
//   name: 'Ingredients.show',
//   action() {
//     BlazeLayout.render('App_body', 
//   		{ 
//   			side_nav: 'side_nav',
//   			left_top: 'ingredient_search_list', 
//   			left_bottom: '', 
//   			right_top: 'ingredient_show', 
//   			header: 'header' 
//   		})
//   }
// });

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
