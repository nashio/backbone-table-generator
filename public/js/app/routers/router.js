// router.js
// ----------------
define(["jquery", "backbone", "app/app"],

    function($, Backbone, app) {

        var Router = Backbone.Router.extend({

            initialize: function() {
                Backbone.history.start();
            },

            routes: {
                "" : "index",
                "page/:id": "index"
            },

            index: function(id){
                app(id || 1);
            }

        });

        // Returns the router class
        return Router;

    }

);