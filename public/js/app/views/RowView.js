// View.js
// -------
define(["jquery", "backbone", "text!templates/row.html"],

    function($, Backbone, rowHTML){

        var View = Backbone.View.extend({

            // The DOM Element associated with this view
            tagName: "tr",

            // View constructor
            initialize: function() {
                this.model.bind("change", this.render, this )
            },

            // View Event Handlers
            events: {
                "click td" : "handleRow"
            },

            // Handles row click
            handleRow : function(e) {
                var dialogView = $('.dialog').data("view");
                dialogView.model.set( this.model.toJSON() );
                
                // Display the modal
                $('.dialog #myModal').modal("show"); 
            },

            // Renders the view's template to the UI
            render: function() {

                // Compile the template, passing the model without the id included

                this.template = _.template(rowHTML, { row : _.omit(this.model.toJSON(), 'id') } );

                this.$el.html(this.template);

                return this;                
            }

        });

        // Returns the View class
        return View;

    }

);