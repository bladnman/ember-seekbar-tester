import Ember from 'ember';

export default Ember.Component.extend({

  init : function () {
    this._super();
    console.log("first");
    Ember.run(function() {
      console.log("when?");
    });
    console.log("later?");
  },
  tryMe : function () {
    // body...
  }.property('this')



});
