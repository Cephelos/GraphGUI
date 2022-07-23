
class GraphNode {
    constructor(x, y, value){
        this.x = x;
        this.y = y;
        this.value = value;
        this.adjacents = new Set();
    }

    // adds node to adjacency list
    addAdjacent(node){
        this.adjacents.add(node);
    }

    // removes node from adjacency list, or returns false if not found
    removeAdjacent(node){
        return this.adjacents.delete(node);
    }

    // returns True if node is in adjacency list, else False
    isAdjacent(node){
        return this.adjacents.has(node);
    }

    // returns list of all adjacent nodes
    getAdjacents(){
        return Array.from(this.adjacents);
    }
}

export default GraphNode;