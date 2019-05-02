"use strict"
/**
 * @class node
 */
class node{
    /**
 *Class node
 * @param {string} label
 * @param {Set<number>} rotationScheme id's array of the outgoing edges from the node 
 */
    constructor(id,label,rotationScheme){
 	    this.id=id;
 	    this.label=label;
 	    this.rotationScheme=rotationScheme;
    }
}


/**
 * @class Edge
 */
class Edge{
    /**
    * class Edge
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

/**
 * @class Cluster
 * @description Clusters are the internal node of the InclusionTree
 */
class Cluster{
    /**
    * @param {string} label
    * @param {number} level -depth of the cluster in the InclusionTree
    * @param {Set<number>} cildren - Set of the cildrens cluster's id
    * @param {Set<number>} parents - Set of the parents's id of the Cluster
    * @param {Set<number>} nodes - id of the cluster's node at the cluster's level 
    */
    constructor(label,level,cildren,parents,nodes)
    {
 	    this.label=label;
 	    this.level=level;
         this.cildren=cildren;
         this.parents=parents;
 	    this.nodes=nodes;
    }
}

/**
 * @class UnderlyingGraph
 * @description the UnderlyingGraph of the clusteredGraph
 */
class UnderlyingGraph{
    /**
     * @param {string} label
     * @param {boolean} embedded boolean value to decide if the rotationScheme of the node should be read
     * @param {Map<number,node>} nodes Map of the nodes id in the graph
     * @param {Set<Edge>} edges List of the edges id in the graph
     */
    constructor(label,embedded,nodes,edges) 
    {
        this.label= label;
        this.embedded= embedded;   //se è embedded il rotationScheme(attributo dei nodi) va letto, altrimenti no
        this.nodes= nodes;
        this.edges=edges;
    }
}          

/**
 * @class InclusionTree
 * @description the InclusionTree of the ClusteredGraph
 */
class InclusionTree{
    /**
     * @param {string} label
     * @param {Map<number,Cluster>} clusters Clusters in the InclusionTree
     */
    constructor(label,clusters)
    {
        this.label=label;
        this.clusters=clusters;
    }



/**
 * @function
 * @param {number} idCluster
 * @returns {number} numberNode value of the nodes number
 * @description Count all the nodes in the cluster with id = idCluster
 */
    nodesInClusterCount(idCluster)
    {
        var numberNode=nodesInClusterList(idCluster).size;
    	return numberNode;
    }
    
 /**
  * @function
 * @param {number} idCluster
 * @returns {Set<number>}
 * @description Get a set of the nodes id in the cluster
 */
    nodesInClusterList(idCluster)
    {
        let cluster= clusters.get(idCluster);
    	var nodesInCluster=new Set(Array.from(cluster.nodes));
        for (let item of cluster.cildren){
            nodesInCluster.add(nodesInClusterList(item))
        }
        return nodesInCluster;
    }

 /**
  * @function
 * @param {number} idCluster1 
 * @param {number} idCluster2
 * @returns {Set<number>} edges
 * @description get a list of nodes in the Internal cluster
 */
    edgeListBetweenTwoClusters(idCluster1,idCluster2)
    {
        let edges=new Set();
        let arrayedge;
        let nodesCluster1= getNodesInCluster(idCluster1);
        let nodesCluster2= getNodesInCluster(idCluster2);
        let edgeInCluster1= new Set();
        let edgeInCluster2=new Set();
        for (let itemCluster1 of nodesCluster1){
            arrayedge=Array.from(itemCluster1.rotationScheme)
            arrayedge.forEach(itemA => edgeInCluster1.add(itemA))
        }
        for (let itemCluster2 of nodesCluster2){
            arrayedge=Array.from(itemCluster2.rotationScheme)
            arrayedge.forEach(itemA => edgeInCluster1.add(itemA))
        }
        for(let item1 of edgeInCluster1)
            for(let item2 of edgeInCluster2){
                if(item1==item2) edges.add(item1);
            }
        return edges;
        }

 /**
  * @function
 * @param {number} idCluster1 
 * @param {number} idCluster2
 * @returns {number}
 * @description get the number of edges between two cluster
 */
    edgeNumberBetweenTwoClusters(idCluster1,idCluster2)
    {
        return edgeListBetweenTwoClusters(idCluster1,idCluster2).size
    }


/**
 * @function
 * @param {number} idCluster 
 * @returns {Set<number>}
 * @description get all the cildrens id of the input cluster
 */
    cildrenCluster(idCluster)
    {
        let clu= clusteredGraph.tree.clusters.get(idCluster);
        let cildrenSet= new Set();
        for(let item of clu.cildren){
            cildrenSet.add(item)
        }
        return cildrenSet;
    }

}

/**
 * @class ClusteredGraph
 * @description A ClusteredGraph is a pain(G,T) where G is the UnderlyingGraph and T is the InclusionTree
 */
class ClusteredGraph{
    /** 
     * @param {UnderlyingGraph} graph 
     * @param {InclusionTree} tree 
     */
    constructor(graph,tree)
    {
	this.graph=graph;
	this.tree=tree;
    }
}      
