/**
 * @function
 * @returns {void} 
 * @description create a copy of the clustered Graph before the flattization
 */
function copyClusterGraph(){
    nodesCopy = new Map();
    for(let item of clusteredGraph.graph.nodes){
        let n =new node(item[0],item[1].label,
            new Set(Array.from(item[1].rotationScheme)));
        nodesCopy.set(item[0],n);
        n.cluster=item[1].cluster;
        n.x=item[1].x;
        n.y=item[1].y;
        n.key=item[1].key;
        n.r=item[1].r;
    }
    edgesCopy = new Map()
    for(let item of clusteredGraph.graph.edges){
        let edge= new Edge(item[1].id,item[1].label,item[1].source,item[1].target);
        edgesCopy.set(item[0],edge);
        edge.x1=item[1].x1;
        edge.y1=item[1].y1;
        edge.x2=item[1].x2;
        edge.y2=item[1].y2;
    }
    clustersCopy= new Map();
    for(let item of clusteredGraph.tree.clusters){
        let cluster = new Cluster(item[1].label, item[1].level, 
                new Set(Array.from(item[1].cildren)), 
                new Set(Array.from(item[1].parents)),
                new Set(Array.from(item[1].nodes)));
        clustersCopy.set(item[0],cluster);
        cluster.x = item[1].x;
        cluster.y = item[1].y;
        cluster.r = item[1].r;
        cluster.fill = item[1].fill;
        cluster.key = item[1].key;
    }
    undGraphCopy=new UnderlyingGraph("grafo",false,nodesCopy,edgesCopy),
    incTreeCopy= new InclusionTree("albero",clustersCopy),
    clusteredGraphCopy= new ClusteredGraph(undGraphCopy,incTreeCopy)
    returned=false;
}

/**
 * @function
 * @returns {void} 
 * @description complete the operation of flattization of the clustered graph
 */
function flatClusterButton(){
    //COPIA DEL CLUSTERED GRAPH PER POTER TORNARE ALLA VISUALIZZAZIONE CON L'INCLUSION TREE
    copyClusterGraph()
    let clus=new Map();
    //prima di fare cambiamenti si devono trovare gli archi che inizialmente 
    // collegano due cluster (con figli) diversi su ogni cluster
    for(let c of clusteredGraph.tree.clusters){

        //se non ha figli== se è l'ultimo nella discesa dell'inclusion tree
        if(c[1].cildren.size==0 && c[1].level!=1){
            let archi=new Set();
            
            //per ogni nodo del cluster c[1] su cui si sta lavorando:
            //controllo gli archi se escono da quel cluster o meno
            for(let item of c[1].nodes){
                //console.log("controllo i nodi")
                //per ogni arco "arc" della rotation schema del nodo "item"
                for(let arc of clusteredGraph.graph.nodes.get(item).rotationScheme) {
                    console.log("arco in considerazione:" + arc)

                    if(!(nodesInClusterList(Array.from(c[1].parents)[0]).has(clusteredGraph.graph.edges.get(arc).target) &&
                        nodesInClusterList(Array.from(c[1].parents)[0]).has(clusteredGraph.graph.edges.get(arc).source)))
                        archi.add(arc)
                }
            }
            //per ogni genitore della lista parents: 
            // 1)elimina il genitore diretto(quello con livello = livello figlio-1)
            //  e abbassa il libello di uno del cluster considerato c[1] 
            for(let parent of c[1].parents)
                    if(clusteredGraph.tree.clusters.get(parent).level==parseInt(c[1].level)-1){
                        console.log(c[1].parents)
                        console.log(clustersCopy.get(c[0]).parents)
                        deleteCluster(parent);
                        c[1].level-=1;
                        console.log(c[1].parents)
                        console.log(clustersCopy.get(c[0]).parents)
            // 2) Crea due cluster falsi (x e y)
                        addFakeCluster(c[1],c[1].label+ "_"+"X");
                        addFakeCluster(c[1], c[1].label+"_"+"Y");
                        //redraw()
                        for(let item of c[1].nodes){
            // 4) per ogni arco di nodo.rotationScheme che abbia archi che uscivano da cluster: 
            //  aggiunge due nodi fittizi nei due cluster fittizi x e y 
            //  inseriti al posto del genitore eliminato in precedenza
                                for(let i of clusteredGraph.graph.nodes.get(item).rotationScheme ){
                                    if(archi.has(i)){
                                        let target=clusteredGraph.graph.edges.get(i).target
                                        let source=clusteredGraph.graph.edges.get(i).source
                                        clusteredGraph.graph.edges.delete(i)
                                        clusteredGraph.graph.nodes.get(source).rotationScheme.delete(i)
                                        clusteredGraph.graph.nodes.get(target).rotationScheme.delete(i)
                                        addFakeNode(c[1].label+ "_X","nf"+i+"_X");
                                        addFakeEdge(clusteredGraph.graph.nodes.get(item).label,"nf"+i+"_X")
                                        addFakeNode(c[1].label+ "_Y","nf"+i+"_Y");
                                        addFakeEdge("nf"+i+"_X","nf"+i+"_Y");
                                        if(source==item)
                                            addFakeEdge("nf"+i+"_Y",clusteredGraph.graph.nodes.get(target).label);
                                        else{
                                            addFakeEdge("nf"+i+"_Y",clusteredGraph.graph.nodes.get(source).label);
                                        }
                                    }
                                }
                            }
                    }
        }
    }
    flatted=true
    treeViewButton(0);
}