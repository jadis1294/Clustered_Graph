//////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////FUNZIONI PER DRAG/////////////////////////////////////
var drag = d3.drag()
    .on("drag", dragged)
function dragged(d) {
	if(sposta_cluster==false) return;
    d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
}

function dragCluster() {
	if(sposta_cluster==false) return;
    d3.select("#c_cluster")
        .selectAll("circle") // For new circle, go through the update process
        .call(drag)
     d3.select("#c_cluster_int")
     .selectAll("circle")
     .call(drag)
}
