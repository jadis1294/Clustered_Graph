"use strict"


/**
 * @function
 * @param {number} 
 * @returns {String} color 
 * @description Get a Color for the cluster's fill selected by the number c
 */
function getColor(c) {
    let letters = '0123456789ABCDEF';
    let l="ABCDEF"
    let colore="#";
    //red
    if(c==3){
            colore += l[Math.floor(Math.random() * 6)];
            colore += letters[Math.floor(Math.random() * 16)];
        colore += '0000';
    }
    //blue
    if(c==2){
    colore +='0000';
    
        for (var i = 0; i < 2; i++) {
            colore += letters[Math.floor(Math.random() * 16)];
    }
}
    //green
    if(c==1){
        colore +='00';
        for (var i = 0; i < 2; i++) {
            colore += letters[Math.floor(Math.random() * 16)];
        }
        colore +='00';
    }
    //random
    if(c==0){
        for (var i = 0; i < 6; i++) {
            colore += letters[Math.floor(Math.random() * 16)];
        }
    }
    return colore;
}

/**
 * @function
 * @returns {void} 
 * @description insert a cildren of the cluster when it is clicked 
 */
function editCluster() {
    d3.select("#c_cluster")
        .selectAll("circle")
        .data(Array.from(clusteredGraph.tree.clusters.values()))
        .on("click", function() {
            createClusterBoolean = false;
            if (editClusterBoolean == true) {
                let ultimaChiave;
                for (let key of clusteredGraph.tree.clusters)
                    ultimaChiave = key[0];
                let clus = clusteredGraph.tree.clusters.get(parseInt(d3.select(this).attr("key")));
                clus.cildren.add(ultimaChiave + 1);
                for (let item of clus.parents)
                    clusteredGraph.tree.clusters.get(item).cildren.add(ultimaChiave + 1);
                ultimaChiave++;
                newCluster(d3.mouse(this), ultimaChiave, "c" + ultimaChiave, clus.level + 1);
                clusteredGraph.tree.clusters.get(ultimaChiave).parents.add(parseInt(d3.select(this).attr("key")));
                for (let item of clus.parents)
                    clusteredGraph.tree.clusters.get(ultimaChiave).parents.add(item);
                for (let item of clusteredGraph.tree.clusters.values())
                    item.r = radiusCluster * (item.cildren.size + 1)
                redraw();
            }
            text=" created a cluster's children ";
            addLog(text,consoleCount);
        });
}
/**
 * @function
 * @param {Cluster}
 * @returns {Set<number>} 
 * @description take a cluster and return the set of the nodes that have distance< cluster
 */
function findNodesList(cluster) {
    //console.log("inizio find node")
    let foundedNodes = new Set();
    for (let node of clusteredGraph.graph.nodes) {
        //console.log(node)
        if (Math.abs(node.x - cluster.x) < cluster.r && Math.abs(node.y - cluster.y) < cluster.r) {
            //console.log("era minore")
            foundedNodes.add(node.id)
        }
    }

    return foundedNodes;
}
/**
 * @function
 * @param {number} coordinates Array of d3.mouse(this)
 * @param {number} clusterLabel Label for the new Cluster
 * @returns {void} 
 * @description Create a new cluster in #c_cluster SVG
 */
function newCluster(coordinates, key, clusterLabel, level) {
    let cluster = new Cluster(clusterLabel, level, new Set(), new Set(), new Set());
    clusteredGraph.tree.clusters.set(key, cluster);
    cluster.x = coordinates[0];
    cluster.y = coordinates[1];
    cluster.r = radiusCluster;
    cluster.fill = getColor(color);
    cluster.key = key;
    let foundedNodes = findNodesList(cluster);
    for (let item of foundedNodes) cluster.nodes.add(item);
    let d= new Date();
    text=" created a cluster ";
    addLog(text,consoleCount);
}

/**
 * @function
 * @returns {void} 
 * @description function to select the cluster in the svg to Drag
 */
