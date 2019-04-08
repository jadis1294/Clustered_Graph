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



function trasformaCluster() {
    d3.select("#c_cluster")
        .selectAll("circle")
        .on("click", function(d) {
            var keyclus = d3.select(this).attr("key")
            var clus = clusters[keyclus.substr(0,1)];
            for (var i =1; i <= keyclus.length - 1; i++) {
                clus= clus.internalCluster[keyclus.substr(i,1)];
            }
            console.log(clus)
            var coords = d3.mouse(this);
            bigAndNewCluster(clus, keyclus, coords);
        });
}

//////////////////////////    new & edit CLUSTERS    /////////////////////////////////////////////////////7 
function bigAndNewCluster(clus, key, coords) {
    //console.log(clus)
    var newData = {
        x: coords[0], // Takes the pixel number to convert to number
        y: coords[1],
        r: radiusCluster,
        internalCluster: [],
        key: key + clus.internalCluster.length
    };

    clus.internalCluster.push(newData); // Push data to our array
    d3.select("#c_cluster")
        .selectAll("circle")
        .data(clus.internalCluster)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
            return d.x;
        })
        .attr("cy", function(d) {
            return d.y;
        })
        .attr("r", function(d) {
            return d.r;
        })
        .attr("internalCluster", function(d) {
            return d.internalCluster;
        })
        .attr("key", function(d) {
            return d.key;
        })
        .attr("fill", getRandomColor)

    var somma = 0;
    for (var i = 0; i <= clus.internalCluster.length - 1; i++) {
        somma += clus.internalCluster[i].r;
    }
d3.select("#c_cluster")
        .selectAll("circle")
        .data(clus.internalCluster)
        .attr("r", clus.r = d3.sum([somma, 20]))


            simulationIntraClusters = d3.forceSimulation(clusters)
        .force("collide", d3.forceCollide().radius(function(d) {
            return d.r + 0.5;
        }).iterations(2))
        .on("tick", function(){
            console.log("intrA")
            d3.select("#c_cluster")
        .selectAll("circle")
        //.data(clus.internalCluster)
        .attr("cx", function(d) {
            return d.x;
        })
        .attr("internalCluster", function(d) {
            return d.internalCluster;
        })
        .attr("cy", function(d) {
            return d.y;
        })
        .attr("r",function(d){
            return d.r;
        })
        });

simulationInterClusters = d3.forceSimulation(clus.internalCluster)
        .force("collide", d3.forceCollide().radius(function(d) {
            return d.r + 0.5;
        }).iterations(2))
        .on("tick", function(){
            console.log("inter")
            d3.select("#c_cluster")
        .selectAll("circle")
        //.data(clus.internalCluster)
        .attr("cx", function(d) {
            return d.x;
        })
        .attr("internalCluster", function(d) {
            return d.internalCluster;
        })
        .attr("cy", function(d) {
            return d.y;
        })
        .attr("r",function(d){
            return d.r;
        })
        });

}




function newCluster(coords) {
    var newData = {
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
        .attr("cx", function(d) {
            return d.x;
        })
        .attr("cy", function(d) {
            return d.y;
        })
        .attr("r", function(d) {
            return d.r;
        })
        .attr("key", function(d) {
            return d.key;
        })
        .attr("internalCluster", function(d) {
            return d.internalCluster;
        })
        .attr("fill", getRandomColor)

    var simulationIntraClusters = d3.forceSimulation(clusters)
        .force("collide", d3.forceCollide().radius(function(d) {
            return d.r + 0.5;
        }).iterations(2))
        .on("tick", tickedcluster);
    return;
}