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



function trasformaCluster(){
    d3.select("#cgraph")
        .selectAll("circle")
        .data(clusters)
        .on("click", function(d) {
        var keyclus= d3.select(this).attr("key")
        var clus= clusters[keyclus];
        console.log(clus)
        var coords = d3.mouse(this);
        bigAndNewCluster(clus,keyclus,coords);


    d3.select("#c_cluster_int")
        .selectAll("circle")
        //.data(clusters[keyclus].internalCluster)
        .on("click", function(d) {
    var newData = {
        x: coords[0], // Takes the pixel number to convert to number
        y: coords[1],
        r: radiusCluster,
        internalCluster: [],
        key: keyclus+d.internalCluster.length
    };

    d.internalCluster.push(newData); // Push data to our array
    d3.select("#c_cluster_int")
        .selectAll("circle")
        .data(d.internalCluster)
        .enter()
        .append("circle")
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

var somma=0;
        for (var i =0 ; i<=d.internalCluster.length - 1; i++) {
            somma+= d.internalCluster[i].r;
                }
                d3.select(this)
                        .transition()
                        .duration(1000)
                        .attr("r", d.r = d3.sum([somma,20]))
    var simulationInterClusters = d3.forceSimulation(d.internalCluster)
    .force("attract",d3.forceManyBody().strength(80).distanceMax(400).distanceMin(80))
    .force("collide", d3.forceCollide().radius(function(d) {return d.r + 0.5;}).iterations(2))
    .on("tick", tickedinternalcluster);
                });
    });
                simulationIntraClusters = d3.forceSimulation(clusters)
    .force("collide", d3.forceCollide().radius(function(d) { return d.r + 0.5; }).iterations(2))
    .on("tick", tickedcluster);

        }

//////////////////////////    new & edit CLUSTERS    /////////////////////////////////////////////////////7 
function bigAndNewCluster(clus,key,coords){
    console.log(key)
    var newData = {
        x: coords[0], // Takes the pixel number to convert to number
        y: coords[1],
        r: radiusCluster,
        internalCluster: [],
        key: key+clus.internalCluster.length
    };

    clus.internalCluster.push(newData); // Push data to our array
    d3.select("#c_cluster_int")
        .selectAll("circle")
        .data(clus.internalCluster)
        .enter()
        .append("circle")
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

var somma=0;
                for (var i =0 ; i<=clus.internalCluster.length - 1; i++) {
                    somma+= clus.internalCluster[i].r;
                }
                d3.select(this)
                        .transition()
                        .duration(1000)
                        .attr("r", clus.r = d3.sum([somma,20]))
    d3.forceSimulation(clus.internalCluster)
    .force("attract",d3.forceManyBody().strength(80).distanceMax(400).distanceMin(80))
    .force("collide", d3.forceCollide().radius(function(d) {return d.r + 0.5;}).iterations(2))
    .on("tick", tickedinternalcluster);
                    simulationIntraClusters = d3.forceSimulation(clusters)
    .force("collide", d3.forceCollide().radius(function(d) { return d.r + 0.5; }).iterations(2))
    .on("tick", tickedcluster);

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
                .attr("internalCluster",function(d){
            return d.internalCluster;
        })
        .attr("fill", getRandomColor)
        
        var simulationIntraClusters = d3.forceSimulation(clusters)
    .force("collide", d3.forceCollide().radius(function(d) { return d.r + 0.5; }).iterations(2))
    .on("tick", tickedcluster);
    return;
}
