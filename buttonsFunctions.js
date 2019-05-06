"use strict"

/**
 * @function 
 * @description Remove the trasformation of the funcion ZoomGraph
 */
function removeTransformation(){
    d3.select("#c_cluster")
    .attr("transform", null)
d3.select("#c_node")
    .attr("transform", null)
d3.select("#c_edge")
    .attr("transform", null)
}
/**
 * @function 
 * @description Reset the boolean of the bottom to the false value
 */
function allFalse(){
    editClusterBoolean=false;
    createClusterBoolean = false;
    createNodesBoolean = false;
    createEdgeBoolean = false;
    dragClusterBoolean = false;
    deleteClusterBoolean = false;
    zoomGraphBoolean = false;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////7
/**
 * @function 
 */
function flatCluster() {
    allFalse();
    removeTransformation();
}
/**
 * @function 
 */
function createClusterButton() {
    allFalse();
    createClusterBoolean=true;
    editClusterBoolean=true;
    removeTransformation();
    editCluster();
        d3.select("#cgraph")
        .on("click", function(){
            console.log("sono dentro")
        if(createClusterBoolean==true)
        {
        let label= "c" + clusteredGraph.tree.clusters.size;
            newCluster(d3.mouse(this),label,1);
        }
    });
}

/**
 * @function 
 */
function zoomGraphButton() {
    allFalse();
    zoomGraphBoolean = true;
    d3.select("#cgraph")
    .call(d3.zoom().scaleExtent([1, 40]).translateExtent([[-100, -100], [w + 90, h + 100]])
    .on("zoom", function() {
        if (zoomGraphBoolean == true)
        {
            d3.select("#c_cluster")
                .attr("transform",d3.event.transform )
            d3.select("#c_node")
                .attr("transform", d3.event.transform )
            d3.select("#c_edge")
                .attr("transform", d3.event.transform )
        }
    }));
}
/**
 * @function 
 */
function createNodesButton() {
    allFalse();
    removeTransformation();
    createNodesBoolean=true;
    d3.select("#cgraph")
    .on("click", function() {
        if(createNodesBoolean==true){
    let coords = d3.mouse(this);
        let label= "n"+ clusteredGraph.graph.nodes.size;
        newNode(coords,label);
        }
    });
}
/**
 * @function 
 */
function createEdgesButton() {
    allFalse();
    removeTransformation();
    createEdgeBoolean=true;
    d3.select("#c_node")
    .selectAll("circle")
    .data(Array.from(clusteredGraph.graph.nodes.values()))
    .on("click", function(){
        if(createEdgeBoolean==true){
            let id=d3.select(this).attr("key");
            let nodo= clusteredGraph.graph.nodes.get( parseInt(id));
            let label = "e"+ clusteredGraph.graph.edges.size;
            let coordinates= [d3.select(this).attr("cx"),d3.select(this).attr("cy")]
            d3.select(this).transition().duration(1000).attr("r",radiusNode*1.5)
            newEdge(coordinates,nodo,label);
        }
    });
}
/**
 * @function 
 */
function moveClusterButton() {
    allFalse();
    removeTransformation();
    dragClusterBoolean=true;
        d3.select("#cgraph")
        .on("click", function() {
            if(dragClusterBoolean==true)
        dragCluster();
});
}
/**
 * @function 
 */
function deleteGraphButton() {
    d3.select("#c_cluster").selectAll("circle").remove();
    d3.select("#c_node").selectAll("circle").remove();
    d3.select("#c_edge").selectAll("line").remove();
    clusteredGraph.graph.nodes.clear();
    clusteredGraph.graph.edges.clear();
    clusteredGraph.tree.clusters.clear();
}
/**
 * @function 
 */
function drawJsonButton(){
    deleteGraphButton()
    clusteredGraph = JSON.parse(reader.result);
    redraw()

}


