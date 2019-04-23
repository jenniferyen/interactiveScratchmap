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
        fill: "#28587B",
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
        fill: "#ffae1a",
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
  areas: {
    'RU': {
      attrs: {
        fill: "#C03221"
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
      href: "/animations/fish"
    },
    'Masai Mara Reserve, Kenya': {
      type: "circle",
      size: 15,
      latitude: 1.3210,
      longitude: 34.9714,
      value: 700000,
      tooltip: {content: "Masai Mara Reserve, Kenya"},
      href: "/animations/lion"
    }
  }
}

obj.map.defaultArea.eventHandlers.dblclick = function (e, id, mapElem, textElem) {
  var newData = {
    'areas': {}
  };
  // if color is original, change to new
  if (mapElem.originalAttrs.fill == "#28587B") {
    newData.areas[id] = {
      attrs: {
        fill: "#C03221"
      }
    };
  // if color is new, change to original
  } else {
    newData.areas[id] = {
      attrs: {
        fill: "#28587B"
      }
    }
  }
  $(".mapcontainer").trigger('update', [{mapOptions: newData}])
}

$(document).ready(function () {
  $(".mapcontainer").mapael(
    obj
  )
})
