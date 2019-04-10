var obj =
{
  map: {
    name: "world_countries_mercator",
    zoom: {
      enabled: true,
      maxLevel: 20,
    },
    defaultArea: {
      attrs: {
        fill: "AliceBlue",
        stroke: "#99c7ff",
        cursor: "pointer"
      },
      attrsHover: {
        fill: "#ffae1a"
      },
      eventHandlers: {
        dblclick: function (e, id, mapElem, textElem) {
          var newData = {
            'areas': {}
          };
          // if color is original, change to new
          if (mapElem.originalAttrs.fill == "AliceBlue") {
            newData.areas[id] = {
              attrs: {
                fill: "LightSeaGreen"
              }
            };
          // if color is new, change to original
          } else {
            newData.areas[id] = {
              attrs: {
                fill: "AliceBlue"
              }
            };
          }
          $(".mapcontainer").trigger('update', [{mapOptions: newData}]);
        }
      },
    }
  }
}

$(document).ready(function () {
  $(".mapcontainer").mapael(
    obj
  );
});
