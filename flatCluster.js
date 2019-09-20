/**
 * @function
 * @returns {void} 
 * @description complete the operation of flattization of the clustered graph
 */


function addFakeCluster(cluster,label){
    let ultimaChiave;
    for(let key of clusteredGraph.tree.clusters) ultimaChiave= key[0];
    ultimaChiave++;
    let newCoords=[cluster.x+getCoordinates(cluster.x),cluster.y+getCoordinates(cluster.y)];
    newCluster(newCoords,ultimaChiave,label,1);
    clusteredGraph.tree.clusters.get(ultimaChiave).fill=cluster.fill;
}

function getCoordinates(c){
    if(c<=50) return 50;
    else {
        if (c>=h-50) return -50;
        else return 0;
    } 
}

function addFakeNode(labelCluster,labelNode){
    let ultimaChiave;
    for(let key of clusteredGraph.graph.nodes) ultimaChiave= key[0];
    ultimaChiave++;
    for(let c of clusteredGraph.tree.clusters)
        if(c[1].label==labelCluster){
            newNode(c[1],ultimaChiave,[c[1].x,c[1].y],labelNode);
        }
}

function addFakeEdge(sourceLabel,targetLabel){
    if(clusteredGraph.graph.edges.size==0)
    ultimaChiave=0;
else{ 
    for(let key of clusteredGraph.graph.edges)
    ultimaChiave= key[0]+1;
}
    for(let item of clusteredGraph.graph.nodes)
    if(item[1].label==sourceLabel){
        let edge= new Edge(ultimaChiave,"edgeFake"+ultimaChiave,item[1].id,item[1].id);
        clusteredGraph.graph.edges.set(ultimaChiave,edge);
        item[1].rotationScheme.add(edge.id);
        edge.x1=item[1].x;
        edge.y1=item[1].y;
    }
    for(let item of clusteredGraph.graph.nodes)
    if(item[1].label==targetLabel){
        item[1].rotationScheme.add(edge.id);
        edge.x2=item[1].x;
        edge.y2=item[1].y
    }

}
function nodesInClusterList(idCluster)
{
    let cluster= clusteredGraph.tree.clusters.get(idCluster);
    var nodesInCluster=new Set(Array.from(cluster.nodes));
    for (let item of cluster.cildren){
        nodesInCluster.add(nodesInClusterList(item))
    }
    return nodesInCluster;
}
function flatClusterButton(){
    //prima di fare cambiamenti si devono trovare gli archi che inizialmente collegano due cluster (con figli) diversi
    //su ogni cluster
    for(let c of clusteredGraph.tree.clusters){
        //se non ha figli== se è l'ultimo nella discesa dell'inclusion tree
        if(c[1].cildren.size==0 && c[1].level!=1){
            let archi=new Set();
            for(let item of c[1].nodes){
                console.log("controllo i nodi")
                //per ogni arco "arc" della rotation schema del nodo "item"
                for(let arc of clusteredGraph.graph.nodes.get(item).rotationScheme) {
                    if(!(nodesInClusterList(Array.from(c[1].parents)[0]).has(clusteredGraph.graph.edges.get(arc).target) &&
                        nodesInClusterList(Array.from(c[1].parents)[0]).has(clusteredGraph.graph.edges.get(arc).source)))
                        archi.add(arc)
                }
            }
            console.log(archi)
            //per ogni genitore della lista parents: 
            // 1)elimina il genitore diretto(quello con livello = livello figlio-1)
            for(let parent of c[1].parents)
                    if(clusteredGraph.tree.clusters.get(parent).level==parseInt(c[1].level)-1){
                        deleteCluster(parent);
                        c[1].level-=1;
            // 2) Crea due cluster falsi (x e y)
                        addFakeCluster(c[1],c[1].label+ "_"+"X");
                        addFakeCluster(c[1], c[1].label+"_"+"Y");
            // 3) per ogni nodo del cluster controlla se questo abbia degli archi collegati
                        for(let item of c[1].nodes){
                            if(clusteredGraph.graph.nodes.get(item).rotationScheme!=0){
            // 4) per ogni arco di nodo.rotationScheme: aggiunge due nodi fittizi nei cluster fittizi x e y inseriti al posto del genitore
                                for(let i of clusteredGraph.graph.nodes.get(item).rotationScheme ){
                                    if(archi.has(i)){
                                        let target=clusteredGraph.graph.edges.get(i).target
                                        console.log(target)
                                        //clusteredGraph.graph.edges.delete(i)
                                        //clusteredGraph.graph.nodes.get(item).rotationScheme.delete(i) 
                                        addFakeNode(c[1].label+ "_"+"X","nf"+i+"_X");
                                        addFakeEdge(clusteredGraph.graph.nodes.get(item).label,"nf"+i+"_X")
                                        addFakeNode(c[1].label+ "_"+"X","nf"+i+"_Y");
                                        addFakeEdge("nf"+i+"_X","nf"+i+"_Y");
                                        addFakeEdge("nf"+i+"_Y",clusteredGraph.graph.nodes.get(target).label);
                                    }
                                }
                            }
                        }
                    }
        }
    }
    treeViewButton(0);
}