function dragCluster() {
    if (dragClusterBoolean == false) return;
    d3.select("#c_cluster")
        .selectAll("circle") // For new circle, go through the update process
        .call(drag)
    d3.select("#c_cluster_fake")
        .selectAll("circle") // For new circle, go through the update process
        .call(drag)
}

/**
 * @function
 * @param {number}
 * @returns {void} 
 * @description delete the cluster with id equal to the param id
 */
function deleteCluster(id) {
    clusteredGraph.tree.clusters.delete(id)
    for (let c of clusteredGraph.tree.clusters) {
        for (let figlio of c[1].cildren) {
            if (figlio == id)
                c[1].cildren.delete(figlio)
        }
        for (let padre of c[1].parents) {
            if (padre == id)
                c[1].parents.delete(padre)
        }
    }
    text=" deleted a cluster ";
    addLog(text,consoleCount)
    redraw();
}
/**
 * @function
 * @param {number}
 * @returns {void} 
 * @description modify the radius of the cluster/node on mouseover/mouseout and create a description of the element
 */
function changeRadiusAndDescription() {
    if(zoomGraphBoolean==false) return;
    d3.select("#c_cluster")
        .selectAll("circle")
        .data(Array.from(clusteredGraph.tree.clusters.values()))
        .on("mouseover", function() {
            let raggio = d3.select(this).attr("r")

            d3.select(this)
                .attr("r", raggio * 1.2)

            d3.select("#cgraph")
                .append("text")
                .attr("dy", ".35em")
                .text("Label: " + clusteredGraph.tree.clusters.get(parseInt(d3.select(this).attr("key"))).label +"," + 
                    "Level: " + clusteredGraph.tree.clusters.get(parseInt(d3.select(this).attr("key"))).level)
                .attr("y", parseInt(d3.select(this).attr("cy"))-parseInt(d3.select(this).attr("r"))-10)
                .attr("x", parseInt(d3.select(this).attr("cx")))
                .attr("id", "navigateText")
        })

        .on("mouseout", function() {
            let raggio = d3.select(this).attr("r")
            d3.select(this)
                .attr("r", raggio / 1.2)
            d3.select("#navigateText").remove()
        });


        d3.select("#c_node")
        .selectAll("circle")
        .data(Array.from(clusteredGraph.graph.nodes.values()))
        .on("mouseover", function() {
            let raggio = d3.select(this).attr("r")

            d3.select(this)
                .attr("r", raggio * 1.2)

            d3.select("#cgraph")
                .append("text")
                .attr("dy", ".35em")
                .text("Label: "+clusteredGraph.graph.nodes.get(parseInt(d3.select(this).attr("key"))).label +","+ 
                    "Cluster: "+ clusteredGraph.graph.nodes.get(parseInt(d3.select(this).attr("key"))).cluster)
                .attr("y", parseInt(d3.select(this).attr("cy"))+parseInt(d3.select(this).attr("r")-15))
                .attr("x", parseInt(d3.select(this).attr("cx")))
                .attr("id", "navigateText")
        })
        .on("mouseout", function() {
            let raggio = d3.select(this).attr("r")
            d3.select(this)
                .attr("r", raggio / 1.2)
            d3.select("#navigateText").remove()
        });
}

/**
 * @function
 * @param {string}
 * @returns {void} 
 * @description insert the string t when a cluster is selected
 */
function insertText(t){
    d3.select("#c_cluster")
        .selectAll("circle")
        .data(Array.from(clusteredGraph.tree.clusters.values()))
        .on("click",function(){
            clusteredGraph.tree.clusters.get(parseInt(d3.select(this).attr("key"))).text=t;
            redraw();
        })
}
/**
 * @function
 * @param {string}
 * @returns {void} 
 * @description change the color of a cluster in t when it is selected
 */
function changeColor(t){
    d3.select("#c_cluster")
    .selectAll("circle")
    .data(Array.from(clusteredGraph.tree.clusters.values()))
    .on("click",function(){
        clusteredGraph.tree.clusters.get(parseInt(d3.select(this).attr("key"))).fill=t;
        redraw();
});
}