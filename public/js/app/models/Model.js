// Model.js
// --------

define(["jquery", "backbone"],

    function($, Backbone) {

        // Creates a new Backbone Model class object
        var Model = Backbone.Model.extend({

            // Model Constructor
            initialize: function() {
                this.on( "change:all", this.render, this );
            },

            // Default values for all of the Model attributes
            defaults: {

            },

            render: function() {
                console.log( "model changed.");
            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {
                console.log(" Validating ", this.toJSON());
            }

        });

        // Returns the Model class
        return Model;

    }

);
