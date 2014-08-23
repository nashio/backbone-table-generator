// View.js
// -------
define(["jquery", "backbone", "app/helpers/load-data","text!templates/nav.html"],

    function($, Backbone, loader, navHTML){

        var View = Backbone.View.extend({

            tagName: "tfoot",

            // View constructor
            initialize: function() {
                this.app = require("app/app");
                this.total = this.options.config.total;
                this.config = this.options.config;
                this.page = this.options.page;
            },

            // View Event Handlers
            events: {
                "click .prev" : "prevPage",
                "click .next" : "nextPage",
            },

            // Handles row click
            prevPage : function(e) {
                e.preventDefault();

                if( this.page > 1 ){
                    this.page--;
                } else {
                    this.page = this.total;
                }
                Backbone.history.navigate('/page/' + this.page, true);

            },

            // Handles row click
            nextPage : function(e) {
                e.preventDefault();
                if( this.page < this.total ){
                    this.page++;
                } else {
                    this.page = 1;
                }

                Backbone.history.navigate('/page/' + this.page, true);
            },

            // Renders the view's template to the UI
            render: function() {
                // Compile the template, passing the model without the id included
                this.template = _.template(navHTML, {
                    page : this.page,
                    total : this.total
                });
                this.$el.html(this.template);
                return this;
            }

        });

        // Returns the View class
        return View;
    }

);