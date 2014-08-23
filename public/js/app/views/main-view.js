// main-view.js
// -------
define(["jquery", "backbone", "views/row-view", "views/dialog-view", "views/nav-view"],

    function($, Backbone, RowView, DialogView, NavView ){

        var View = Backbone.View.extend({

            // View constructor
            initialize: function() {
                this.config = this.options.config; // Get config options
                this.el = this.config.table_id;
                this.listenTo(this.collection, 'delete', this.delete);
                this.listenTo(this.collection, 'remove', this.render);
                this.render();
            },

            prerenderMarkup: function(){
                // Construct table, head, navigation and modal
                this.cacheHead();
                this.cacheNav();
                this.cacheBody();
                this.cacheDialog();
            },

            delete: function(model, e){
                this.collection.remove(model);
            },

            renderContents : function(){
                //this.render();
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
                var rowView;

                this.collection.each(function(model) {
                    // Create the table rows and put into an array
                    var rowView = new RowView( {
                        model : model
                    });
                    that.rows.push( rowView );
                });

            },

            cacheNav: function(){
                // Pass parameters to navigation, (aka pagination)
                this.nav = new NavView({
                    page : this.options.page,
                    config : this.config
                });
            },

            // creates modal window
            cacheDialog: function() {
                var dialogCached = $(".dialog").data("view");

                // First time , create View
                if ( !dialogCached ){
                    $(this.el).after("<div class='dialog'></div>")
                    var dialogView = new DialogView({
                        table_id : this.config.table_id
                    });
                    dialogView.collection = this.collection;
                    $(".dialog").data("view", dialogView );
                } else {
                    // Second time, just update the collection
                    dialogCached.collection = this.collection;
                }

            },

            // Renders the view's template to the UI
            render: function() {

                var that = this;
                this.prerenderMarkup();

                // Don't re-render
                if( $(this.el + ">tbody").length === 0 ){
                    $(this.el).append("<thead>" + this.head + "</thead>");
                }

                // Render and insert body
                $(this.el + " tbody").empty();
                _.each(this.rows, function(row) {
                    $(that.el).append(row.render().el);
                });

                // Render and insert navigation
                $(this.el + " tfoot").empty();
                $(this.el).append(this.nav.render().el);

                // Maintains chainability
                return this;
            }

        });

        // Returns the View class
        return View;

    }

);