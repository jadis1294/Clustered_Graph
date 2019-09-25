"use strict"
//initialization of all the editor's variables
document.getElementById('files').addEventListener('change', handleFileSelect, false);
let text,
    info=0,
    color=0,
    returned=false,
    flatted=false,
    consoleCount=1,
    editClusterBoolean,
    salvataggio,
    simulationIntraClusters,
    simulationIntraNodes,
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
    readerJson,
    log=new Map(),
    radiusCluster = 40,
    radiusNode = 9,
    nodes = new Map(),
    edges = new Map(),
    clusters= new Map(),
    undGraph=new UnderlyingGraph("grafo",false,nodes,edges),
    incTree= new InclusionTree("albero",clusters),
    clusteredGraph= new ClusteredGraph(undGraph,incTree),
    nodesCopy,
    edgesCopy,
    clustersCopy,
    undGraphCopy,
    incTreeCopy,
    clusteredGraphCopy,
    w = window.innerWidth-272,
    h = window.innerHeight,
    drag = d3.drag().on("drag", function(d){
        if(dragClusterBoolean==false) return;
        d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
    }),
    dragN=d3.drag().on("drag",function(d){
        if(dragNodeBoolean==false) return;
        d3.select(this)
        .attr("cx", d.x = d3.event.x)
        .attr("cy", d.y = d3.event.y);
    });

/**
 * @function
 * @returns {void} 
 * @description initialize the reader for the json files
 */
function handleFileSelect(evt) {
    var file = evt.target.files[0];    
    readerJson = new FileReader();
    readerJson.readAsText(file);
}

/**
 * @function
 * @param {string}
 * @param {number}
 * @returns {void} 
 * @description add a textual message in the log Map 
 */
function addLog(text,n){
    let d= new Date();
    if(consoleCount>25) consoleCount=1;
    log.set(consoleCount,{
        "time": d.getHours() +":" + d.getMinutes() + ":" + d.getSeconds(),
        "text":text,
        "numero": n
})
    consoleCount++;
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
        .attr('id', 'c_text')
    d3.select("#cgraph")
        .append('g')
        .attr('id', 'c_node')

    d3.select("#cgraph")
        .append("g")
        .attr("id", "c_edge")
    
    }



    
text=" log in ";
addLog(text,consoleCount)
initialize();
