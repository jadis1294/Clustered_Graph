function removeTransformation(){
    d3.select("#c_cluster")
    .attr("transform", null)
d3.select("#c_node")
    .attr("transform", null)
d3.select("#c_edge")
    .attr("transform", null)
}

function allFalse(){
    edit_cluster=false;
    crea_cluster = false;
    crea_nodi = false;
    crea_archi = false;
    sposta_cluster = false;
    elimina_clusterNodo = false;
    naviga_cgraph = false;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////7

function flatCluster() {
    allFalse();
    removeTransformation();
}

function createCluster() {
    allFalse();
    crea_cluster=true
    removeTransformation();
    d3.select("#cgraph")
    .on("click", function() {
        if(crea_cluster==true){
        let coords = d3.mouse(this);
        let label= "c"+clusteredGraph.tree.clusters.size;
            newCluster(coords,label);
        }
        return;
    });
}

function editCluster() {
    allFalse();
    removeTransformation();
    edit_cluster=true;
    d3.select("#c_cluster")
    .on("click", function() {
            rad= d3.select(this).children()
            console.log(rad);
            trasformaCluster(rad);
        });

}

function zoomGraph() {
    allFalse();
    naviga_cgraph = true;
    d3.select("#cgraph")
    .call(d3.zoom()
        .scaleExtent([1, 40])
    .translateExtent([[-100, -100], [w + 90, h + 100]])
            .on("zoom", function() {
                if (naviga_cgraph == true) {

                    d3.select("#c_cluster")
                        .attr("transform",d3.event.transform )
                    d3.select("#c_cluster_int")
                        .attr("transform", d3.event.transform )
                    d3.select("#c_node")
                        .attr("transform", d3.event.transform )
                    d3.select("#c_edge")
                        .attr("transform", d3.event.transform )
                }
            }));
}

function createNodes() {
    allFalse();
    removeTransformation();
    crea_nodi=true;
    d3.select("#cgraph")
    .on("click", function() {
        if(crea_nodi==true){
    let coords = d3.mouse(this);
        let label= "n"+ clusteredGraph.graph.nodes.size;
        newNode(coords,label);
        }
    });
}

function createEdges() {
    allFalse();
    removeTransformation();
    crea_archi=true;
    d3.select("#c_node")
    .selectAll("circle")
    .on("click", newEdge);
}

function MoveCluster() {
    allFalse();
    removeTransformation();
    sposta_cluster=true;
        d3.select("#cgraph")
        .on("click", function() {
        dragCluster();
});
}

function saveIt(){
    allFalse();
    removeTransformation();
    saveGraph();
}

function DeleteGraph() {
    d3.select("#c_cluster").selectAll("circle").remove();
    d3.select("#c_node").selectAll("circle").remove();
    d3.select("#c_edge").selectAll("line").remove();
    clusteredGraph.graph.nodes.clear();
    clusteredGraph.graph.edges.clear();
    clusteredGraph.tree.clusters.clear();
}
