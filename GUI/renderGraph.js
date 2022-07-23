import Two from 'https://cdn.skypack.dev/two.js@latest';
import Graph from '../data structures/graph.js';

class Renderer {

    constructor(){
        this.elem = document.getElementById('draw-shapes');
        this.two = new Two({ fitted: true }).appendTo(this.elem);

        this.centerX = window.innerWidth / 2;
        this.centerY = window.innerHeight / 2;

        this.styles = {
            size: 12,
            family: 'Lato'
          }

          this.texts = [];

          this.graph = new Graph();

          this.nodeGroup = this.two.makeGroup();
          this.nodeSize = 25;
          
          
    }

    drawCoords(){
        let increment = 100;

        for(let i = 0; i < window.innerHeight/increment; i++){
            for(let j = 0; j < window.innerWidth/increment; j++){
                this.texts.push(this.two.makeText((j*increment).toString() + ", " + (i*increment).toString(), j*increment, i*increment, this.styles));
            }
        }

        this.two.update();

    }

    updateNodes(){
        this.two.update();
    }

    createNode(x, y, color, value){
        this.graph.addNode(x, y, value);
        
        let circle = this.two.makeCircle(x, y, this.nodeSize);
        circle.fill = color;
        circle.noStroke;
        this.nodeGroup.add(circle);
        this.two.update();

    }

    clickOnNode(e){
        var xPos = e.clientX;
        var yPos = e.clientY;
        console.log(this.graph.nodes);
        for(n in this.graph.nodes){
            console.log(n);
        }


    }
    


    drawTestShapes(){
        var circle = this.two.makeCircle(this.centerX, this.centerY, 75);
        circle.fill = 'yellow';
        circle.noStroke();


        var arrow = this.two.makeArrow(50, 400, 250, 500, 40);
        arrow.stroke = 'green';
        arrow.linewidth = 4;


        let group = this.two.makeGroup(circle, arrow, ...this.texts);

        group.position.set(this.two.width / 2, this.two.height/ 2);
        group.center();

        this.two.update();
    }

}

export default Renderer;