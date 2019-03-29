//////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////FUNZIONI PER DRAG/////////////////////////////////////
var drag = d3.drag()
    .on("drag", dragged)
function dragged(d) {
    d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
}

function dragCluster() {
    d3.select("#c_cluster")
        .selectAll("circle") // For new circle, go through the update process
        .call(drag)
}
