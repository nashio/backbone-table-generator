define(['routers/router'],
    function(router){

        // set a default page
        //var currentPage = Backbone.history.fragment || 1;
        var Loader = function(page, callback){
            var loader = $.ajax({
              "type": "GET",
              "url": "/data",
              "data": {
                page : page
              }
            });

            loader.done(callback);
            Backbone.history.navigate('/page/' + page, true);
        }
        return Loader;
    }
);