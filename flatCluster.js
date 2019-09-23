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
    let clusersDaCambiare = new Map();
    let archi = new Set();
    let nodiArchiEsterni = new Set();
    for (let c of clusteredGraph.tree.clusters) {
        if (c[1].cildren.size == 0 && c[1].level != 1) {
            clusersDaCambiare.set(c[0], c[1])
            for (let item of c[1].nodes) {
                //per ogni arco "arc" della rotation schema del nodo "item"
                for (let arc of clusteredGraph.graph.nodes.get(item).rotationScheme) {
                    if (!(nodesInClusterList(Array.from(c[1].parents)[0]).has(clusteredGraph.graph.edges.get(arc).target) &&
                            nodesInClusterList(Array.from(c[1].parents)[0]).has(clusteredGraph.graph.edges.get(arc).source))) {
                        archi.add(clusteredGraph.graph.edges.get(arc))
                        nodiArchiEsterni.add(clusteredGraph.graph.nodes.get(item));
                    }
                }
            }
        }
    }

    //inizio dell'algoritmo

    //STEP 1: CREAZIONE CLUSTER FITTIZI
    //per ogni cluster da cambiare
    // elimina il genitore diretto(quello con livello = livello figlio-1)
    //  e abbassa il libello di uno del cluster considerato c[1]
    for (let c of clusersDaCambiare) {
        for (let item of c[1].nodes) {
            for (let i of clusteredGraph.graph.nodes.get(item).rotationScheme) {
                //SE E SOLO SE I NODI HANNO ARCHI USCENTI CREO I CLUSTER FITTIZI
                if (archi.has(clusteredGraph.graph.edges.get(i))) {
                    for (let parent of c[1].parents)
                        if (clusteredGraph.tree.clusters.get(parent).level == parseInt(c[1].level) - 1) {
                            c[1].level -= 1;
                            addFakeCluster(c[1], c[1].label + "_" + "X");
                            addFakeCluster(c[1], c[1].label + "_" + "Y");
                        }
                }
            }
        }
        //IN OGNI CASO ELIMINO IL CLUSTER GENITORE
        deleteCluster(parent);
    }


    //STEP 2: CREAZIONE NODI FITTIZI
    //per ogni nodo con archi esterni creo due nodi nei cluster fittizi creati prima
    for (let item of nodiArchiEsterni) {
        for (let i of item.rotationScheme) {
            if (archi.has(clusteredGraph.graph.edges.get(i))) {
                addFakeNode(item.cluster + "_X", "nf" + item.id + "_X");
                addFakeNode(item.cluster + "_Y", "nf" + item.id + "_Y");
            }
        }
    }
    //STEP TRE: CREAZIONE ARCHI FITTIZI
    for (let i of archi) {
        if (nodiArchiEsterni.has(clusteredGraph.graph.nodes.get(i.source)) &&
            nodiArchiEsterni.has(clusteredGraph.graph.nodes.get(i.target))) {
            console.log("source e target avevano nodi fittizi")
            addFakeEdge(clusteredGraph.graph.nodes.get(i.source).label,
                "nf" + clusteredGraph.graph.nodes.get(i.source).id + "_X");

            addFakeEdge("nf" + clusteredGraph.graph.nodes.get(i.source).id + "_X",
                "nf" + clusteredGraph.graph.nodes.get(i.source).id + "_Y");
            addFakeEdge("nf" + clusteredGraph.graph.nodes.get(i.source).id + "_Y",
                "nf" + clusteredGraph.graph.nodes.get(i.target).id + "_Y");

            addFakeEdge("nf" + clusteredGraph.graph.nodes.get(i.target).id + "_Y",
                "nf" + clusteredGraph.graph.nodes.get(i.target).id + "_X");

            addFakeEdge("nf" + clusteredGraph.graph.nodes.get(i.target).id + "_X",
                clusteredGraph.graph.nodes.get(i.target).label)
        } else {
            if (nodiArchiEsterni.has(clusteredGraph.graph.nodes.get(i.source))) {
                console.log("solo source aveva nodi fittizi")
                addFakeEdge(clusteredGraph.graph.nodes.get(i.source).label,
                    "nf" + clusteredGraph.graph.nodes.get(i.source).id + "_X");
                addFakeEdge("nf" + clusteredGraph.graph.nodes.get(i.source).id + "_X",
                    "nf" + clusteredGraph.graph.nodes.get(i.source).id + "_Y");
                addFakeEdge("nf" + clusteredGraph.graph.nodes.get(i.source).id + "_Y",
                    clusteredGraph.graph.nodes.get(i.target).label)
            }
            if (nodiArchiEsterni.has(clusteredGraph.graph.nodes.get(i.target))) {
                console.log("solo target aveva nodi fittizi")
                addFakeEdge(clusteredGraph.graph.nodes.get(i.source).label,
                    "nf" + clusteredGraph.graph.nodes.get(i.target).id + "_Y");
                addFakeEdge("nf" + clusteredGraph.graph.nodes.get(i.target).id + "_Y",
                    "nf" + clusteredGraph.graph.nodes.get(i.target).id + "_X");
                addFakeEdge("nf" + clusteredGraph.graph.nodes.get(i.target).id + "_X",
                    clusteredGraph.graph.nodes.get(i.target).label);
            }
        }
        //elimino nodi Sostituiti
        clusteredGraph.graph.edges.delete(i.id)
        clusteredGraph.graph.nodes.get(i.source).rotationScheme.delete(i.id)
        clusteredGraph.graph.nodes.get(i.target).rotationScheme.delete(i.id)
    }
    //ridisegno il grafo nella treeView per essere visualizzato meglio
    flatted = true
    treeViewButton(0);
}