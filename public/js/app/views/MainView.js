// View.js
// -------
define(["jquery", "backbone", "views/RowView", "views/DialogView", "views/navView"],

    function($, Backbone, RowView, DialogView, NavView ){

        var View = Backbone.View.extend({

            // View constructor
            initialize: function() {
                this.config = this.options.config; // Get config options
                this.el = this.config.table_id;                
                
                this.addDialog(); // Create Dialog view and Insert into DOM
                this.cacheHead(); // create columns
                this.cacheNav(); // create pagination 

                // Binds
                this.collection.bind("reset", this.renderContents, this);

                this.renderContents();

            },           

            renderContents : function(){
                this.cacheBody(); // create table rows 
                this.render();
            },

            // Inserts dialog modal in the dom
            addDialog: function() {
                $(this.el).after("<div class='dialog'></div>")
                var dialogView = new DialogView({ table_id : this.config.table_id });
                $(".dialog").data("view", dialogView );
            },

            cacheHead : function(){
                var that = this;
                this.head = "";
                _.each(this.config.columns, function(column) {
                    that.head += "<th>"+column+"</th>";
                });
            },

            // Extracts models from collection to render rows individually
            cacheBody: function() {
                var that = this;
                this.rows = [];

                this.collection.each(function(model) {

                    // Create the table rows and put into an array
                    var _rowView = new RowView( {   
                        model : model
                    });

                    that.rows.push( _rowView );
                });
            },

            cacheNav: function(){
                // Pass parameters to navigation, (aka pagination)
                this.nav = new NavView( { config : this.config } );     
            },  

            // Renders the view's template to the UI
            render: function() {
                var that = this;
                
                // Insert Table Head

                // Just do it once
                if( $(this.el+">tbody").length === 0 ){
                    $(this.el).append("<thead>"+this.head+"</thead>");
                }

                // Render and insert body
                $(this.el+" tbody").empty();
                _.each(this.rows, function(row) {
                    $(that.el).append(row.render().el);
                });

                // Render and insert navigation
                $(this.el).append(this.nav.render().el);

                // Maintains chainability
                return this;

            }

        });

        // Returns the View class
        return View;

    }

);