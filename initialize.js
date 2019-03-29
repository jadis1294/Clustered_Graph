var valore_scarto = 5;
var radiusCluster = 40;
var radiusNode = 9;
var clusters = [];
var nodes = [];
var edges = [];
var clusters_fake = [];
var cgraph = [clusters, nodes, edges, clusters_fake]
var w = window.innerWidth,
    h = window.innerHeight,
    margin = {
        top: 40,
        right: 20,
        bottom: 20,
        left: 40
    }

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
        .attr('id', 'c_cluster_fake')


    d3.select("#cgraph")
        .append('g')
        .attr('id', 'c_cluster_int')


    d3.select("#cgraph")
        .append('g')
        .attr('id', 'c_node')

    d3.select("#cgraph")
        .append("g")
        .attr("id", "c_edge")

}