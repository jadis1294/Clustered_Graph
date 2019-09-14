"use strict"

/**
 * @function
 * @param {number} coordinates Array of d3.mouse(this)
 * @param {number} label Label for the new Cluster
 * @returns {void} 
 * @description Create a new Node in #c_node SVG
 */
function newNode(cluster,key,coordinates,label) {
    let nodeToInsert= new node(clusteredGraph.graph.nodes.size,label,new Set());
    clusteredGraph.graph.nodes.set(key,nodeToInsert);
    cluster.nodes.add(clusteredGraph.graph.nodes.size-1)
    nodeToInsert.cluster=cluster.label;
    nodeToInsert.x=coordinates[0];
    nodeToInsert.y=coordinates[1];
    nodeToInsert.key=key;
    nodeToInsert.r=radiusNode;
    //redraw();
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
function newEdge(key,coordinates,nodo,label)
{
    let edge= new Edge(key,label,nodo.id,nodo.id);
    clusteredGraph.graph.edges.set(key,edge);
    nodo.rotationScheme.add(edge.id);
    edge.x1=coordinates[0]
    edge.y1=coordinates[1]

    d3.select("#c_node")
        .selectAll("circle")
        .data(Array.from(clusteredGraph.graph.nodes.values()))
        .on("click", function(){
            d3.select(this)
            .transition()
            .duration(1000)
            .attr("r", radiusNode * 1.5);
            let id=d3.select(this).attr("key");
            let nodo= clusteredGraph.graph.nodes.get(parseInt(id));
            nodo.rotationScheme.add(edge.id);
            edge.target=nodo.id;
            edge.x2=parseInt(d3.select(this).attr("cx"))
            edge.y2=parseInt(d3.select(this).attr("cy"))
            d3.select("#c_node").selectAll("circle").transition().duration(1000).attr("r",radiusNode);
            redraw();
            createEdgesButton();
        });
}


function dragNode() {
	if(dragNodeBoolean==false) return;
    d3.select("#c_node")
        .selectAll("circle") // For new circle, go through the update process
        .call(dragN)
}
