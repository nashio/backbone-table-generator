define(["jquery", "backbone", "views/MainView", "collections/Collection"], 
  function($, Backbone, MainView, Collection ){
    
    return function(config){

      var loader = $.ajax({
        "type" : "GET",
        "url" : "/data",
        "data" : { page : config.page }
      });

      loader.done(function(data){
        var table_id = "table"+data.config.table_id;

        if(typeof($(table_id).data("view")) === "undefined" ){
          console.log("creating new collection + view");
          var collection = new Collection(data.rows);
          var table_view = new MainView({ 
            config : data.config,
            collection : collection 
          });
          $(table_id).data("view", table_view); // attach it to the DOM 
        } else {
          $(table_id).data("view").collection.reset(data.rows);
        }

      });
    }


    
});