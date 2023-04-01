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
var undoBtn = document.getElementById('undo');

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
  saveHistory();
});

undoBtn.addEventListener('click', function() {
  undo()
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

//appHistory
var appHistory = [];
var historyIndex = -1;
var maxHistoryLength = 10;

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
  //save history
  saveHistory();
});
var select = document.getElementById('tool');
  select.addEventListener('change', function () {
    mode = select.value;
    color = colorSelector.value;
});

function saveHistory() {
  // Remove any future appHistory
  appHistory.splice(historyIndex + 1, appHistory.length - historyIndex - 1);
  // Add current state to appHistory
  appHistory.push(layer.toJSON());
  // Limit appHistory length
  if (appHistory.length > maxHistoryLength) {
   appHistory.shift();
  }
  // Update appHistory index
  historyIndex = appHistory.length - 1;
}

function undo() {
  if (historyIndex > 0) {
    historyIndex--;
    layer.destroyChildren();
    var historyJSON = appHistory[historyIndex];
    if (historyJSON) {
      try {
        var nodes = Konva.Node.create(historyJSON);
        if (nodes) { // проверяем, что nodes был успешно создан
          
          var rects = nodes.getChildren(function(node){
            return node.getClassName() === 'Rect';
          });
         console.log(rects);
          for (var i = 0; i < rects.length; i++) {
            layer.add(rects[i]);
          }
          layer.draw();
        } else {
          console.error('Failed to create nodes from history');
        }
      } catch (error) {
        console.error('Error creating nodes from history:', error);
      }
    } else {
      console.error('History data is undefined');
    }
  }
}