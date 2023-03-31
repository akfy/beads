var width = innerWidth;
var height = innerHeight;
var gridX = 0;
var gridY = 0;

var stage = new Konva.Stage({
  container: 'stage',
  width: width,
  height: height
});

var layer = new Konva.Layer();
stage.add(layer);

var numRows = 10;
var numColumns = 10;

var inputHeight = document.getElementById('height');
var inputWidth = document.getElementById('width');
var inputRows = document.getElementById('rows');
var inputColumns = document.getElementById('columns');
var updateBtn = document.getElementById('generateGrid');

var cellSizeWidth = parseInt(inputWidth.value, 10);
var cellSizeHeight = parseInt(inputHeight.value, 10);

inputHeight.addEventListener('change', function() {
  cellSizeHeight = parseInt(inputHeight.value, 10);
});

inputWidth.addEventListener('change', function() {
  cellSizeWidth = parseInt(inputWidth.value, 10);
});

inputRows.addEventListener('change', function() {
  numRows = parseInt(inputRows.value, 10);
});

inputColumns.addEventListener('change', function() {
  numColumns = parseInt(inputColumns.value, 10);
});

updateBtn.addEventListener('click', function() {
  layer.destroyChildren();
  buildGrid();
});

function buildGrid() {
  for (var i = 0; i < numColumns; i++) {
    for (var j = 0; j < numRows; j++) {
      var isEvenRow = j % 2 === 0;
      var offsetX = isEvenRow ? cellSizeWidth / 2 : 0;
      layer.add(new Konva.Rect({
        x: i * cellSizeWidth + offsetX,
        y: j * cellSizeHeight,
        width: cellSizeWidth,
        height: cellSizeHeight,
        fill: '#ccc',
        stroke: '#000',
        strokeWidth: 1,
        opacity: 1
      }));
    }
  }
}

var isPaint = false;
var mode = 'brush';
var colorSelector = document.getElementById('html5colorpicker');
var color = colorSelector.value;

colorSelector.addEventListener('change', function () {
  color = colorSelector.value;
});

stage.on('mousedown touchstart', function () {
  isPaint = true;
});

stage.on('mouseup touchend', function () {
  isPaint = false;
});
stage.on('mousemove touchmove', function (event) {
  if (isPaint){
    if (mode === 'eraser') {
      color = '#ccc';
    }
    event.target.fill(color);
  }
});
stage.on('click', function(event) {
  event.target.fill(color);
});
var select = document.getElementById('tool');
select.addEventListener('change', function () {
  mode = select.value;
  color = colorSelector.value;
});
