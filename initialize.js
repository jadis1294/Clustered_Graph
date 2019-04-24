"use strict"

var edit_cluster,
    crea_cluster,
    crea_archi,
    crea_nodi,
    sposta_cluster,
    elimina_clusterNodo,
    naviga_cgraph,
    valore_scarto = 5,
    radiusCluster = 40,
    radiusNode = 9,
    clusters = [],
    nodes = new Map(),
    edges = [],
    archi= new Set(edges),
    clusters= new Map(),
    undGraph=new UnderlyingGraph("grafo",false,nodes,archi),
    incTree= new InclusionTree("albero",clusters),
    clusteredGraph= new ClusteredGraph(undGraph,incTree),
    w = window.innerWidth,
    h = window.innerHeight,
    margin = {
        top: 40,
        right: 20,
        bottom: 20,
        left: 40
    }

/**
 * @function 
 * @description Initialize the Empty svg and the Svg's ID
 */
function initialize() {
    d3.select("body")
        .append("svg")
        .attr("width", w - 130)
        .attr("height", h - 100)
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