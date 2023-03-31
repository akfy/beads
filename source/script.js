var width = 100;
var height = 100;

var stage = new Konva.Stage({
  container: 'stage',
  width: width,
  height: height
});

var layer = new Konva.Layer();
stage.add(layer);

var inputHeight = document.getElementById('height');
var inputWidth = document.getElementById('width');



var cellSizeWidth = parseInt(inputWidth.value, 10);
var cellSizeHeight = parseInt(inputHeight.value, 10);

var exCellSizeWidth = cellSizeWidth;
var exCellSizeHeight = cellSizeHeight;

inputHeight.addEventListener('change', function() {
  cellSizeHeight = parseInt(inputHeight.value, 10);
  console.log(cellSizeHeight);
});
inputWidth.addEventListener('change', function() {
  cellSizeWidth = parseInt(inputWidth.value, 10);
  console.log(cellSizeWidth);
});

var updateBtn = document.getElementById('generateGrid');
var gridX = 0;
var gridY = 0;


updateBtn.addEventListener('click', function() {
  updateGrid();
});
// inputWidth.addEventListener('change', function() {
//   buildGrid();
// });
buildGrid();


function updateGrid() {
  var cells = stage.find('Rect');
  cells.forEach(function (rect) {
    var currentX = rect.x();
    var currentY = rect.y();
    var newX = currentX + (cellSizeWidth - exCellSizeWidth);
    var newY = currentY + (cellSizeHeight - exCellSizeHeight);
    rect.x(newX);
    rect.y(newY);
    rect.width(cellSizeWidth);
    rect.height(cellSizeHeight);
    
    

  });
}

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

// var saveButton = document.getElementById('save');
// saveButton.addEventListener('click', function () {
//   var json = stage.toJSON();
//   console.log(json);
// });
// var loadButton = document.getElementById('load');
// loadButton.addEventListener('click', function () {
//   fetch('./image.json')
//     .then((response) => response.json())
//     .then((json) => {
//       stage = Konva.Node.create(json, 'stage');
//       // stage.add(layer);
//   });
    
// });



