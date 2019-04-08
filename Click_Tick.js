

//////////////////////    TICKED ASINCRONI PER LE SIMULAZIONI    ///////////////////////
function tickedcluster() {
    d3.select("#c_cluster")
        .selectAll("circle")
        //.data(clusters)
        .attr("cx", function(d) {
            return d.x;
        })
        .attr("cy", function(d) {
            return d.y;
        })
        .attr("r",function(d){
            return d.r;
        })
}
function tickedinternalcluster() {
            d3.select("#c_cluster_int")
        .selectAll("circle")
        //.data(clus.internalCluster)
        .attr("cx", function(d) {
            return d.x;
        })
        .attr("cy", function(d) {
            return d.y;
        })
        .attr("r",function(d){
            return d.r;
        })
        .attr("key",function(d){
            return d.key;
        })
}



initialize();

///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////on click /////////////////////////////////////////////////////////
d3.select("#cgraph")
    .call(d3.zoom()
        .scaleExtent([1, 40])
    .translateExtent([[-100, -100], [w + 90, h + 100]])
            .on("zoom", function() {
                if (naviga_cgraph == true) {

                    d3.select("#c_cluster")
                        .attr("transform",d3.event.transform )
                    d3.select("#c_cluster_int")
                        .attr("transform", d3.event.transform )
                    d3.select("#c_node")
                        .attr("transform", d3.event.transform )
                    d3.select("#c_edge")
                        .attr("transform", d3.event.transform )
                }
            }))
        .on("click", function() {
            var coords = d3.mouse(this);
            if (crea_cluster == true){
                console.log("new cluster")
                newCluster(coords);
            }
            if (crea_nodi == true){
                console.log("new node")
                newNode(coords);
            }
            if(sposta_cluster==true){
                console.log("drag")
                dragCluster();
            }
            if(edit_cluster==true){
                console.log("edit")
                trasformaCluster();
            }
                
});


d3.select("#c_node")
        .selectAll("circle")
        .on("click", function() {
            if (crea_archi == true) {
                let smallRad = d3.select(this).attr("r")
                d3.select(this)
                    .transition()
                    .duration(1000)
                    .attr("r", smallRad * 1.5)
                var puntoiniziale = d3.mouse(this);
                line = d3.select("#c_edge")
                    .append("line")
                    .attr("x1", puntoiniziale[0])
                    .attr("y1", puntoiniziale[1])
                    .attr("x2", puntoiniziale[0])
                    .attr("y2", puntoiniziale[1])
                    .attr("id", "edge")
                d3.select("#c_node").selectAll("circle").on("click", fineArco)
            }
        });
