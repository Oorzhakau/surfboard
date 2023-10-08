let myMap;

const init = () => {
  myMap = new ymaps.Map("map", {
    center: [55.752, 37.576],
    zoom: 14,
    controls: []
  });

  const coords = [
    [55.752004, 37.576133]
  ];

  const myCollection = new ymaps.GeoObjectCollection({}, {
    draggable: false, 
    iconLayout: 'default#image',
    iconImageHref: "./img/icons/map-marker.svg",
    iconImageSize: [46, 57],
    iconImageOffSet: [-35, -52]
  })
  
  coords.forEach(coord => {
    myCollection.add(new ymaps.Placemark(coord));
  })
  myMap.geoObjects.add(myCollection);
  myMap.behaviors.disable('scrollZoom');
};

ymaps.ready(init);