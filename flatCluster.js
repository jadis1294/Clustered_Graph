/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////funzioni per FLAT TIME//////////////////////////////////////////////////////////////////
function flattingClusterDelete(d, i) {
    var rad = d3.select(this).attr("r")
    if (rad <= 40) return;
    var newCluster_fake = {
        x: clusters[i].x, // Takes the pixel number to convert to number
        y: clusters[i].y
    };
    clusters_fake.push(newCluster_fake)
    clusters.splice(i, 1);
    d3.select(this)
        .remove()
    d3.select("#c_cluster_fake")
        .selectAll("circle") // For new circle, go through the update process
        .data(clusters_fake)
        .enter()
        .append("circle")
        .transition()
        .duration(800)
        .attr("cx", function(d) {
            return d.x;
        })
        .attr("cy", function(d) {
            return d.y
        })
        .attr("r", rad)
        .attr("id", "cluster_fake")

}
