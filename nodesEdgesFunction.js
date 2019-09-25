"use strict"

/**
 * @function
 * @param {number} coordinates Array of d3.mouse(this)
 * @param {number} label Label for the new Cluster
 * @returns {void} 
 * @description Create a new Node in #c_node SVG
 */
function newNode(cluster,key,coordinates,label) {
    let nodeToInsert= new node(key,label,new Set());
    clusteredGraph.graph.nodes.set(key,nodeToInsert);
    cluster.nodes.add(clusteredGraph.graph.nodes.size-1)
    if(cluster.nodes.size>5){
        cluster.r+=2
    }
    nodeToInsert.cluster=cluster.label;
    nodeToInsert.x=coordinates[0];
    nodeToInsert.y=coordinates[1];
    nodeToInsert.key=key;
    nodeToInsert.r=radiusNode;
    text=" created a node ";
    addLog(text,consoleCount)
}

/**
 * @function
 * @param {number} labelCluster
 * @param {number} labelNode
 * @returns {void} 
 * @description Create a new Node in #c_node SVG for the flattization of the c-graph
 */
function addFakeNode(labelCluster,labelNode){
    let ultimaChiave;
    for(let key of clusteredGraph.graph.nodes) ultimaChiave= key[0];
    ultimaChiave++;
    for(let c of clusteredGraph.tree.clusters)
        if(c[1].label==labelCluster){
            newNode(c[1],ultimaChiave,[c[1].x,c[1].y],labelNode);
        }
}
/**
 * @function
 * @param {node} nodo
 * @param {string} label
 * @param {number} id
 * @param {number} id
 * @returns {void} 
 * @description Create a new Edge in svg #C_EDGE
 */
function newEdge(key,coordinates,nodo,label)
{
    let edge= new Edge(key,label,nodo.id,nodo.id);
    clusteredGraph.graph.edges.set(key,edge);
    nodo.rotationScheme.add(edge.id);
    edge.x1=coordinates[0]
    edge.y1=coordinates[1]

    d3.select("#c_node")
        .selectAll("circle")
        .data(Array.from(clusteredGraph.graph.nodes.values()))
        .on("click", function(){
            d3.select(this)
            .transition()
            .duration(1000)
            .attr("r", radiusNode * 1.5);
            let id=d3.select(this).attr("key");
            let nodo= clusteredGraph.graph.nodes.get(parseInt(id));
            nodo.rotationScheme.add(edge.id);
            edge.target=nodo.id;
            edge.x2=parseInt(d3.select(this).attr("cx"))
            edge.y2=parseInt(d3.select(this).attr("cy"))
            d3.select("#c_node").selectAll("circle").transition().duration(1000).attr("r",radiusNode);
            redraw();
            text=" created an Edge ";
            addLog(text,consoleCount)
            createEdgesButton();
        });
}

/**
 * @function
 * @returns {void} 
 * @description function to select the node in the svg to Drag
 */
function dragNode() {
	if(dragNodeBoolean==false) return;
    d3.select("#c_node")
        .selectAll("circle") // For new circle, go through the update process
        .call(dragN)
}

/**
 * @function
 * @param {node} nodo
 * @param {string} sourceLabel
 * @param {string} targetLabel
 * @returns {void} 
 * @description Create a new Fake Edge in svg #C_EDGE for the flattizaton of the graph
 */
function addFakeEdge(sourceLabel,targetLabel){
    let s,t,ultimaChiave;
    if(clusteredGraph.graph.edges.size==0)
        ultimaChiave=0;
else{ 
    for(let key of clusteredGraph.graph.edges)
    ultimaChiave= key[0]+1;
}

for(let item of clusteredGraph.graph.nodes){
    if(item[1].label==sourceLabel)
        s=clusteredGraph.graph.nodes.get(item[1].id);
    if(item[1].label==targetLabel)
        t=clusteredGraph.graph.nodes.get(item[1].id);
}
    
let e= new Edge(ultimaChiave,"edgeFake"+ultimaChiave,s.id,t.id);
            clusteredGraph.graph.edges.set(ultimaChiave,e);
            s.rotationScheme.add(e.id);
            t.rotationScheme.add(e.id)
            e.x1=s.x;
            e.y1=s.y;
            e.x2=t.x;
            e.y2=t.y;
}