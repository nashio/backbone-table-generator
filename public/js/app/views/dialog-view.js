// dialog-view.js


define(["jquery", "backbone", "models/dialog", "text!templates/dialog.html"],

    function($, Backbone, Dialog, dialogHTML){

        var View = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".dialog",

            // View constructor
            initialize: function() {
                _.bindAll(this);
                this.model = new Dialog();
                this.collection = this.options.collection;
                this.model.bind('change', this.render);
                this.render();
            },

            // View Event Handlers
            events: {
                "click button.save" : "handleClick"
            },

            // Handles row click
            handleClick : function(e) {
                // Get the fields from the form
                var formData = this.$el.find("form").serializeArray();
                var o = {};

                // construct the proper object form
                _.each( formData , function( field ){
                    o[field.name] = field.value;
                });
                // apply modifications to the collection
                this.collection.get( o['id'] ).set( o );

                $('.dialog #myModal').modal("hide");
                return false;
            },

            // Renders the view's template to the UI
            render: function() {
                // Setting the view's template property using the Underscore template method
                this.template = _.template(dialogHTML, { rows : this.model.toJSON() } );

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

                // Maintains chainability
                return this;

            }

        });

        // Returns the View class
        return View;

    }

);