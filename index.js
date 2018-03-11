lookups = {}
      function createSelector(layer, vis) {
        var sql = new cartodb.SQL({ user: 'documentation' });
        var $options = $('#layer_selector li');
        $options.click(function(e) {
          var $li = $(e.target);
          var subl = $li.attr('data');
          $options.removeClass('selected');
          $li.addClass('selected');
     
            console.log(subl)

            var num_sub = vis.getLayers()[1].getSubLayerCount()
            for (var i=0; i < num_sub; i++) {
                var subLa = vis.getLayers()[1].getSubLayer(i);
                console.log(subLa["_position"],lookups,lookups[subl],subl)
                subLa.hide()
                if (subLa["_position"] == lookups[subl]) {
                    subLa.show();
                

                } 
            }
        });
      }
      function main() {
        cartodb.createVis('map', 'https://arminavn.carto.com/api/v2/viz/5804b6df-ca1e-4ca2-b152-2e4a475c1b93/viz.json', {
          tiles_loader: true,
          zoom: 4
        })
        .done(function(vis, layers) {
          
          var num_sublayers = layers[1].getSubLayerCount();
          console.log(" sublayers in layers ",num_sublayers);
          for (var i=0; i < num_sublayers; i++) {
            var subLayer = layers[1].getSubLayer(i);
            console.log("sublayers position on creation", subLayer["_position"])
            console.log("sublayers info windo fields ", subLayer["infowindow"]["attributes"]["fields"][0]["name"])
            lookups[subLayer["infowindow"]["attributes"]["fields"][0]["name"]] = subLayer["_position"]
            console.log(subLayer)
            if (subLayer["_position"] == lookups["held_in_alternative_bond_systems"]) {
                subLayer.show();
            } else {
                subLayer.hide()
            }
          }
          createSelector(subLayer,vis);
        })
        .error(function(err) {
          console.log(err);
        });
      }
      window.onload = main;