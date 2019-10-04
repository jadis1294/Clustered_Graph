/**
 * @function
 * @returns {void} 
 * @description create a copy of the clustered Graph before the flattization
 */
function copyClusterGraph() {
    nodesCopy = new Map();
    for (let item of clusteredGraph.graph.nodes) {
        let n = new node(item[0], item[1].label,
            new Set(Array.from(item[1].rotationScheme)));
        nodesCopy.set(item[0], n);
        n.cluster = item[1].cluster;
        n.x = item[1].x;
        n.y = item[1].y;
        n.key = item[1].key;
        n.r = item[1].r;
    }
    edgesCopy = new Map()
    for (let item of clusteredGraph.graph.edges) {
        let edge = new Edge(item[1].id, item[1].label, item[1].source, item[1].target);
        edgesCopy.set(item[0], edge);
        edge.x1 = item[1].x1;
        edge.y1 = item[1].y1;
        edge.x2 = item[1].x2;
        edge.y2 = item[1].y2;
    }
    clustersCopy = new Map();
    for (let item of clusteredGraph.tree.clusters) {
        let cluster = new Cluster(item[1].label, item[1].level,
            new Set(Array.from(item[1].cildren)),
            new Set(Array.from(item[1].parents)),
            new Set(Array.from(item[1].nodes)));
        clustersCopy.set(item[0], cluster);
        cluster.x = item[1].x;
        cluster.y = item[1].y;
        cluster.r = item[1].r;
        cluster.fill = item[1].fill;
        cluster.key = item[1].key;
    }
    undGraphCopy = new UnderlyingGraph("grafo", false, nodesCopy, edgesCopy),
        incTreeCopy = new InclusionTree("albero", clustersCopy),
        clusteredGraphCopy = new ClusteredGraph(undGraphCopy, incTreeCopy)
    returned = false;
}

/**
 * @function
 * @returns {void} 
 * @description complete the operation of flattization of the clustered graph
 */

