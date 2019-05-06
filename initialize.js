"use strict"
document.getElementById('files').addEventListener('change', handleFileSelect, false);
var editClusterBoolean,
    simulationIntraClusters,
    createClusterBoolean,
    createEdgeBoolean,
    createNodesBoolean,
    dragClusterBoolean,
    deleteClusterBoolean,
    zoomGraphBoolean,
    reader,
    radiusCluster = 40,
    radiusNode = 9,
    clusters = [],
    nodes = new Map(),
    edges = new Set(),
    clusters= new Map(),
    undGraph=new UnderlyingGraph("grafo",false,nodes,edges),
    incTree= new InclusionTree("albero",clusters),
    clusteredGraph= new ClusteredGraph(undGraph,incTree),
    w = window.innerWidth-130,
    h = window.innerHeight-100,
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
