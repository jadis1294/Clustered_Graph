"use strict"

/**
 * @function 
 * @returns {void} 
 * @description Remove the trasformation of the function ZoomGraph
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
 * @returns {void}
 * @description Reset the booleans variable of the bottom to the false value
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
 * @returns {void}
 * @description Initialize the variables for create a new cluster and call the function newCluster
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
 * @returns {void}
 * @description call the function changeRadius and allows the zooming and translating operations
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
 * @returns {void}
 * @description Initialize the variables for create a new node in the graph and call the function newNode
 */
function createNodesButton() {
    if (clusteredGraph.tree.clusters.size==0) {
        window.alert("Isn't possible insert nodes without a cluster")
        return;   
    }
    allFalse();
    removeTransformation();
    createNodesBoolean = true;
    d3.select("#cgraph")
        .on("click", function() {
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
                redraw();
            }
        })
});
}
/**
 * @function 
 * @returns {void}
 * @description Initialize the variables for create a new edge and call the function newEdge
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
 * @returns {void}
 * @description allow the movement of the clusters
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
        redraw();
}


/**
 * @function 
 * @returns {void}
 * @description allow the movement of the nodes
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
        redraw();
}
/**
 * @function 
 * @returns {void}
 * @description delete the graph and the data Structure
 */
function deleteGraphButton() {
    if (clusteredGraph.graph.nodes.size==0 && 
        clusteredGraph.tree.clusters.size==0 &&
        clusteredGraph.graph.edges.size==0) {
        window.alert("Nothing to delete!")
        return;  
    }
    d3.select("#c_cluster").selectAll("circle").remove();
    d3.select("#c_node").selectAll("circle").remove();
    d3.select("#c_edge").selectAll("line").remove();
    clusteredGraph.graph.nodes.clear();
    clusteredGraph.graph.edges.clear();
    clusteredGraph.tree.clusters.clear();
    text=" deleted the graph ";
    addLog(text,consoleCount);
}

/**
 * @function 
 * @returns {void}
 * @description allow the click and delete operation for an object of the graph
 */