function flatClusterButton() {
    //STEP 0: INIZIALIZZAZIONE
    //Copia del grafo clusterizzato per poter tornare alla visione e alla modifica del grafo
    copyClusterGraph()
    //creazione delle strutture dove inserire le cose da cambiare
    let clustersDaCambiare = new Map();
    let archi = new Set();
    let nodiArchiEsterni = new Set();

    for (let c of clusteredGraph.tree.clusters) {
        if (c[1].cildren.size != 0 && c[1].nodes.size==0) {
             clustersDaCambiare.set(c[0], c[1])
         }
    }
    for(let c of clustersDaCambiare){
            let nodi=nodesInClusterList(c[0])
            console.log(nodi)
        for (let item of nodi) {
            //per ogni arco "arc" della rotation schema del nodo "item"
            for (let arc of clusteredGraph.graph.nodes.get(item).rotationScheme) {
                if (!(nodesInClusterList(c[0]).has(clusteredGraph.graph.edges.get(arc).target) &&
                        nodesInClusterList(c[0]).has(clusteredGraph.graph.edges.get(arc).source))) {
                    archi.add(clusteredGraph.graph.edges.get(arc))
                    nodiArchiEsterni.add(clusteredGraph.graph.nodes.get(item));
                }
            }
        }
    }
    console.log(archi)
    // //STEP 1: CREAZIONE CLUSTER FITTIZI
    // //per ogni cluster da cambiare
    // // abbassa il livello dei figli di 1 e elimina se stesso dalla lista dei genitori dei figli
    // //  crea due cluster ed elimina il cluster selezionato
    for(let cluster of clustersDaCambiare){
        addFakeCluster(cluster[1], cluster[1].label + "_" + "X");
        addFakeCluster(cluster[1], cluster[1].label + "_" + "Y");
        for(let figlioId of cluster[1].cildren){
            clusteredGraph.tree.clusters.get(figlioId).level-=1;
            clusteredGraph.tree.clusters.get(figlioId).parents.delete(cluster[0]);
            for(let nodo of nodiArchiEsterni){
                if(clusteredGraph.tree.clusters.get(figlioId).nodes.has(nodo.id)){
                    for (let i of nodo.rotationScheme) {
                        if (archi.has(clusteredGraph.graph.edges.get(i))) {
                            addFakeNode(cluster[1].label + "_" + "X", "X"+"n" + nodo.id +"e"+i);
                            addFakeNode(cluster[1].label + "_" + "Y", "Y"+"n" + nodo.id +"e"+i);
                        }
                    }
                }
            }
        }

        clusteredGraph.tree.clusters.delete(cluster[0]);
    }

    // //STEP TRE: CREAZIONE ARCHI FITTIZI
    //STEP TRE: CREAZIONE ARCHI FITTIZI
    for (let i of archi) {
        if (nodiArchiEsterni.has(clusteredGraph.graph.nodes.get(i.source)) &&
            nodiArchiEsterni.has(clusteredGraph.graph.nodes.get(i.target))) {
            console.log("source e target avevano nodi fittizi")
            addFakeEdge(clusteredGraph.graph.nodes.get(i.source).label,
                "X"+"n" + clusteredGraph.graph.nodes.get(i.source).id + "e"+i.id);

            addFakeEdge("X"+"n" + clusteredGraph.graph.nodes.get(i.source).id + "e"+i.id,
                        "Y"+"n" + clusteredGraph.graph.nodes.get(i.source).id + "e"+i.id);

            addFakeEdge("Y"+"n" + clusteredGraph.graph.nodes.get(i.source).id + "e"+i.id,
                        "Y"+"n" + clusteredGraph.graph.nodes.get(i.target).id + "e"+i.id);

            addFakeEdge("Y"+"n" + clusteredGraph.graph.nodes.get(i.target).id + "e"+i.id,
                        "X"+"n" + clusteredGraph.graph.nodes.get(i.target).id + "e"+i.id);

            addFakeEdge("X"+"n" + clusteredGraph.graph.nodes.get(i.target).id + "e"+i.id,
                        clusteredGraph.graph.nodes.get(i.target).label)
        } else {
            if (nodiArchiEsterni.has(clusteredGraph.graph.nodes.get(i.source))) {
                console.log("solo source aveva nodi fittizi")
                addFakeEdge(clusteredGraph.graph.nodes.get(i.source).label,
                            "X"+"n" + clusteredGraph.graph.nodes.get(i.source).id + "e"+i.id);
                addFakeEdge("X"+"n" + clusteredGraph.graph.nodes.get(i.source).id + "e"+i.id,
                            "Y"+"n" + clusteredGraph.graph.nodes.get(i.source).id + "e"+i.id);
                addFakeEdge("Y"+"n" + clusteredGraph.graph.nodes.get(i.source).id + "e"+i.id,
                    clusteredGraph.graph.nodes.get(i.target).label)
            }
            if (nodiArchiEsterni.has(clusteredGraph.graph.nodes.get(i.target))) {
                console.log("solo target aveva nodi fittizi")
                addFakeEdge(clusteredGraph.graph.nodes.get(i.source).label,
                            "Y"+"n" + clusteredGraph.graph.nodes.get(i.target).id + "e"+i.id);
                addFakeEdge("Y"+"n" + clusteredGraph.graph.nodes.get(i.target).id + "e"+i.id,
                            "X"+"n" + clusteredGraph.graph.nodes.get(i.target).id + "e"+i.id);
                addFakeEdge("X"+"n" + clusteredGraph.graph.nodes.get(i.target).id + "e"+i.id,
                    clusteredGraph.graph.nodes.get(i.target).label);
            }
        }
        //elimino nodi Sostituiti
        clusteredGraph.graph.edges.delete(i.id)
        clusteredGraph.graph.nodes.get(i.source).rotationScheme.delete(i.id)
        clusteredGraph.graph.nodes.get(i.target).rotationScheme.delete(i.id)
    }

 
    flatted = true
    treeViewButton(0);
}
