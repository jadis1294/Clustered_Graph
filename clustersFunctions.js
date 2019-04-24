/**
 * @function
 * @returns {string} color 
 * @description Get a randomic Color for the cluster's fill
 */
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
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
 * @returns {undefined} 
 * @description insert a cildren of the cluster when it is clicked 
 */
function editLevelCluster(){
    d3.select("#c_cluster")
    .selectAll("circle")
    .data(Array.from(clusteredGraph.tree.clusters.values()))
    .on("click", function() {
            if(edit_cluster==true){
            let coords = d3.mouse(this);
            let clus= clusteredGraph.tree.clusters.get(parseInt(d3.select(this).attr("key")))
            console.log(clus)
            let label= "c"+clusteredGraph.tree.clusters.size;
            clus.cildren.add(clusteredGraph.tree.clusters.size);
            let son= clusteredGraph.tree.cildrenCluster(parseInt(d3.select(this).attr("key"))).size+1
            d3.select(this).attr("r", radiusCluster *son)
            newCluster(coords,label,clus.level+1);
            }
        });
    return;
}

/**
 * @function
 * @param {number} coords Array of d3.mouse(this)
 * @param {number} label Label for the new Cluster
 * @returns {undefined} 
 * @description Create a new cluster in #c_cluster SVG
 */
function newCluster(coords,label,level) {
    var newCluster= new Cluster(label,level,new Set(),new Set());
    incTree.clusters.set(incTree.clusters.size,newCluster)
    d3.select("#c_cluster")
        .selectAll("circle")
        .data(Array.from(incTree.clusters.values()))
        .enter()
        .append("circle")
        .attr("cx", coords[0])
        .attr("cy", coords[1])
        .attr("r", radiusCluster)
        .attr("id","cluster")
        .attr("fill", getRandomColor)
        .attr("key", incTree.clusters.size-1);
    return;
}