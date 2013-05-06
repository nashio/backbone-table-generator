// ModalView.js
// -------

define(["jquery", "backbone", "models/Dialog", "text!templates/dialog.html"],

    function($, Backbone, Dialog, dialogHTML){

        var View = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".dialog", 

            // View constructor
            initialize: function() {
                this.model = new Dialog();
                _.bindAll(this, "render");
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
                var form_data = this.$el.find("form").serializeArray();
                var new_obj = {};
                
                // Get the main collection
                var table = $(this.options.table_id).data("view").collection;

                // construct the proper object form
                _.each( form_data , function( field ){
                    new_obj[field.name] = field.value;
                });
                
                // apply modifications to the collection

                table.get( new_obj["id"] ).set( new_obj );

                
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