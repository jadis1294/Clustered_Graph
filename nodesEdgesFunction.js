"use strict"

/**
 * @function
 * @param {number} coordinates Array of d3.mouse(this)
 * @param {number} label Label for the new Cluster
 * @returns {void} 
 * @description Create a new Node in #c_node SVG
 */
function newNode(coordinates,label) {
    let nodeToInsert= new node(clusteredGraph.graph.nodes.size,label,new Set())
    clusteredGraph.graph.nodes.set(clusteredGraph.graph.nodes.size,nodeToInsert);
    nodeToInsert.x=coordinates[0];
    nodeToInsert.y=coordinates[1];
    nodeToInsert.dispx=0;
    nodeToInsert.dispy=0;
    redraw();
    return;
}


/**
 * @function
 * @param {node} nodo
 * @param {string} label
 * @param {number} id
 * @param {number} id
 * @returns {void} 
 * @description Create a new Edge in svg #C_EDGE
 */
function newEdge(coordinates,nodo,label)
{
    let edge= new Edge(clusteredGraph.graph.edges.size,label,nodo.id,nodo.id);
    clusteredGraph.graph.edges.add(edge);
    nodo.rotationScheme.add(edge.id);

    let line = d3.select("#c_edge")
        .append("line")
        .attr("x1", coordinates[0])
        .attr("y1", coordinates[1])
        .attr("x2", coordinates[0])
        .attr("y2", coordinates[1])
        .attr("id", "edge");
        
    d3.select("#c_node")
        .selectAll("circle")
        .data(Array.from(clusteredGraph.graph.nodes.values()))
        .on("click", function(){
            let id=d3.select(this).attr("key");
            let nodo= clusteredGraph.graph.nodes.get(parseInt(id));
            edge.target=nodo.id;
                
            d3.select(this)
                .transition()
                .duration(1000)
                .attr("r", radiusNode * 1.5); 
                
            line.attr("x2", d3.select(this).attr("cx"))
                .attr("y2", d3.select(this).attr("cy"));
            
            d3.select("#c_node").selectAll("circle").transition().duration(1000).attr("r",radiusNode);

            createEdgesButton();
        });
}
