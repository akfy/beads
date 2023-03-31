var width = 500;
var height = 500;
var gridX = 0;
var gridY = 0;

var stage = new Konva.Stage({
  container: 'stage',
  width: width,
  height: height
});

var layer = new Konva.Layer();
stage.add(layer);




var inputHeight = document.getElementById('height');
var inputWidth = document.getElementById('width');
var updateBtn = document.getElementById('generateGrid');

var cellSizeWidth = parseInt(inputWidth.value, 10);
var cellSizeHeight = parseInt(inputHeight.value, 10);

inputHeight.addEventListener('change', function() {
  cellSizeHeight = parseInt(inputHeight.value, 10);
  
});
inputWidth.addEventListener('change', function() {
  cellSizeWidth = parseInt(inputWidth.value, 10);
  
});





updateBtn.addEventListener('click', function() {
  
  buildGrid(); 
});



function buildGrid() {
  for (var i = gridX; i < width; i += cellSizeWidth) {
    for (var j = gridY; j < height; j += cellSizeHeight) {
      var isEvenRow = Math.round(j / cellSizeHeight) % 2 === 0;
    
      var offsetX = isEvenRow ? cellSizeWidth / 2 : 0;
      layer.add(new Konva.Rect({
        x: i + offsetX,
        y: j,
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



// рисуем сетку на слой!



var isPaint = false;

var mode = 'brush';


var colorSelector = document.getElementById('html5colorpicker');
colorSelector.addEventListener('change', function () {
  color = colorSelector.value;


});

var color = colorSelector.value;


stage.on('mousedown touchstart', function () {
  isPaint = true;
  
});

stage.on('mouseup touchend', function () {
  isPaint = false;
});

stage.on('mousemove touchmove', function (event) {
  if (isPaint){
    

    if (mode === 'eraser') {
      color = '#ccc'

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





