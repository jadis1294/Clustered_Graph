"use strict"

class node{
    /**
 *Class node
 * @param {number} id 
 * @param {string} label
 * @param {[]} rotationScheme - Array id's array of the outgoing edges from the node 
 */
    constructor(id,label,rotationScheme){
 	    this.id=id;
 	    this.label=label;
 	    this.rotationScheme=rotationScheme;
    }
}
var n= new node
class edge{
    /**
    * class edge
    * This function for create the object Node.
    * @param {number} id
    * @param {string} label 
    * @param {number} source - Source node's id 
    * @param {number} target - Target node's id
    */
    constructor(id,label,source,target){
 	    this.id=id;
 	    this.label=label;
        this.source=source;
        this.target=target;
    }
}


class cluster{
    /**
    *Class cluster
    * @param {string} label
    * @param {number} level -depth of the cluster in the inclusion_tree
    * @param {[]} cildren - Array of the cildrens cluster's labels
    * @param {[]} nodes - id of the cluster's node at the cluster's level 
    */
    constructor(label,level,cildrens,nodes)
    {
 	    this.label=label;
 	    this.level=level;
 	    this.cildrens=cildrens;
 	    this.nodes=nodes;
    }
}

class UnderlyingGraph{
    /**
     * class Underlying_graph
     * @param {string} label
     * @param {boolean} embedded boolean value to decide if the rotationScheme of the node should be read
     * @param {[]} nodes - array of the nodes in the graph(objects node array)
     * @param {[]} edges - array of the edges in the graph
     */
    constructor(label,embedded,nodes,edges) 
    {
        this.label= label;
        this.embedded= embedded;   //se è embedded il rotationScheme(attributo dei nodi) va letto, altrimenti no
        this.nodes= nodes;
        this.edges=edges;
    }
}          

class InclusionTree{
    /**
     * class InclusionTree.
     * @param {string} label
     * @param {[]} cildren - array of the cluster in the graph
     */
    constructor(label,cluster)
    {
        this.label=label;
        this.cluster=cluster;
    }

 /**
 * count all the nodes in the Internal cluster
 * @param {Object} cluster
 * @returns {number} numberNode - value of the nodes number
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
 * get a list of nodes in the Internal cluster
 * @param {Object} cluster
 * @returns {[]} nodesInCluster
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
class ClusteredGraph{
    /**
     * Class ClusteredGraph. A ClusteredGraph is a pain(G,T) 
     * where G is the UnderlyingGraph and T is the InclusionTree 
     * @param {Object} graph 
     * @param {Object} tree 
     */
    constructor(graph,tree)
    {
	this.graph=graph;
	this.tree=tree;
    }
}      
