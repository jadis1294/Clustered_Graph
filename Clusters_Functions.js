///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////    RANDOMIZZAZIOE DEI COLORI DEI CLUSTER    ////////////////////////////////
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//////////////////////////    new & edit CLUSTERS    /////////////////////////////////////////////////////7 
function bigAndNewCluster(key,coords){
    var newData = {
        x: coords[0], // Takes the pixel number to convert to number
        y: coords[1],
        r: radiusCluster,
        internalCluster: [],
        key: clusters[key].internalCluster.length
    };

    clusters[key].internalCluster.push(newData); // Push data to our array
    d3.select("#c_cluster_int")
        .selectAll("circle")
        .data(clusters[key].internalCluster)
        .enter()
        .append("circle")
        .transition()
        .duration(800)
        .attr("cx",function(d) {
        return d.x;
    })
        .attr("cy",function(d) {
        return d.y;
    })
        .attr("r",function(d) {
        return d.r;
    })
                .attr("key",function(d){
            return d.key;
        })
    .attr("fill", getRandomColor)
    var simulationInterClusters = d3.forceSimulation(clusters[key].internalCluster)
    .force("attract",d3.forceManyBody().strength(80).distanceMax(400).distanceMin(80))
    .force("collide", d3.forceCollide().radius(function(d) {return d.r + 0.5;}).iterations(2))
    .on("tick", tickedinternalcluster);
}

function newCluster(coords) {
    var newData =
    {
        x: Math.round(coords[0]), // Takes the pixel number to convert to number
        y: Math.round(coords[1]),
        r: radiusCluster,
        internalCluster: [],
        key: clusters.length
    };
    clusters.push(newData); // Push data to our array
    d3.select("#c_cluster")
        .selectAll("circle") // For new circle, go through the update process
        .data(clusters)
        .enter()
        .append("circle")
        .transition()
        .duration(800)
        .attr("cx",function(d) {
        return d.x;
    })
        .attr("cy",function(d) {
        return d.y;
    })
        .attr("r",function(d) {
        return d.r;
    })
        .attr("key",function(d){
            return d.key;
        })
        .attr("fill", getRandomColor)
        
        var simulationIntraClusters = d3.forceSimulation(clusters)
    .force("collide", d3.forceCollide().radius(function(d) { return d.r + 0.5; }).iterations(2))
    .on("tick", tickedcluster);

}

function removeCluster(i) {
    clusters.splice(i, 1);
    d3.select("#c_cluster").selectAll("circle").data(clusters).exit().remove();
    d3.select("#c_cluster")
        .selectAll("circle") // For new circle, go through the update process
        .data(clusters)
        .enter()
        .append("circle")
        .transition()
        .duration(800)
        .attr(clusterAttrs)
        .attr("fill", getRandomColor)
        .attr("opacity", 0.5)
        .attr("id", "cluster")
}