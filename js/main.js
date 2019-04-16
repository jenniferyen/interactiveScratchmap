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
    },
    defaultPlot: {
      attrs: {
        fill: "IndianRed",
        opacity: 1.0
      },
      attrsHover: {
        opacity: 1
      },
      text: {
        attrs: {
          fill: "#000"
        }, attrsHover: {
          fill: "#000"
        }
      }
    }
  },
  plots: {
    'barcelona': {
      type: "circle",
      size: 10,
      latitude: 41.38879,
      longitude: 2.15899,
      value: 700000,
      tooltip: {content: "<span style=\"font-weight:bold;\">City :</span> Barcelona"},
      text: {content: "Barcelona"},
      href: "https://en.wikipedia.org/wiki/Barcelona"
    },
    'berlin': {
      type: "circle",
      size: 10,
      latitude: 52.52437,
      longitude: 13.41053,
      value: 700000,
      tooltip: {content: "<span style=\"font-weight:bold;\">City :</span> Berlin"},
      text: {content: "Berlin"},
      href: "https://en.wikipedia.org/wiki/Berlin"
    },
    'edinburgh': {
      type: "circle",
      size: 10,
      latitude: 55.95206,
      longitude: -3.19648,
      value: 700000,
      tooltip: {content: "<span style=\"font-weight:bold;\">City :</span> Edinburgh"},
      text: {content: "Edinburgh"},
      href: "https://en.wikipedia.org/wiki/Edinburgh"
    },
    'taipei': {
      type: "circle",
      size: 10,
      latitude: 25.04776,
      longitude: 121.53185,
      value: 700000,
      tooltip: {content: "<span style=\"font-weight:bold;\">City :</span> Taipei"},
      text: {content: "Taipei"},
      href: "https://en.wikipedia.org/wiki/Taipei"
    }
  }
}

$(document).ready(function () {
  $(".mapcontainer").mapael(
    obj
  );
});
