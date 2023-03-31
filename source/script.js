var width = 1000;
var height = 1000;

var stage = new Konva.Stage({
  container: 'stage',
  width: width,
  height: height
});

var layer = new Konva.Layer();
stage.add(layer);

var cellSize = 50;
var gridX = 0;
var gridY = 0;

// рисуем сетку на слой!
for (var i = gridX; i < width; i += cellSize) {
  for (var j = gridY; j < height; j += cellSize) {
    var isEvenRow = Math.floor(j / cellSize) % 2 === 0;
    var offsetX = isEvenRow ? cellSize / 2 : 0;
    layer.add(new Konva.Rect({
      x: i + offsetX,
      y: j,
      width: cellSize,
      height: cellSize,
      fill: '#ccc',
      stroke: '#000',
      strokeWidth: 1,
      opacity: 0.5
    }));
  }
}


stage.on('mousedown touchstart', function () {
  isPaint = true;
  lastPointerPosition = stage.getPointerPosition();
});

stage.on('mouseup touchend', function () {
  isPaint = false;
});

stage.on('mousemove touchmove', function (event) {
  if (isPaint){
    event.target.fill('#000');
  }
});

stage.on('click', function(event) {
  
  
  

  console.log(event.target.fill());
  event.target.fill('#000');
  event.target.on('dragmove', function() {
      console.log('drug')
      });
});