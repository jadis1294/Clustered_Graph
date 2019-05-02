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
    createClusterBoolean=true
    removeTransformation();
    d3.select("#cgraph")
    .on("click", function(){
        if(createClusterBoolean==true)
        {
        let coordinates = d3.mouse(this);
        let label= "c" + clusteredGraph.tree.clusters.size;
            newCluster(coordinates,label,1);
        }
    });
}
/**
 * @function 
 */
function editClusterButton() {
    allFalse();
    removeTransformation();
    editClusterBoolean=true;
    editCluster();

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
function saveIt(){
    allFalse();
    removeTransformation();
    saveGraph();
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


function redraw(){
    let clus=Array.from(clusteredGraph.tree.clusters.values());
    let nod=Array.from(clusteredGraph.graph.nodes.values());
    
    d3.select("#c_cluster")
    .selectAll("circle")
    .data(clus)
    .remove()
    d3.select("#c_node")
    .selectAll("circle")
    .data(nod)
    .enter()
    .append("circle")
    .transition()
    .duration(800)
    .attr("r",radiusNode)
    .attr("id", "nodo")
    .attr("cx", function(d){ return d.x;})
    .attr("cy", function(d){return d.y})
    .attr("key", function(d){return d.key});

    d3.select("#c_cluster")
    .selectAll("circle")
    .data(clus)
    .enter()
    .append("circle")
    .attr("r", function(d){ return d.r;})
    .attr("id","cluster")
    .attr("cx", function(d){ return d.x;})
    .attr("cy", function(d){return d.y})
    .attr("fill", function(d){return d.fill})
    .attr("key", function(d){return d.key});
    let clustersLevelOne=new Set();
    for (let item of clusteredGraph.tree.clusters){
        if(item[1].level==1) {
            clustersLevelOne.add(item[1])
        } 

    }
    force(clustersLevelOne);
}

function force(clustersLevelX){
    simulationIntraClusters = d3.forceSimulation(Array.from(clustersLevelX.values()))
    .force("collide", d3.forceCollide().radius(function(d) {return d.r;}).iterations(2))
    .on("tick", function(){
        d3.select("#c_cluster")
        .selectAll("circle")
        .attr("cx", function(d) {
            return d.x;
        })
        .attr("cy", function(d) {
            return d.y;
        })
    });
    for (let item of clustersLevelX){
            let x1=item.x;
            let y1=item.y;
        if(item.cildren.size!=0){
            let itemcildren=new Set()
            for (let figlioid of item.cildren) {
                if(clusteredGraph.tree.clusters.get(figlioid).level==item.level+1)
                itemcildren.add(clusteredGraph.tree.clusters.get(figlioid))
            }
            console.log(item.x)
                  simulationIntraClusters = d3.forceSimulation(Array.from(itemcildren))
                    //.force("center",d3.forceCenter([item.x, item.y]))
                    .force("collide", d3.forceCollide().radius(function(d) {return d.r;}).iterations(2))
                    .on("tick", function(){
                    d3.select("#c_cluster")
                    .selectAll("circle")
                    .attr("cx", function(d) {
                        return d.x;
                    })
                    .attr("cy", function(d) {
                        return d.y;
                    })
                });

                // let figlio=clusteredGraph.tree.clusters.get(figlioid)
                // itemcildren.add(figlio)
                // let xfiglio= figlio.x;
                // let yfiglio= figlio.y;
                // let xIndexFiglio=x1-xfiglio;
                // let yIndexFiglio= y1-yfiglio;
                // let dPadreFiglio=Math.sqrt(Math.pow(xIndexFiglio,2)+Math.pow(yIndexFiglio,2));
                // if(dPadreFiglio>=item.r+ figlio.r){
                //     let difference=item.r+figlio.r-dPadreFiglio;
                //     figlio.x-=difference/2;
                //     figlio.y-=difference/2;
                // }
            }
        }
        
    }

