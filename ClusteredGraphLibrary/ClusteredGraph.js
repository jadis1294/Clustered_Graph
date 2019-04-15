"use strict"
/**
 * @class node
 */
class node{
    /**
 *Class node
 * @param {number} id 
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
    * @param {Set<number>} cildrens - Set of the cildrens cluster's id
    * @param {Set<number>} nodes - id of the cluster's node at the cluster's level 
    */
    constructor(label,level,cildrens,nodes)
    {
 	    this.label=label;
 	    this.level=level;
 	    this.cildrens=cildrens;
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
     * @param {Set<node>} nodes List of the nodes id in the graph
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
 * @param {number} idCluster
 * @returns {number} numberNode value of the nodes number
 * @description Count all the nodes in the cluster with id = idCluster
 */
    nodesInClusterCount(idCluster)
    {
        var numberNode=getNodesInCluster(idCluster).size;
    	return numberNode;
    }
    
 /**
 * @param {number} idCluster
 * @returns {Set<number>}
 * @description Get a set of the nodes id in the cluster
 */
    getNodesInCluster(idCluster)
    {
        let cluster= clusters.get(idCluster);
    	var nodesInCluster=new Set(uneval([...cluster.nodes]));
        for (let item of cluster.cildrens){
            nodesInCluster.add(getNodesInCluster(item))
        }
        return nodesInCluster;
    }


 /**
 * @param {number} idCluster
 * @returns {number}
 * @description get the number of the outgoing edge in the cluster
 */
    edgeInClusterCount(idCluster)
    {
        var edgesNumber;
        let cluster= clusters.get(idCluster);
        
        var edgeInCluster= new Set();
        for (let itemCluster1 of nodesCluster1)
            edgeInCluster.add(itemCluster1.rotationScheme);
        edgesNumber= edgeInCluster.size;
    }


 /**
 * @param {number} idCluster1 
 * @param {number} idCluster2
 * @returns {Set<number>} edges
 * @description get a list of nodes in the Internal cluster
 */
    edgeListBetweenTwoClusters(idCluster1,idCluster2)
    {
        let edges=new Set();
        let nodesCluster1= getNodesInCluster(idCluster1);
        let nodesCluster2= getNodesInCluster(idCluster2);
        let edgeInCluster1= new Set();
        let edgeInCluster2=new Set();
        for (let itemCluster1 of nodesCluster1)
            edgeInCluster1.add(itemCluster1.rotationScheme);
        for(let itemCluster2 of nodesCluster2)
            edgeInCluster2.add(itemCluster2.rotationScheme);
        for(let item1 of edgeInCluster1)
            for(let item2 of edgeInCluster2){
                if(item1==item2) edges.add(item1);
            }
        return edges;
        }

 /**
 * @param {number} idCluster1 
 * @param {number} idCluster2
 * @returns {number}
 * @description get the number of nodes in the Internal cluster
 */
    edgeNumberBetweenTwoClusters(idCluster1,idCluster2)
    {
        return edgeListBetweenTwoClusters(idCluster1,idCluster2).size
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
