"use strict"

var editClusterBoolean,
    simulationIntraClusters,
    createClusterBoolean,
    createEdgeBoolean,
    createNodesBoolean,
    dragClusterBoolean,
    deleteClusterBoolean,
    zoomGraphBoolean,
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

var drag = d3.behavior.drag()
    			.origin(function(d) { return d; })
    			.on("dragstart", function() {
 			 	d3.event.sourceEvent.stopPropagation();
 			 	d3.select(this).attr("dragging", function(d) {
 			 		d.dragging = true;
 			 		return true;
 			 	
 			 	});
			}).on("drag", function(d){
    				mainStep(k_el, k_springf, k_springl, gravity);
    				d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
    		
    
    			}).on("dragend", function (d){
    				d3.select(this).attr("dragging", function(d) {
 			 		d.dragging = false;
 			 		return false;
 			 	});

    				for (p=0; p<1000; p++)
					setTimeout(mainStep(k_el, k_springf, k_springl, gravity), 100);
					//mainStep(k_el, k_springf, k_springl);
    			});