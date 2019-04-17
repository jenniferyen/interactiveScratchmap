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
      }
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
    'Bora Bora': {
      type: "circle",
      size: 15,
      latitude: -16.499701,
      longitude: -151.770538,
      value: 700000,
      tooltip: {content: "Bora Bora"},
      href: "animations/fish"
    },
    'Masai Mara Reserve, Kenya': {
      type: "circle",
      size: 15,
      latitude: 1.3210,
      longitude: 34.9714,
      value: 700000,
      tooltip: {content: "Masai Mara Reserve, Kenya"},
      href: "animations/lion"
    }
  }
}

$(document).ready(function () {
  $(".mapcontainer").mapael(
    obj
  );
});
