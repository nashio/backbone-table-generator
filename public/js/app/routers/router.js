// router.js
// ----------------
define(["jquery", "backbone", "app/config/loader"],
        
    function($, Backbone, loader) {

        var Router = Backbone.Router.extend({

            initialize: function() {

                // Tells Backbone to start watching for hashchange events
                Backbone.history.start();

            },

            // All of your Backbone Routes (add more)
            routes: {
                
                // When there is no hash on the url, the home method is called
                "": "index"

            },

            index: function() {

                // Loads data from server and creates main view
                loader({ page : 1 });
            }
    
        });

        // Returns the router class
        return Router;

    }

);