"use strict"

/**
 * @function
 * @returns {String} color 
 * @description Get a randomic Color for the cluster's fill
 */
function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


//////////////////////////    new & edit CLUSTERS    /////////////////////////////////////////////////////7 
        // function bigAndNewCluster(clus, key, coords) {
        //             simulationIntraClusters = d3.forceSimulation(clusters)
        //         .force("collide", d3.forceCollide().radius(function(d) {
        //             return d.r + 0.5;
        //         }).iterations(2))
        //         .on("tick", function(){
        //             console.log("intrA")
        //             d3.select("#c_cluster")
        //         .selectAll("circle")
        //         //.data(clus.internalCluster)
        //         .attr("cx", function(d) {
        //             return d.x;
        //         })
        //         .attr("internalCluster", function(d) {
        //             return d.internalCluster;
        //         })
        //         .attr("cy", function(d) {
        //             return d.y;
        //         })
        //         .attr("r",function(d){
        //             return d.r;
        //         })
        //         });

        // simulationInterClusters = d3.forceSimulation(clus.internalCluster)
        //         .force("collide", d3.forceCollide().radius(function(d) {
        //             return d.r + 0.5;
        //         }).iterations(2))
        //         .on("tick", function(){
        //             console.log("inter")
        //             d3.select("#c_cluster")
        //         .selectAll("circle")
        //         //.data(clus.internalCluster)
        //         .attr("cx", function(d) {
        //             return d.x;
        //         })
        //         .attr("internalCluster", function(d) {
        //             return d.internalCluster;
        //         })
        //         .attr("cy", function(d) {
        //             return d.y;
        //         })
        //         .attr("r",function(d){
        //             return d.r;
        //         })
        //         });

        // }

/**
 * @function
 * @returns {void} 
 * @description insert a cildren of the cluster when it is clicked 
 */
function editCluster(){
    d3.select("#c_cluster")
    .selectAll("circle")
    .data(Array.from(clusteredGraph.tree.clusters.values()))
    .on("click", function() {
            if(editClusterBoolean==true)
            {
            let clus= clusteredGraph.tree.clusters.get(parseInt(d3.select(this).attr("key")));
            console.log(clus)
            let label= "c"+clusteredGraph.tree.clusters.size;
            clus.cildren.add(clusteredGraph.tree.clusters.size);
            let cildrenClusterNumber= clusteredGraph.tree.cildrenCluster(parseInt(d3.select(this).attr("key"))).size+1
            let radius= radiusCluster*cildrenClusterNumber
            d3.select(this).attr("r", radius)
            newCluster(d3.mouse(this),label,clus.level+1,radiusCluster);
            }
        });
    return;
}

/**
 * @function
 * @param {number} coordinates Array of d3.mouse(this)
 * @param {number} clusterLabel Label for the new Cluster
 * @returns {void} 
 * @description Create a new cluster in #c_cluster SVG
 */
function newCluster(coordinates,clusterLabel,level,radius)
{
    let cluster= new Cluster(clusterLabel,level,new Set(),new Set());
    clusteredGraph.tree.clusters.set(clusteredGraph.tree.clusters.size,cluster);
    cluster.x=coordinates[0];
    cluster.y=coordinates[1];
    cluster.r=radius;
    redraw();
}

/**
 * @function
 * @returns {void} 
 * @description move the select cluster into the SVG
 */
function dragged(d) {
	if(dragClusterBoolean==false) return;
    d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
}


/**
 * @function
 * @returns {void} 
 * @description function to select the elements in the svg to Drag
 */
function dragCluster() {
	if(dragClusterBoolean==false) return;
    d3.select("#c_cluster")
        .selectAll("circle") // For new circle, go through the update process
        .call(drag)
}
