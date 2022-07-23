import GraphNode from './graphNode.js'

class Graph{
    constructor(directed = true, weighted = false){
        this.nodes = new Map();
        this.directed = directed;
        this.weighted = weighted;
    }
    // TODO write function that takes a map as input and generates a graph with proper x and y values for nodes 

    // adds a node to the graph
    addNode(x, y, value){
        if(this.nodes.has(value)){
            return this.nodes.get(value)
        }
        const node = new GraphNode(x, y, value);
        this.nodes.set(value, node);
        return node;
    }
    // removes a node from the graph
    removeNode(value){
        const current = this.nodes.get(value);
        if(current){
            for(const node of this.nodes.values()){
                node.removeAdjacent(current);
            }
        }

        return this.nodes.delete(value);
    }

    // adds an edge, with optional weight
    addEdge(start, end, weight = 0){
        const startNode = this.nodes.get(start);
        const endNode = this.nodes.get(end);

        // checks if this is a weighted graph. If not, ignore the 'weight' attribute completely
        if(this.weighted === false){

            startNode.addAdjacent(endNode);

            if(!this.directed){
                endNode.addAdjacent(startNode);
            }
        }

        else {

            startNode.addAdjacent([endNode, weight]);

            if(directed === Graph.UNDIRECTED){
                endNode.addAdjacent([startNode, weight]);
            }
        }
        return [startNode, endNode];

    }

    // removes an edge. If it's undirected, we remove it in both directions
    removeEdge(start, end){
        const startNode = this.nodes.get(start);
        const endNode = this.nodes.get(end);
        
        if(startNode && endNode){
            startNode.removeAdjacent(endNode);

            if(!this.directed){
                endNode.removeAdjacent(startNode);
            }
        }

        return [startNode, endNode];
    }

    areAdjacents(start, end) {
        const startNode = this.nodes.get(start);
        const endNode = this.nodes.get(end);
    
        if (startNode && endNode) {
          return startNode.isAdjacent(endNode);
        }
    
        return false;
      }

      *bfs(start){
          const visited = new Map();
          const visitList = [];

          visitList.add(start);
          while (!visitList.isEmpty()){
              const node = visitList.shift();
              if(node && !visited.has(node)){
                  yield node;
                  visited.set(node);
                  node.getAdjacents().forEach(adj => visitList.push(adj));
              }
          }
      }

      *dfs(start){
        const visited = new Map();
        const visitList = [];

        visitList.add(start);
        while (!visitList.isEmpty()){
            const node = visitList.pop();
            if(node && !visited.has(node)){
                yield node;
                visited.set(node);
                node.getAdjacents().forEach(adj => visitList.push(adj));
            }
        }
    }


}

Graph.UNDIRECTED = Symbol('undirected graph');
Graph.DIRECTED = Symbol('directed graph');

export default Graph;