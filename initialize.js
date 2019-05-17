"use strict"
document.getElementById('files').addEventListener('change', handleFileSelect, false);
var editClusterBoolean,
    legend=0,
    simulationIntraClusters,
    createClusterBoolean,
    createEdgeBoolean,
    createNodesBoolean,
    dragClusterBoolean,
    zoomGraphBoolean,
    deleteObjectBoolean,
    reader,
    radiusCluster = 40,
    radiusNode = 9,
    clusters = [],
    nodes = new Map(),
    edges = new Map(),
    clusters= new Map(),
    undGraph=new UnderlyingGraph("grafo",false,nodes,edges),
    incTree= new InclusionTree("albero",clusters),
    clusteredGraph= new ClusteredGraph(undGraph,incTree),
    w = window.innerWidth-272,
    h = window.innerHeight,
    drag = d3.drag().on("drag", dragged)

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

    }

initialize();
