"use strict"

/**
 * This function for create the object Node.
 * @param {id} id of the node 
 * @param {rotationScheme} id's array of the outgoing edges from the node 
 */
class node{
    constructor(id,label,rotationScheme){
 	    this.id=id;
 	    this.label=label;
 	    this.rotationScheme=rotationScheme;
    }
}

/**
 * This function for the object Cluster(a internal node of the inclusion_tree).
 * @param {label} string of the cluster's label 
 * @param {level} the depth of the cluster in the inclusion_tree
 * @param {cildren} array of the cildrens cluster's labels
 * @param {nodes} id of the cluster's node at the cluster's level 
 */
class cluster{
    constructor(label,level,cildrens,nodes)
    {
 	    this.label=label;
 	    this.level=level;
 	    this.cildrens=cildrens;
 	    this.nodes=nodes;
    }
}


/**
 * This function for the object Underlying_graph.
 * @param {label} the label of the graph
 * @param {embedded} boolean value to decide if the rotationScheme of the node should be read
 * @param {nodes} array of the nodes in the graph(objects node array)
 * @param {edges} array of the edges in the graph
 */

class underlying_graph{
    constructor(label,embedded,nodes,edges) 
    {
        this.label= label;
        this.embedded= embedded;   //se è embedded il rotationScheme(attributo dei nodi) va letto, altrimenti no
        this.nodes= nodes;
        this.edges=edges;
    }
}          

/**
 * This function for the object inclusion_tree.
 * @param {label} the label of the graph
 * @param {root} boolean value to decide if the rotationScheme of the node should be read
 * @param {cildren} array of the cluster in the graph
 */
class inclusion_tree{
    constructor(label,cluster)
    {
        this.label=label;
        this.cluster=cluster;
    }

 /**
 * This function count all the nodes in the Internal cluster
 * @input {cluster} the internal cluster of which we want to know the nodes
 * @output {numberNode} int value of the nodes number
 */
    nodesInClusterCount(cluster)
    {
    	var numberNode=0
		for (var i = cluster.cildren.length - 1; i >= 0; i--) {
				numberNode+= cluster.nodes.length;
				numberNode+=nodesInClusterCount(clusters.cildren[i]);
    	}
    	return numberNode;
    }
 /**
 * This function return a list of nodes in the Internal cluster
 * @input {cluster} the internal cluster of which we want to know the nodes
 * @output {nodesInCluster} array of the nodes number
 */
    getNodesInCluster(cluster)
    {
    	nodesInCluster=[];
    	for (var i = cluster.cildren.length - 1; i >= 0; i--) {
    		for (var i = cluster.nodes.length - 1; i >= 0; i--)
    			nodesInCluster.push(cluster.nodes[i])
			nodesInCluster.splice(0,0,getNodesInCluster(clusters.cildren[i]));
    	}
    	return nodesInCluster;
    }

    
    getClusterCount()
    {

    }

} 
/**
 * This function for the object c_graph. A c_graph is a pain(G,T) 
 * where G is the underlying_graph and T is the inclusion_Tree 
 * @param {graph} label of the underlying_graph 
 * @param {tree} label of the underlying_graph
 */
class c_graph{
    constructor(graph,tree)
    {
	this.graph=graph;
	this.tree=tree;
    }
}      
