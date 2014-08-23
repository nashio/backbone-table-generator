// View.js
// -------
define(["jquery", "backbone", "text!templates/row.html"],

    function($, Backbone, rowHTML){

        var View = Backbone.View.extend({

            tagName: "tr",

            initialize: function() {
                this.model.bind("change", this.render, this )
            },

            events: {
                "click td:not(.remove)" : "handleRow",
                "click td.remove" : "removeRow"
            },

            handleRow : function(e) {
                var dialogView = $('.dialog').data("view");
                dialogView.model.set( this.model.toJSON() );
                $('.dialog #myModal').modal("show");
            },

            removeRow : function(e) {
                e.preventDefault();
                this.model.trigger('delete', this.model);
            },

            render: function() {

                // Compile the template, passing the model without the id, status
                this.template = _.template(rowHTML, {
                    row : _.omit(this.model.toJSON(), 'id', 'status')
                });

                this.$el.html(this.template);

                return this;
            }

        });

        // Returns the View class
        return View;

    }

);