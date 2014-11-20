$(document).ready(function(){
  populate()
  bindListeners()
});

function bindListeners(){
  $("#wrapper").on("click", ".cell", placeCell)
  $("#bottom-bar").on("click", "#play", play)
  $("#bottom-bar").on("click", "#stop", stop)
  $("#bottom-bar").on("click", "#reset", reset)
}

function placeCell(e){
  e.preventDefault()
  this.className = this.className + " live"
}

function sizeWrapper(){
  $("#wrapper").css()
}

function populate(){
  var cellSize = 10
  cellsH = Math.floor(window.innerHeight/cellSize)
  cellsW = Math.floor(window.innerWidth/cellSize)
  $("#wrapper").css("width", cellsW*cellSize+"px");
  $("#wrapper").css("height",cellsH*cellSize+"px");
  for (var i = 0; i < cellsH*cellsW; i++) {
    $("#wrapper").append("<div class='cell' id="+i+"></div>")
  }
  $(".cell").css("height",cellSize+"px");
  $(".cell").css("width",cellSize+"px");
}

function start(){
  if ($(".live").length==0){
    window.clearInterval(inter);
    console.log("stoped")
  }
  live = [];
  die = [];
  var cells = $(".cell")
  for( i = 0; i<cells.length; i++){
    checkCells(cells[i]);
  }
  giveLife();
}

function checkCells(cell){
  var counter = 0;
  counter += checkCell(cell, -(cellsW+1));
  counter += checkCell(cell, -cellsW);
  counter += checkCell(cell, -(cellsW-1));
  counter += checkCell(cell, -1);
  counter += checkCell(cell, 1);
  counter += checkCell(cell, cellsW+1);
  counter += checkCell(cell, cellsW);
  counter += checkCell(cell, cellsW-1)
  evalCounter(cell,counter)
}

function checkCell(cell, num){
  var thisCell=$("#"+(parseInt(cell.id)+num))[0]
  if(thisCell && thisCell.className=="cell live"){
    return 1;
  }
  else{
    return 0
  }
}

function evalCounter(cell, count){
  if(count<2 && cell.className=="cell live"){die.push(cell)}
  else if(count==3 && cell.className=="cell"){live.push(cell)}
  else if(count>3 && cell.className=="cell live"){die.push(cell)}
}

function giveLife(){
  for(var i = 0; i<live.length; i++){
    live[i].className="cell live"
  }
  giveDeath();
}

function giveDeath(){
  for(var i = 0; i<die.length; i++){
    die[i].className="cell"
  }
}

function play(e){
  e.preventDefault();
  inter = setInterval("start()", 200);
}

function stop(e){
  e.preventDefault();
  window.clearInterval(inter);
}

function reset(e){
  e.preventDefault();
  $('.live').removeClass('live');
}

function test(e){
 e.preventDefault();
 debugger
}