function deleteObjectButton() {
    if (clusteredGraph.graph.nodes.size==0 && clusteredGraph.tree.clusters.size==0) {
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
                log.set(d.getHours() +":" + d.getMinutes() + ":" + d.getSeconds()," deleted a node")
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


function createCgraph(clusteredGraphReader){
    for (let index = 0; index < clusteredGraphReader.clusters.length; index++)
        clusters.set(clusters.size, clusteredGraphReader.clusters[index]);
    for (let index = 0; index < clusteredGraphReader.nodes.length; index++)
        nodes.set(nodes.size, clusteredGraphReader.nodes[index]);
    for (let index = 0; index < clusteredGraphReader.edges.length; index++)
        edges.set(edges.size, clusteredGraphReader.edges[index]);
    for (let c of clusters) {
        c[1].fill = getColor(0);
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
}

/**
 * @function 
 * @returns {void}
 * @description draw the loaded Json File
 */
function drawJsonButton() {
    if (readerJson=== undefined) {
        window.alert("select a Json!")
        return;   
    }
    text=" loaded a .json file ";
    addLog(text,consoleCount);
    removeAll();
    let clusteredGraphReader = JSON.parse(readerJson.result);
    console.log(clusteredGraphReader)
    createCgraph(clusteredGraphReader);
    undGraph = new UnderlyingGraph("grafo", false, nodes, edges);
    incTree = new InclusionTree("albero", clusters);
    clusteredGraph = new ClusteredGraph(undGraph, incTree);
    redraw();

}



/**
 * @function 
 * @param {number}
 * @returns {void}
 * @description delete the other views and draw the tree with the objects of the cgraph
 */
function treeViewButton(p) {
    if (treeviewBoolean == true) return;
    treeviewBoolean = true;
    graphviewBoolean = false;
    logViewBoolean=false;
    d3.select("#cgraph").remove();
    d3.select("#console").remove();
    d3.select("#inctree").remove();
    drawTree(p);

}

/**
 * @function 
 * @returns {void}
 * @description delete the other views and redraw the cgraph
 */
function graphViewButton() {
    if (graphviewBoolean == true ||flatted==true) return;
    graphviewBoolean = true;
    treeviewBoolean = false;
    logViewBoolean=false;
    d3.select("#inctree").remove();
    d3.select("#console").remove();
    d3.select("#cgraph").remove()
    initialize();
    redraw();
}


/**
 * @function 
 * @returns {void}
 * @description delete the other view and draw the console of the last 25 operation in the editor
 */
function logViewButton(){
    if (logViewBoolean == true) return;
    graphviewBoolean = false;
    treeviewBoolean = false;
    logViewBoolean=true;
    d3.select("#cgraph").remove();
    d3.select("#inctree").remove();
    d3.select("#console").remove();
    drawConsole();
}


/**
 * @function 
 * @returns {void}
 * @description create a popUp where insert the desired radius for the clusters
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
 * @returns {void}
 * @description create a popUp where insert the desired radius for the nodes
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
 * @returns {void}
 * @description assigns the value for choosing the palette
 */
function getPalette(n){
    color=n;
};

/**
 * @function
 * @param {number} 
 * @returns {void}
 * @description to see the complete graph or just a part of that
 */
function graphDecompositionButton(p){
        d3.select("#cgraph").remove();
        d3.select("#inctree").remove();
        d3.select("#console").remove();
        initialize();
        redraw();
        if(p==0){
            d3.select("#c_node").remove();
            d3.select("#c_edge").remove();
        }
        if(p==1){
        d3.select("#c_cluster").remove();
        d3.select("#c_text").remove();
        d3.select("#c_edge").remove();
    }
    if(p==2){
        d3.select("#c_node").remove();
        d3.select("#c_text").remove();
        d3.select("#c_cluster").remove();

    }
}
/**
 * @function 
 * @returns {void}
 * @description create a popUp where insert text used in insertText(t) function
 */
function addTextButton(){
    allFalse();
    if (clusteredGraph.tree.clusters.size==0) {
        window.alert("Impossible add text in a cluster without creating at least one")
        return;   
    }
    let t = prompt("enter the text which you want on a cluster and select it", "...");
    if (t == null || t == "") return;
    insertText(t);
}


/**
 * @function 
 * @returns {void}
 * @description create a popUp where insert the exadecimal value of the color
 */
function changeSingleColorButton(){
    allFalse();
    if (clusteredGraph.tree.clusters.size==0) {
        window.alert("Impossible change color of a cluster without creating at least one")
        return;   
    }
    let t = prompt("enter the value of the hexadecimal color you want: " , "#******")
    if(t[0]=="#" && t.length==7) changeColor(t);
    else{
        window.alert("this isn't a color!")
        return;
    }
}

/* opentoggles between adding and removing the show class, which is used to hide and show the dropdown content */
function dropdownButton(p) {
    if(p==0) document.getElementById("myDropdownsave").classList.toggle("show");
    if(p==1) document.getElementById("myDropdownview").classList.toggle("show");
    if(p==2) document.getElementById("myDropdowncreate").classList.toggle("show");
    if(p==3) document.getElementById("myDropdownoption").classList.toggle("show");
    if(p==4) document.getElementById("myDropdownchange").classList.toggle("show");
    if(p==5) document.getElementById("myDropdowncolor").classList.toggle("show");
    if(p==6) document.getElementById("myDropdowntree").classList.toggle("show");
    if(p==7) document.getElementById("myDropdowngraph").classList.toggle("show");
    if(p==8) document.getElementById("myDropdownFlat").classList.toggle("show");
    if(p==9) document.getElementById("myDropdownNew").classList.toggle("show");
    if(p==10) document.getElementById("myDropdownTemplates").classList.toggle("show");
    }

/**
 * @function 
 * @param {string}
 * @returns {void}
 * @description create a hexadecimal color from a rgb color
 */
var rgbToHex = function (rgb) { 
        var hex = Number(rgb).toString(16);
        if (hex.length < 2) {
             hex = "0" + hex;
        }
        return hex;
      };

      /**
 * @function 
 * @param {string}
 * @returns {void}
 * @description create a full hexadecimal color from a rgb color
 */
var fullColorHex = function(r,g,b) {   
        var red = rgbToHex(r);
        var green = rgbToHex(g);
        var blue = rgbToHex(b);
        return red+green+blue;
      };
      

/**
 * @function 
 * @returns {void}
 * @description return the clustered configuration of the graph 
 */
function retunInClusteredButton(){
    if(returned==true) return;
    treeviewBoolean=false;
    nodes = new Map();
    for(let item of nodesCopy){
        let n =new node(item[0],item[1].label,
            new Set(Array.from(item[1].rotationScheme)));
        nodes.set(item[0],n);
        n.cluster=item[1].cluster;
        n.x=item[1].x;
        n.y=item[1].y;
        n.key=item[1].key;
        n.r=item[1].r;
    }
    edges = new Map()
    for(let item of edgesCopy){
        let edge= new Edge(item[1].id,item[1].label,item[1].source,item[1].target);
        edges.set(item[0],edge);
        edge.x1=item[1].x1;
        edge.y1=item[1].y1;
        edge.x2=item[1].x2;
        edge.y2=item[1].y2;
    }
    clusters= new Map();
    for(let item of clustersCopy){
        let cluster = new Cluster(item[1].label, item[1].level, 
                new Set(Array.from(item[1].cildren)), 
                new Set(Array.from(item[1].parents)),
                new Set(Array.from(item[1].nodes)));
        clusters.set(item[0],cluster);
        cluster.x = item[1].x;
        cluster.y = item[1].y;
        cluster.r = item[1].r;
        cluster.fill = item[1].fill;
        cluster.key = item[1].key;
    }
    undGraph=new UnderlyingGraph("grafo",false,nodes,edges),
    incTree= new InclusionTree("albero",clusters),
    clusteredGraph= new ClusteredGraph(undGraph,incTree),
    d3.select("#inctree").remove();
    d3.select("#console").remove();
    d3.select("#cgraph").remove();
    returned=true;
    flatted=false
    initialize();
    redraw();
}

function removeAll(){
    d3.select("#inctree").remove();
    d3.select("#console").remove();
    d3.select("#cgraph").remove();
    clusteredGraph.graph.nodes.clear();
    clusteredGraph.graph.edges.clear();
    clusteredGraph.tree.clusters.clear();
}
