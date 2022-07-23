
import Renderer from './GUI/renderGraph.js';


console.log(4);

let grapher = new Renderer();
// grapher.drawCoords();
grapher.createNode(500, 500, 'red', 50);

function placeNodeAtMouse(e) {
  var xPos = e.clientX;
  var yPos = e.clientY;
  grapher.createNode(xPos, yPos, 'red', 50)
}

document.addEventListener("click", placeNodeAtMouse);
document.addEventListener("click", grapher.onClickNode);