import { Meteor } from 'meteor/meteor';
import { ReactiveDict } from 'meteor/reactive-dict'
import './header.html';
import { Template } from 'meteor/templating';


Template.header.onCreated(function () {
  this.state = new ReactiveDict;
  this.state.set('isActiveId', 1);
});

Template.header.helpers({
  isActive() {
 	// not woring
    return 1 === Template.instance().state.get('isActiveId') ? 'active' : '';
  }
});

Template.header.events({
  'click .item': function 	(event, t) {
  	const instance = Template.instance();
  	const ids = [1,2,3];
  	for (var i in ids) {
  		const idNum = ids[i]
  		var id = '#' + idNum
  		var el = instance.find(id)
  		if (idNum == event.target.id && !el.classList.contains('active')) {
  			el.classList.toggle('active')
  		} else if (idNum != event.target.id && el.classList.contains('active')) {
  			el.classList.toggle('active')
  		}

  		
  	}
  	Template.instance().state.set('isActiveId', event.target.id);
  }
});
