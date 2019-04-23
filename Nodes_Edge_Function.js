
/**
 * @function
 * @param {number} coords Array of d3.mouse(this)
 * @param {number} label Label for the new Cluster
 * @returns {undefined} 
 * @description Create a new Node in #c_node SVG
 */
function newNode(coords,label) {
    var newNode= new node(undGraph.nodes.size,label,new Set())
    undGraph.nodes.set(undGraph.nodes.size,newNode)
    d3.select("#c_node")
        .selectAll("circle") // For new circle, go through the update process
        .data(Array.from(undGraph.nodes.values()))
        .enter()
        .append("circle")
        .transition()
        .duration(800)
        .attr("cx",coords[0])
        .attr("cy",coords[1])
        .attr("r",radiusNode)
        .attr("id", "nodo")
    return;
}


/**
 * @function
 * @param {number} coords Array of d3.mouse(this)
 * @returns {undefined} 
 * @description Create a new Node in #c_node SVG
 */
function newEdge(){
    if (crea_archi == true) {
        let id= d3.select(this).data()[0].id;
        console.log(id)
        let label = "e"+ clusteredGraph.graph.edges.size;
        var nodo= undGraph.nodes.get(id);
        var edge= new Edge(nodo.rotationScheme.size,label,id,id);
        undGraph.edges.add(edge);
        nodo.rotationScheme.add(edge.id);
        d3.select(this)
            .transition()
            .duration(1000)
            .attr(d3.select(this).attr("r"))
        line = d3.select("#c_edge")
            .append("line")
            .attr("x1", d3.select(this).attr("cx"))
            .attr("y1", d3.select(this).attr("cy"))
            .attr("x2", d3.select(this).attr("cx"))
            .attr("y2", d3.select(this).attr("cy"))
            .attr("id", "edge")
        d3.select("#c_node")
        .selectAll("circle")
        .on("click", function(){
            let id= d3.select(this).data()[0].id;
            var nodo= undGraph.nodes.get(id);
            edge.target=nodo.id;
            d3.select(this)
            .transition()
            .duration(1000)
            .attr("r", d3.select(this).attr("r") * 1.5) 
            line.attr("x2", d3.select(this).attr("cx"))
            .attr("y2", d3.select(this).attr("cy"));
        d3.select("#c_node").selectAll("circle")
            .transition()
            .duration(1000)
            .attr("r", 9)
            d3.select("#c_node").selectAll("circle").on("click",newEdge);
        });
    }
};

/////////////////////////////////////////////////////////////////////////////////////////