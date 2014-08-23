// Collection.js
// -------------
define(["backbone","models/Model"],

  function(Backbone, Model) {

    // Creates a new Backbone Collection class object
    var Collection = Backbone.Collection.extend({

      // Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
      model: Model,

      initialize: function(){

        // test bindings
        // TODO: change to listenTo
      	this.on( "change:firstname", function(){ console.log("changed firstname"); });
      	this.on( "change:lastname", function(){ console.log("changed lastname"); });
      }

    });

    // Returns the Model class
    return Collection;

  }

);