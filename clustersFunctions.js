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
        createClusterBoolean=false;
            if(editClusterBoolean==true)
            {
            let clus= clusteredGraph.tree.clusters.get(parseInt(d3.select(this).attr("key")));
            let label= "c"+clusteredGraph.tree.clusters.size;
            clus.cildren.add(clusteredGraph.tree.clusters.size);
            for (let item of clus.parents) clusteredGraph.tree.clusters.get(item).cildren.add(clusteredGraph.tree.clusters.size);
            newCluster(d3.mouse(this),label,clus.level+1);
            let clusterfiglio= clusteredGraph.tree.clusters.get(clusteredGraph.tree.clusters.size-1);
            clusterfiglio.parents.add(parseInt(d3.select(this).attr("key")));
            for (let item of clus.parents) clusterfiglio.parents.add(item);
            for(let item of clusteredGraph.tree.clusters.values())
            {
                item.r=radiusCluster*(item.cildren.size+1)
                redraw();
            }
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
function newCluster(coordinates,clusterLabel,level)
{
    let cluster= new Cluster(clusterLabel,level,new Set(),new Set(),new Set());
    clusteredGraph.tree.clusters.set(clusteredGraph.tree.clusters.size,cluster);
    cluster.x=coordinates[0];
    cluster.y=coordinates[1];
    cluster.r=radiusCluster;
    cluster.fill=getRandomColor();
    cluster.key=clusteredGraph.tree.clusters.size-1;
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
