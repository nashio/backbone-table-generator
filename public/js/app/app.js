define(["jquery", "app/helpers/load-data", "backbone", "views/main-view", "collections/Collection"],
  function($, loader, Backbone, MainView, Collection ){

    var App =  function(page){
      var collection;
      var tableView;
      loader(page, function(data){
        // setup collection and assign data
        collection = new Collection(data.rows);
        // create main view
        tableView = new MainView({
          page : page,
          config : data.config,
          collection : collection
        });
      });
    }

    return App;

});