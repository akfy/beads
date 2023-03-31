var width = window.innerWidth;
var height = window.innerHeight;

var stage = new Konva.Stage({
  container: 'stage',
  width: width,
  height: height
});

var layer = new Konva.Layer();
stage.add(layer);

var cellSize = 20;
var gridX = 0;
var gridY = 0;

// рисуем сетку на слой
for (var i = gridX; i < width; i += cellSize) {
  layer.add(new Konva.Line({
    points: [i, gridY, i, height],
    stroke: '#ddd',
    strokeWidth: 1,
    opacity: 0.2
  }));
}

for (var j = gridY; j < height; j += cellSize) {
  layer.add(new Konva.Line({
    points: [gridX, j, width, j],
    stroke: '#000',
    strokeWidth: 1,
    opacity: 0.2
  }));
}

stage.on('click', function(event) {
  // округление координат до ближайшей точки сетки
  var x = Math.round((event.evt.offsetX - gridX) / cellSize) * cellSize + gridX;
  var y = Math.round((event.evt.offsetY - gridY) / cellSize) * cellSize + gridY;
    // var x = Math.round(x / gridSize) * gridSize;
    // var y = Math.round(y / gridSize) * gridSize;
  // проверка на то, что на этом месте нет бисеринки
  var isBeadHere = false;
  layer.find('Rect').forEach(function(rect) {
    if (rect.x() === x && rect.y() === y) {
      isBeadHere = true;
    }
  });

  if (!isBeadHere) {
    // создание бисеринки
    var bead = new Konva.Rect({
      x: x,
      y: y,
      width: cellSize,
      height: cellSize,
      fill: 'red',
      stroke: '#555',
      strokeWidth: 2,
      draggable: true
    });

    // добавление бисеринки на слой и на сцену
    layer.add(bead);
    stage.add(layer);

    bead.on('dragmove', function() {
      // определение новых координат бисеринки
      var newX = Math.round((this.x() - gridX) / cellSize) * cellSize + gridX;
      var newY = Math.round((this.y() - gridY) / cellSize) * cellSize + gridY;
      this.position({x: newX, y: newY});
      layer.draw();
    });

    bead.on('click', function() {
      this.remove();
      layer.draw();
    });
  }
});