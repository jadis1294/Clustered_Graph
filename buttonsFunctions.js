"use strict"

/**
 * @function 
 * @description Remove the trasformation of the funcion ZoomGraph
 */
function removeTransformation() {
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
function allFalse() {
    editClusterBoolean = false;
    createClusterBoolean = false;
    createNodesBoolean = false;
    createEdgeBoolean = false;
    dragClusterBoolean = false;
    dragNodeBoolean = false;
    zoomGraphBoolean = false;
    deleteObjectBoolean = false;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////7
/**
 * @function 
 */
function createClusterButton() {
    allFalse();
    createClusterBoolean = true;
    editClusterBoolean = true;
    removeTransformation();
    editCluster();
    d3.select("#cgraph")
        .on("click", function() {
            if (createClusterBoolean == true) {
                let ultimaChiave;
                if (clusteredGraph.tree.clusters.size == 0)
                    ultimaChiave = 0;
                else {
                    for (let key of clusteredGraph.tree.clusters)
                        ultimaChiave = key[0];
                    ultimaChiave++;
                }
                newCluster(d3.mouse(this), ultimaChiave, "c" + ultimaChiave, 1);
                redraw();
            }
        });
}

/**
 * @function 
 */
function zoomGraphButton() {
    if (info==0) 
        window.alert("move your mouse for zoom and translate or see the information about an object ")  
    info++;
    allFalse();
    zoomGraphBoolean = true;
    changeRadiusAndDescription()
    d3.select("#cgraph")
        .call(d3.zoom().scaleExtent([1, 40]).translateExtent([
                [-100, -100],
                [w + 90, h + 100]
            ])
            .on("zoom", function() {
                if (zoomGraphBoolean == true) {
                    d3.select("#c_cluster")
                        .attr("transform", d3.event.transform);
                    d3.select("#c_node")
                        .attr("transform", d3.event.transform);
                    d3.select("#c_edge")
                        .attr("transform", d3.event.transform);
                }
            }));
}
/**
 * @function 
 */
function createNodesButton() {
    if (clusteredGraph.tree.clusters.size==0) {
        window.alert("Isn't possible insert nodes without a cluster")
        return;   
    }
    allFalse();
    removeTransformation();
    createNodesBoolean = true;
    d3.select("#c_cluster")
        .selectAll("circle")
        .data(Array.from(clusteredGraph.tree.clusters.values()))
        .on("click", function() {
            if (createNodesBoolean == true) {
                let cluster = clusteredGraph.tree.clusters.get(parseInt(d3.select(this).attr("key")));
                let ultimaChiave;
                if (clusteredGraph.graph.nodes.size == 0)
                    ultimaChiave = 0;
                else {
                    for (let key of clusteredGraph.graph.nodes)
                        ultimaChiave = key[0];
                    ultimaChiave++;
                }
                newNode(cluster, ultimaChiave, d3.mouse(this), "n" + ultimaChiave);
                redraw()
            }
        });
}
/**
 * @function 
 */
function createEdgesButton() {
    if (clusteredGraph.graph.nodes.size<=1) {
        window.alert("Isn't possible insert edges without two nodes")
        return;   
    }
    allFalse();
    removeTransformation();
    createEdgeBoolean = true;
    d3.select("#c_node")
        .selectAll("circle")
        .data(Array.from(clusteredGraph.graph.nodes.values()))
        .on("click", function() {
            if (createEdgeBoolean == true) {
                let ultimaChiave;
                if (clusteredGraph.graph.edges.size == 0)
                    ultimaChiave = 0;
                else {
                    for (let key of clusteredGraph.graph.edges)
                        ultimaChiave = key[0] + 1;
                }
                let nodo = clusteredGraph.graph.nodes.get(parseInt(d3.select(this).attr("key")));
                let label = "e" + clusteredGraph.graph.edges.size;
                let coordinates = [parseInt(d3.select(this).attr("cx")), parseInt(d3.select(this).attr("cy"))];
                d3.select(this).transition().duration(1000).attr("r", radiusNode * 1.5);
                newEdge(ultimaChiave, coordinates, nodo, label);
            }
        });
}
/**
 * @function 
 */
function moveClusterButton() {
    if (clusteredGraph.tree.clusters.size==0) {
        window.alert("Nothing to move!")
        return;   
    }
    allFalse();
    removeTransformation();
    dragClusterBoolean = true;
    d3.select("#cgraph")
        .on("click", function() {
            if (dragClusterBoolean == true)
                dragCluster();
        });
}
/**
 * @function 
 */
function moveNodeButton() {
    if (clusteredGraph.graph.nodes.size==0) {
        window.alert("Nothing to move!")
        return;   
    }
    allFalse();
    removeTransformation();
    dragNodeBoolean = true;
    d3.select("#c_node")
        .on("click", function() {
            if (dragNodeBoolean == true)
                dragNode();
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
    let d= new Date();
    log.set(log.size," deleted the graph" +  d.getHours() +":" + d.getMinutes() + ":" + d.getSeconds() )
}

/**
 * @function 
 */
function deleteObjectButton() {
    if (clusteredGraph.graph.nodes.size==0 || clusteredGraph.tree.clusters.size==0) {
        window.alert("Nothing to delete!")
        return;   
    }
    allFalse();
    removeTransformation();
    deleteObjectBoolean = true;
    d3.select("#c_cluster")
        .selectAll("circle")
        .data(Array.from(clusteredGraph.tree.clusters.values()))
        .on("click", function() {
            if (deleteObjectBoolean == true) {
                let id = parseInt(d3.select(this).attr("key"))
                d3.select(this).remove()
                deleteCluster(id)
            }
            
        });
    d3.select("#c_node")
        .selectAll("circle")
        .data(Array.from(clusteredGraph.graph.nodes.values()))
        .on("click", function() {
            if (deleteObjectBoolean == true) {
                let id = parseInt(d3.select(this).attr("key"))
                d3.select(this).remove()
                let d= new Date();
                log.set(log.size," deleted a node" +  d.getHours() +":" + d.getMinutes() + ":" + d.getSeconds() )
                clusteredGraph.graph.nodes.delete(id)
                for (let c of clusteredGraph.tree.clusters)
                    c[1].nodes.delete(id)
                for (let arco of clusteredGraph.graph.edges)
                    if (arco[1].source == id || arco[1].target == id)
                        clusteredGraph.graph.edges.delete(arco[0]);
                redraw()
            }
        });
}
/**
 * @function 
 */
function drawJsonButton() {
    if (reader=== undefined) {
        window.alert("select a Json!")
        return;   
    }
    let d= new Date();
    log.set(log.size," loaded a .json file " +  d.getHours() +":" + d.getMinutes() + ":" + d.getSeconds() )
    deleteGraphButton()
    let clusteredGraphReader = JSON.parse(reader.result);

    for (let index = 0; index < clusteredGraphReader.clusters.length; index++)
        clusters.set(clusters.size, clusteredGraphReader.clusters[index]);
    for (let index = 0; index < clusteredGraphReader.nodes.length; index++)
        nodes.set(nodes.size, clusteredGraphReader.nodes[index]);
    for (let index = 0; index < clusteredGraphReader.edges.length; index++)
        edges.set(edges.size, clusteredGraphReader.edges[index]);
    console.log(edges)
    for (let c of clusters) {
        c[1].fill = getRandomColor();
        c[1].parents = new Set(c[1].parents);
        c[1].cildren = new Set(c[1].cildren);
        c[1].nodes = new Set(c[1].nodes);
        c[1].r = radiusCluster * (c[1].cildren.size + 1)
        c[1].key = c[0];
    }
    for (let n of nodes) {
        n[1].rotationScheme = new Set(n[1].rotationScheme);
        n[1].r = radiusNode;
        n[1].key = n[0];
    }

    undGraph = new UnderlyingGraph("grafo", false, nodes, edges);
    incTree = new InclusionTree("albero", clusters);
    clusteredGraph = new ClusteredGraph(undGraph, incTree);
    redraw();

}
/**
 * @function 
 */
function treeViewButton() {
    if (treeviewBoolean == true) return;
    treeviewBoolean = true;
    graphviewBoolean = false;
    logViewBoolean=false;
    d3.select("#cgraph").remove();
    d3.select("#console").remove();
    drawTree();

}
/**
 * @function 
 */
function graphViewButton() {
    if (graphviewBoolean == true) return;
    graphviewBoolean = true;
    treeviewBoolean = false;
    logViewBoolean=false;
    d3.select("#inctree").remove();
    d3.select("#console").remove();
    initialize();
    redraw();
}

/**
 * @function 
 */
function logViewButton(){
    if (logViewBoolean == true) return;
    graphviewBoolean = false;
    treeviewBoolean = false;
    logViewBoolean=true;
    d3.select("#cgraph").remove();
    d3.select("#inctree").remove();
    drawConsole();
}

/**
 * @function 
 */
function popUpForRadiusButton(){
    radiusCluster = prompt("Enter the radius you want for clusters", "40");
    if(radiusCluster >120){
            window.alert("impossible to have an optimal display for clusters with radius> 80")
            return;   
    }
    if (radiusCluster == null || radiusCluster == "")
      radiusCluster=40;
      for (let c of clusteredGraph.tree.clusters)
      c[1].r=radiusCluster
      redraw();
  }
  /**
 * @function 
 */
function popUpForNodeButton(){
    radiusNode = prompt("Enter the radius you want for clusters", "9");
    if(radiusNode >30){
        window.alert("impossible to have an optimal display for nodes with radius> 30")
        return;   
}
    if (radiusNode == null || radiusNode == "")
      radiusNode=40;
      for (let n of clusteredGraph.graph.nodes)
      n[1].r=radiusNode;
      redraw();
  }

/**
 * @function 
 */
function getPalette(n){
    color=n;
    return;
};
