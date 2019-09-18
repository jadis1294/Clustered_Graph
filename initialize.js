"use strict"
document.getElementById('files').addEventListener('change', handleFileSelect, false);
var editClusterBoolean,
    info=0,
    color=0,
    simulationIntraClusters,
    createClusterBoolean,
    createEdgeBoolean,
    createNodesBoolean,
    dragClusterBoolean,
    dragNodeBoolean,
    zoomGraphBoolean,
    deleteObjectBoolean,
    treeviewBoolean=false,
    graphviewBoolean=true,
    logViewBoolean=false,
    reader,
    log=new Map(),
    radiusCluster = 40,
    radiusNode = 9,
    clusters = [],
    nodes = new Map(),
    edges = new Map(),
    clusters= new Map(),
    clustersFake=new Map(),
    undGraph=new UnderlyingGraph("grafo",false,nodes,edges),
    incTree= new InclusionTree("albero",clusters),
    clusteredGraph= new ClusteredGraph(undGraph,incTree),
    w = window.innerWidth-272,
    h = window.innerHeight,
    drag = d3.drag().on("drag", function(d){
        if(dragClusterBoolean==false) return;
        d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
    }),
    dragN=d3.drag().on("drag",function(d){
        if(dragNodeBoolean==false) return;
        d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
    });

/**
 * @function 
 */
function handleFileSelect(evt) {
    var file = evt.target.files[0];    
    reader = new FileReader();
    reader.readAsText(file);
}

/**
 * @function 
 * @description Initialize the Empty svg and the Svg's ID
 */
function initialize() {
    d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr('id', 'cgraph')

    d3.select("#cgraph")
        .append('g')
        .attr('id', 'c_cluster')

    d3.select("#cgraph")
        .append('g')
        .attr('id', 'c_node')

    d3.select("#cgraph")
        .append("g")
        .attr("id", "c_edge")
    
    d3.select("#cgraph")
        .append('g')
        .attr('id', 'c_cluster_Fake')
    
    }
let d= new Date();
    log.set(log.size," log in " +  d.getHours() +":" + d.getMinutes() + ":" + d.getSeconds() )
initialize();
