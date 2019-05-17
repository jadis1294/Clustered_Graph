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
                let ultimaChiave;
                for(let key of clusteredGraph.tree.clusters)
                ultimaChiave= key[0];
            let clus= clusteredGraph.tree.clusters.get(parseInt(d3.select(this).attr("key")));
            clus.cildren.add(ultimaChiave+1);
            for (let item of clus.parents)
                clusteredGraph.tree.clusters.get(item).cildren.add(ultimaChiave+1);
            ultimaChiave++;
            newCluster(d3.mouse(this),ultimaChiave,"c"+ultimaChiave,clus.level+1);
            clusteredGraph.tree.clusters.get(ultimaChiave).parents.add(parseInt(d3.select(this).attr("key")));
            for (let item of clus.parents)
                clusteredGraph.tree.clusters.get(ultimaChiave).parents.add(item);
            for(let item of clusteredGraph.tree.clusters.values())
                item.r=radiusCluster*(item.cildren.size+1)
            redraw();
            }
        });
    return;
}

function findNodesList(cluster){
    console.log("inizio find node")
    let foundedNodes= new Set();
    for (let node of clusteredGraph.graph.nodes){
        console.log(node)
        if(Math.abs(node.x-cluster.x)<cluster.r && Math.abs(node.y -cluster.y)<cluster.r){
            console.log("era minore")
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
function newCluster(coordinates,key,clusterLabel,level)
{
    let cluster= new Cluster(clusterLabel,level,new Set(),new Set(),new Set());
    clusteredGraph.tree.clusters.set(key,cluster);
    cluster.x=coordinates[0];
    cluster.y=coordinates[1];
    cluster.r=radiusCluster;
    cluster.fill=getRandomColor();
    cluster.key=key;
    let foundedNodes=findNodesList(cluster);
    for(let item of foundedNodes) cluster.nodes.add(item);
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


function deleteCluster(id){
            d3.select(this).remove()
            clusteredGraph.tree.clusters.delete(id)
            for(let c of clusteredGraph.tree.clusters){
                for(let figlio of c[1].cildren){
                    if(figlio == id)
                        c[1].cildren.delete(figlio)
                }
                for(let padre of c[1].parents){
                    if(padre==id)
                        c[1].parents.delete(padre)   
                }
            }
        redraw();
}

function changeRadiusAndDescription(){
    d3.select("#c_cluster")
    .selectAll("circle")
    .data(Array.from(clusteredGraph.tree.clusters.values()))
    .on("mouseover", function(){
        let raggio=d3.select(this).attr("r")
        
        d3.select(this)
        .attr("r",raggio*1.2)
        let testo =d3.select(this).attr("key")
        
        d3.select("#cgraph")
        .append("text")
        .text(testo +" ")
        .attr("y", parseInt(d3.select(this).attr("cy"))-60)
        .attr("x", parseInt(d3.select(this).attr("cx")))
        .attr("id", "navigateText")
    })
    
    .on("mouseout", function(){
        let raggio=d3.select(this).attr("r")
        d3.select(this)
        .attr("r", raggio/1.2)
        d3.select("#navigateText").remove()
    });
}